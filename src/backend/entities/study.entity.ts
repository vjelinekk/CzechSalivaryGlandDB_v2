import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm'
import { IsInStudy } from './is-in-study.entity'

@Entity({ name: 'study' })
export class Study extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    study_name: string

    @Column({ type: 'int' })
    study_type: number

    @OneToMany(() => IsInStudy, (isInStudy) => isInStudy.study)
    patientsInStudy: IsInStudy[]
}
