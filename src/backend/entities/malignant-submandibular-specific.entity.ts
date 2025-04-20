import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { MalignantPatient } from './malignant-patient.entity'

@Entity({ name: 'malignant_submandibular_specific' })
export class MalignantSubmandibularSpecific extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_malignant_patient: number

    @ManyToOne(() => MalignantPatient)
    @JoinColumn({ name: 'id_malignant_patient' })
    malignant_patient: MalignantPatient

    @Column({ type: 'text', nullable: true })
    funkce_n_vii_dle_h_b_predoperacne: string

    @Column({ type: 'text', nullable: true })
    funkce_n_vii_dle_h_b_pooperacne: string
}
