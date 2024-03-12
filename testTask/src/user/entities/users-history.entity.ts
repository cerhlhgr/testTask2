import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../config/db/base.entity';
import { UsersEntity } from './users.entity';
import { ActionTypes } from '../user.types';

@Entity('user_history')
export class UsersHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ enum: ActionTypes })
  action: ActionTypes;

  @Column()
  amount: number;

  @ManyToOne(() => UsersEntity, (user) => user.usersHistory)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
