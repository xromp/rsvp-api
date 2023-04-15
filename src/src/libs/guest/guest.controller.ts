import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
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

  // @Get()
  // findAll() {
  //   return this.guestService.findAll();
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.guestService.remove(+id);
  // }
}
