import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) { }

  // @Post()
  // create(@Body(new ValidationPipe({ transform: true })) createGuestDto: CreateGuestDto) {
  //   return this.guestService.create(createGuestDto)
  // }

  @Post('batch')
  create(@Query() filter, @Body(new ValidationPipe({ transform: true })) guests: CreateGuestDto[]) {
    if (filter.passcode !== 'secretonly') return;
    delete filter.passcode;
    return this.guestService.batchInsert(guests)
  }

  @Get()
  findAll(@Query() filter) {
    if (filter.passcode !== 'secretonly') return;
    delete filter.passcode;
    return this.guestService.findAll(filter);
  }

  // @Get('report')
  // findStatus() {
  //   return this.guestService.report();
  // }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return await this.guestService.findOneOrFail({ uuid });
  }

  @Patch('response/:uuid')
  async update(@Param('uuid') uuid: string, @Body() updateGuestDto: UpdateGuestDto) {
    await this.guestService.findOneOrFail({ uuid })
    return await this.guestService.update({ uuid }, updateGuestDto);
  }

  @Delete(':id')
  remove(@Query() filter, @Param('id') id: string) {
    if (filter.passcode !== 'secretonly') return;
    delete filter.passcode;
    return this.guestService.remove(+id);
  }
}
