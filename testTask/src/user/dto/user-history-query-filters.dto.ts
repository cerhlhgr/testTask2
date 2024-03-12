import { ActionTypes } from '../user.types';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class UserHistoryQueryFiltersDto {
  @IsOptional()
  @IsArray()
  userIds?: number[];

  @IsOptional()
  @IsEnum(ActionTypes)
  action?: ActionTypes;
}
