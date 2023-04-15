import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestDto } from './create-guest.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsDate, isNotEmpty, IsDateString } from 'class-validator';
import { Status } from '../../../../entity/Guest';

export class UpdateGuestDto {
    @ApiProperty({ description: 'firstName' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: 'lastName' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'status' })
    @IsEnum(Status, { message: 'Must choose either Yes or No.' })
    readonly status: Status;

    @ApiProperty({ description: 'extraAttendees' })
    extraAttendees: number;

    @ApiProperty({ description: 'confirmedDate' })
    @IsNotEmpty()
    @IsDateString()
    readonly confirmedDate: Date;

    @ApiProperty({ description: 'Reason' })
    readonly reason: string;
}
