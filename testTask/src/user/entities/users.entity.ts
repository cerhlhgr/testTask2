import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../config/db/base.entity';
import { UsersHistoryEntity } from './users-history.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  balance: number;

  @OneToMany(() => UsersHistoryEntity, (usersHistory) => usersHistory.user)
  usersHistory: UsersHistoryEntity[];
}
