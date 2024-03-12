import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AppConfig } from '../config/config/app.config';
import { DBConfig } from '../config/config/db.config';
import { ConfigService } from '../config/config.service';
import { dbConfigFactory } from '../config/factory/db-config.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      path: './',
      entities: [AppConfig, DBConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        dbConfigFactory(configService),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
