import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum Status {
    pending = 'pending',
    confirmed = 'confirmed',
    declined = 'declined',
}


@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.pending
    })
    status: string

    @Column({ readonly: true })
    canAddGuest: boolean;


    @Column({ readonly: false })
    anonymous: boolean;

    @Column({ default: 0 })
    extraAttendees: number;

    @Column({ nullable: true })
    confirmedDate: Date

    @Column({ nullable: true })
    reason: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    updatedAt: Date
}
