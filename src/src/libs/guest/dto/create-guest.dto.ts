import { OmitType, PartialType } from "@nestjs/mapped-types";
import { GuestDto } from "./guest.dto";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../../../../entity/Guest";

export class CreateGuestDto {

    @ApiProperty({ description: 'firstName' })
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty({ description: 'lastName' })
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty({ description: 'status' })
    @IsNotEmpty()
    @IsEnum(Status)
    readonly status: Status;


    @ApiProperty({ description: 'Reason' })
    readonly reason: string;

    @ApiProperty({ description: 'createdAt' })
    readonly createdAt: Date;

    @ApiProperty({ description: 'updatedAt' })
    readonly updatedAt: Date;
}