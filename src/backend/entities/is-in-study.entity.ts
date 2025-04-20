import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { Study } from './study.entity'
import { Patient } from './patient.entity'

@Entity({ name: 'is_in_study' })
export class IsInStudy extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_study: number

    @ManyToOne(() => Study, (study) => study.patientsInStudy)
    @JoinColumn({ name: 'id_study' })
    study: Study

    @Column()
    id_patient: number

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'id_patient' })
    patient: Patient
}
