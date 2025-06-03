import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {CategoryModule} from "./category/category.module";
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { TransactionModule } from './transaction/transaction/transaction.module';
import {User} from "./user/entities/user.entity";
import {Category} from "./category/entities/category.entity";
import {Transaction} from "./transaction/transaction/entities/transaction.entity";

@Module({
  imports: [UserModule, CategoryModule, AuthModule, TransactionModule,ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService)=> ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: true,
            logging: true,
          entities: [User, Category, Transaction]
        }),
          inject: [ConfigService]

      }
  ),
  TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
