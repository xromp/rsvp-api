import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Guest } from '../../../entity/Guest';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { GuestDto } from './dto/guest.dto';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private repository: Repository<Guest>,
  ) { }

  // create(guest: CreateGuestDto): Promise<Guest> {
  //   return this.repository.save(guest);
  // }


  batchInsert(guest: CreateGuestDto[]): Promise<Guest[]> {
    return this.repository.save(guest);
  }

  async findAll(filter: GuestDto): Promise<any> {
    const guest = await this.repository.find({ where: filter, order: { lastName: 1 } });
    const status = {
      pending: guest.filter(({ status }) => status === "pending").length,
      confirmed: guest.filter(({ status }) => status === "confirmed").length,
      declined: guest.filter(({ status }) => status === "declined").length,
    }
    return { guest, status }
  }

  async report(): Promise<any> {
    const guest = await this.repository.find();
    return {
      pending: guest.filter(({ status }) => status === "pending").length,
      confirmed: guest.filter(({ status }) => status === "confirmed").length,
      declined: guest.filter(({ status }) => status === "declined").length,
    }
  }

  async findOneOrFail(filter: FindOptionsWhere<Guest>): Promise<Guest | null> {
    try {
      return await this.repository.findOneByOrFail({ ...filter });
    } catch (error) {
      throw new BadRequestException(`Invalid request. Please contact customer service.`)
    }

  }

  async update(criteria: FindOptionsWhere<Guest>, updateGuest: UpdateGuestDto): Promise<Guest> {
    const guest = await this.repository.findOne({ where: criteria });
    // Only who has rights to add attendees (plus one)
    if (!guest.canAddGuest) delete updateGuest.extraAttendees;
    if (!guest.anonymous) {
      delete updateGuest.firstName;
      delete updateGuest.lastName;
    };
    await this.repository.update(criteria, updateGuest);
    return await this.repository.findOne({ where: criteria });
  }

  remove(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}