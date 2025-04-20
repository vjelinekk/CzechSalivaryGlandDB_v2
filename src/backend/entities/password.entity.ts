import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'password' })
export class Password extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: true })
    password: string

    @Column({ type: 'boolean', default: null })
    using_encryption: boolean
}
