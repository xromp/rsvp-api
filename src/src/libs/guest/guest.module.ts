import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from '../../../entity/Guest';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  controllers: [GuestController],
  providers: [GuestService]
})
export class GuestModule { }
