import { Injectable } from '@nestjs/common';
import { BuyDto } from './dto/buy.dto';
import { UserRepo } from './repositories/user.repo';
import { UserHistoryQueryFiltersDto } from './dto/user-history-query-filters.dto';
import { UsersHistoryEntity } from './entities/users-history.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  public async buy(buyBody: BuyDto): Promise<void> {
    await this.userRepo.buy(buyBody);
  }

  public async getUserHistory(
    query: UserHistoryQueryFiltersDto,
  ): Promise<UsersHistoryEntity[]> {
    return this.userRepo.getUserHistory(query);
  }
}
