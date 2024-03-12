import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from './repositories/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from '../types';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  controllers: [UserController],
  providers: [UserService, UserRepo],
})
export class UserModule {}
