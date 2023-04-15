import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Transform } from "stream";
import { Status } from "../../../../entity/Guest";

export class GuestDto {
    id: number;

    @ApiProperty({ description: 'UUID' })
    @IsNotEmpty()
    readonly uuid: string;

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
