import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { Patient } from './patient.entity'

@Entity({ name: 'benign_patient' })
export class BenignPatient extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_patient: number

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'id_patient' })
    patient: Patient

    @Column({ type: 'text', nullable: true })
    tumor_location: string

    @Column({ type: 'text', nullable: true })
    funkce_n_vii_dle_h_b_predoperacne: string

    @Column({ type: 'text', nullable: true })
    core_vysledek_jine: string

    @Column({ type: 'text', nullable: true })
    otevrena_vysledek_jine: string

    @Column({ type: 'text', nullable: true })
    funkce_n_vii_dle_h_b_pooperacne: string

    @Column({ type: 'text', nullable: true })
    pooperacni_komplikace: string

    @Column({ type: 'text', nullable: true })
    jine_pooperacni_komplikace: string

    @Column({ type: 'text', nullable: true })
    histopatologie_vysledek_jine: string

    @Column({ type: 'text', nullable: true })
    doporuceno_dalsi_sledovani: string
}
