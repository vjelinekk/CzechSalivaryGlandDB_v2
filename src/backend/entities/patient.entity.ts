import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm';

@Entity()
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    tumor_type: string;

    @Column({ nullable: true })
    jmeno: string;

    @Column({ nullable: true })
    prijmeni: string;

    @Column({ nullable: true })
    id_pacient: string;

    @Column({ nullable: true })
    rodne_cislo: string;

    @Column({ nullable: true })
    vek_pri_diagnoze: number;

    @Column({ nullable: true })
    pohlavi: string;

    @Column({ nullable: true })
    kraj: string;

    @Column({ nullable: true })
    jine_nadorove_onemocneni_v_oa: string;

    @Column({ nullable: true })
    specifikace_mista_vyskytu_jineho_karcinomu: string;

    @Column({ nullable: true })
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: string;

    @Column({ nullable: true })
    specifikace_onemocneni: string;

    @Column({ nullable: true })
    koureni: boolean;

    @Column({ nullable: true })
    pocet_cigaret_denne: number;

    @Column('float', { nullable: true })
    jak_dlouho_kouri: number;

    @Column('float', { nullable: true })
    pocet_balickoroku: number;

    @Column({ nullable: true })
    abusus_alkoholu: boolean;

    @Column('date', { nullable: true })
    rok_diagnozy: string;

    @Column({ nullable: true })
    strana_nalezu: string;

    @Column({ nullable: true })
    diagnosticke_metody: string;

    @Column({ nullable: true })
    fnab: string;

    @Column({ nullable: true })
    vysledek_fnab: string;

    @Column({ nullable: true })
    core_biopsie: string;

    @Column({ nullable: true })
    core_vysledek: string;

    @Column({ nullable: true })
    otevrena_biopsie: string;

    @Column({ nullable: true })
    otevrena_vysledek: string;

    @Column('date', { nullable: true })
    datum_zahajeni_lecby: string;

    @Column({ nullable: true })
    typ_terapie: string;

    @Column({ nullable: true })
    rozsah_chirurgicke_lecby: string;

    @Column({ nullable: true })
    histopatologie_vysledek: string;

    @Column({ nullable: true })
    velikost_nadoru_histopatologie: string;

    @Column({ nullable: true })
    velikost_nadoru_neurcena_histopatologie: string;

    @Column({ nullable: true })
    okraj_resekce_histopatologie: string;

    @Column('date', { nullable: true })
    datum_prvni_kontroly_po_lecbe: string;

    @Column({ nullable: true })
    perzistence: boolean;

    @Column('date', { nullable: true })
    datum_prokazani_perzistence: string;

    @Column({ nullable: true })
    recidiva: boolean;

    @Column('date', { nullable: true })
    datum_prokazani_recidivy: string;

    @Column({ nullable: true })
    stav: boolean;

    @Column('date', { nullable: true })
    datum_umrti: string;

    @Column('date', { nullable: true })
    posledni_kontrola: string;

    @Column('date', { nullable: true })
    planovana_kontrola: string;

    @Column({ nullable: true })
    attachments: string;

    @Column({ nullable: true })
    poznamky: string;
}
