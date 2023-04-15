import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestModule } from './src/libs/guest/guest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entity/Guest';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Guest],
      synchronize: true,
      autoLoadEntities: true,
    }), GuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
