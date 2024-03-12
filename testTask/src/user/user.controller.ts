import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BuyDto } from './dto/buy.dto';
import { UserService } from './user.service';
import { UserHistoryQueryFiltersDto } from './dto/user-history-query-filters.dto';
import { UsersHistoryEntity } from './entities/users-history.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('buy')
  public async buy(@Body() buyBody: BuyDto): Promise<void> {
    await this.userService.buy(buyBody);
  }

  @Get('getUserHistory')
  public async getUserHistory(
    @Query() query: UserHistoryQueryFiltersDto,
  ): Promise<UsersHistoryEntity[]> {
    return this.userService.getUserHistory(query);
  }
}
