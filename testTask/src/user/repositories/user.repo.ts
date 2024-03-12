import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersHistoryEntity } from '../entities/users-history.entity';
import { BuyDto } from '../dto/buy.dto';
import { NotFoundBusinessException } from '../../../config/exceptions/exception-types/not-found-business.exception';
import { ActionTypes } from '../user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistoryQueryFiltersDto } from '../dto/user-history-query-filters.dto';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(UsersHistoryEntity)
    private readonly usersHistoryRepo: Repository<UsersHistoryEntity>,
    private dataSource: DataSource,
  ) {}

  public async buy({ amount, userId }: BuyDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');

    try {
      const user = await queryRunner.manager.findOne<UsersEntity>(UsersEntity, {
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundBusinessException('User not found');
      }

      if (user.balance - amount <= 0) {
        throw new BadRequestException('Bad balance');
      }

      user.balance -= amount;

      await queryRunner.manager.save(user);

      //TODO: Тут можно реализовать списание со склада товара, который купил пользователь

      await queryRunner.manager.save(UsersHistoryEntity, {
        action: ActionTypes.Buy,
        amount,
        user,
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async getUserHistory(
    query: UserHistoryQueryFiltersDto,
  ): Promise<UsersHistoryEntity[]> {
    const qb = this.usersHistoryRepo.createQueryBuilder();

    if (query.userIds) {
      qb.andWhere('user_id in (:userIds)', {
        userIds: query.userIds.join(','),
      });
    }

    if (query.action) {
      qb.andWhere('action = :actionType', { actionType: query.action });
    }

    return qb.getMany();
  }
}
