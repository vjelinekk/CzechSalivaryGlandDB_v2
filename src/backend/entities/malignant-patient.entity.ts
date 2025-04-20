import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { Patient } from './patient.entity'
// import { TumorLocation } from './tumor-location.enum' // Pokud je tumor_location enum

@Entity({ name: 'malignant_patient' })
export class MalignantPatient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_patient: number

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'id_patient' })
    patient: Patient

    @Column({ type: 'text' })
    tumor_location: string

    @Column({ type: 'text', nullable: true })
    diagnoza_mkn_10: string

    // --- CORE ---

    @Column({ type: 'text', nullable: true })
    mukoepidermoidni_karcinom_core: string

    @Column({ type: 'text', nullable: true })
    adenoidne_cysticky_karcinom_core: string

    @Column({ type: 'text', nullable: true })
    polymorfni_adenokarcinom_core: string

    @Column({ type: 'text', nullable: true })
    intraduktalni_karcinom_core: string

    @Column({ type: 'text', nullable: true })
    salivarni_karcinom_nos_core: string

    @Column({ type: 'text', nullable: true })
    karcinom_z_pleomorfniho_adenomu_core: string

    @Column({ type: 'text', nullable: true })
    spatne_diferencovany_karcinom_core: string

    // --- OTEVRENA ---

    @Column({ type: 'text', nullable: true })
    mukoepidermoidni_karcinom_otevrena: string

    @Column({ type: 'text', nullable: true })
    adenoidne_cysticky_karcinom_otevrena: string

    @Column({ type: 'text', nullable: true })
    polymorfni_adenokarcinom_otevrena: string

    @Column({ type: 'text', nullable: true })
    intraduktalni_karcinom_otevrena: string

    @Column({ type: 'text', nullable: true })
    salivarni_karcinom_nos_otevrena: string

    @Column({ type: 'text', nullable: true })
    karcinom_z_pleomorfniho_adenomu_otevrena: string

    @Column({ type: 'text', nullable: true })
    spatne_diferencovany_karcinom_otevrena: string

    // --- TERAPIE ---

    @Column({ type: 'text', nullable: true })
    blokova_krcni_disekce: string

    @Column({ type: 'text', nullable: true })
    strana_blokove_krcni_disekce: string

    @Column({ type: 'text', nullable: true })
    typ_nd: string

    @Column({ type: 'text', nullable: true })
    rozsah_nd: string

    @Column({ type: 'text', nullable: true })
    adjuvantni_terapie: string

    @Column({ type: 'text', nullable: true })
    typ_nechirurgicke_terapie: string

    // --- HISTOPATOLOGIE ---

    @Column({ type: 'text', nullable: true })
    mukoepidermoidni_karcinom_histopatologie: string

    @Column({ type: 'text', nullable: true })
    adenoidne_cysticky_karcinom_histopatologie: string

    @Column({ type: 'text', nullable: true })
    polymorfni_adenokarcinom_histopatologie: string

    @Column({ type: 'text', nullable: true })
    intraduktalni_karcinom_histopatologie: string

    @Column({ type: 'text', nullable: true })
    salivarni_karcinom_nos_histopatologie: string

    @Column({ type: 'text', nullable: true })
    karcinom_z_pleomorfniho_adenomu_histopatologie: string

    @Column({ type: 'text', nullable: true })
    spatne_diferencovany_karcinom_histopatologie: string

    @Column({ type: 'text', nullable: true })
    lymfovaskularni_invaze_histopatologie: string

    @Column({ type: 'text', nullable: true })
    perineuralni_invaze_histopatologie: string

    @Column({ type: 'text', nullable: true })
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie: string

    @Column({ type: 'text', nullable: true })
    extranodalni_sireni_histopatologie: string

    @Column({ type: 'text', nullable: true })
    extranodalni_sireni_vysledek_histopatologie: string

    @Column({ type: 'text', nullable: true })
    prokazane_vzdalene_metastazy_histopatologie: string

    @Column({ type: 'text', nullable: true })
    misto_vyskytu_vzdalene_metastazy_histopatologie: string

    // --- TNM ---

    @Column({ type: 'text', nullable: true })
    t_klasifikace_klinicka: string

    @Column({ type: 'text', nullable: true })
    n_klasifikace_klinicka: string

    @Column({ type: 'text', nullable: true })
    m_klasifikace_klinicka: string

    @Column({ type: 'text', nullable: true })
    tnm_klasifikace_klinicka: string

    @Column({ type: 'text', nullable: true })
    t_klasifikace_patologicka: string

    @Column({ type: 'text', nullable: true })
    n_klasifikace_patologicka: string

    @Column({ type: 'text', nullable: true })
    m_klasifikace_patologicka: string

    @Column({ type: 'text', nullable: true })
    tnm_klasifikace_patologicka: string
}
