import { PatientType } from '../frontend/types'

export type RowRecordType = Record<string, string | number>

interface ColumnDefinition {
    [key: string]: string
    columnName: string
    columnType: string
}

export interface CommonColumns {
    [key: string]: ColumnDefinition
    id: ColumnDefinition
    form_type: ColumnDefinition
    attachments: ColumnDefinition
    jmeno: ColumnDefinition
    prijmeni: ColumnDefinition
    id_pacient: ColumnDefinition
    rodne_cislo: ColumnDefinition
    vek_pri_diagnoze: ColumnDefinition
    pohlavi: ColumnDefinition
    kraj: ColumnDefinition
    jine_nadorove_onemocneni_v_oa: ColumnDefinition
    specifikace_mista_vyskytu_jineho_karcinomu: ColumnDefinition
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: ColumnDefinition
    specifikace_onemocneni: ColumnDefinition
    koureni: ColumnDefinition
    pocet_cigaret_denne: ColumnDefinition
    jak_dlouho_kouri: ColumnDefinition
    pocet_balickoroku: ColumnDefinition
    abusus_alkoholu: ColumnDefinition
    rok_diagnozy: ColumnDefinition
    diagnoza_mkn_10: ColumnDefinition
    strana_nalezu: ColumnDefinition
    diagnosticke_metody: ColumnDefinition
    fnab: ColumnDefinition
    vysledek_fnab: ColumnDefinition
    core_biopsie: ColumnDefinition
    core_vysledek: ColumnDefinition
    mukoepidermoidni_karcinom_core: ColumnDefinition
    adenoidne_cysticky_karcinom_core: ColumnDefinition
    polymorfni_adenokarcinom_core: ColumnDefinition
    intraduktalni_karcinom_core: ColumnDefinition
    salivarni_karcinom_nos_core: ColumnDefinition
    karcinom_z_pleomorfniho_adenomu_core: ColumnDefinition
    spatne_diferencovany_karcinom_core: ColumnDefinition
    otevrena_biopsie: ColumnDefinition
    otevrena_vysledek: ColumnDefinition
    mukoepidermoidni_karcinom_otevrena: ColumnDefinition
    adenoidne_cysticky_karcinom_otevrena: ColumnDefinition
    polymorfni_adenokarcinom_otevrena: ColumnDefinition
    intraduktalni_karcinom_otevrena: ColumnDefinition
    salivarni_karcinom_nos_otevrena: ColumnDefinition
    karcinom_z_pleomorfniho_adenomu_otevrena: ColumnDefinition
    spatne_diferencovany_karcinom_otevrena: ColumnDefinition
    datum_zahajeni_lecby: ColumnDefinition
    typ_terapie: ColumnDefinition
    rozsah_chirurgicke_lecby: ColumnDefinition
    blokova_krcni_disekce: ColumnDefinition
    strana_blokove_krcni_disekce: ColumnDefinition
    typ_nd: ColumnDefinition
    rozsah_nd: ColumnDefinition
    adjuvantni_terapie: ColumnDefinition
    typ_nechirurgicke_terapie: ColumnDefinition
    histopatologie_vysledek: ColumnDefinition
    mukoepidermoidni_karcinom_histopatologie: ColumnDefinition
    adenoidne_cysticky_karcinom_histopatologie: ColumnDefinition
    polymorfni_adenokarcinom_histopatologie: ColumnDefinition
    intraduktalni_karcinom_histopatologie: ColumnDefinition
    salivarni_karcinom_nos_histopatologie: ColumnDefinition
    karcinom_z_pleomorfniho_adenomu_histopatologie: ColumnDefinition
    spatne_diferencovany_karcinom_histopatologie: ColumnDefinition
    velikost_nadoru_histopatologie: ColumnDefinition
    velikost_nadoru_neurcena_histopatologie: ColumnDefinition
    okraj_resekce_histopatologie: ColumnDefinition
    lymfovaskularni_invaze_histopatologie: ColumnDefinition
    perineuralni_invaze_histopatologie: ColumnDefinition
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie: ColumnDefinition
    extranodalni_sireni_histopatologie: ColumnDefinition
    extranodalni_sireni_vysledek_histopatologie: ColumnDefinition
    prokazane_vzdalene_metastazy_histopatologie: ColumnDefinition
    misto_vyskytu_vzdalene_metastazy_histopatologie: ColumnDefinition
    t_klasifikace_klinicka: ColumnDefinition
    n_klasifikace_klinicka: ColumnDefinition
    m_klasifikace_klinicka: ColumnDefinition
    tnm_klasifikace_klinicka: ColumnDefinition
    t_klasifikace_patologicka: ColumnDefinition
    n_klasifikace_patologicka: ColumnDefinition
    m_klasifikace_patologicka: ColumnDefinition
    tnm_klasifikace_patologicka: ColumnDefinition
    datum_prvni_kontroly_po_lecbe: ColumnDefinition
    perzistence: ColumnDefinition
    datum_prokazani_perzistence: ColumnDefinition
    recidiva: ColumnDefinition
    datum_prokazani_recidivy: ColumnDefinition
    stav: ColumnDefinition
    datum_umrti: ColumnDefinition
    posledni_kontrola: ColumnDefinition
    planovana_kontrola: ColumnDefinition
    poznamky: ColumnDefinition
    PRIMARY_KEY: ColumnDefinition
}

export interface SubmandibularMalignantColumns extends CommonColumns {
    funkce_n_vii_dle_h_b_predoperacne: ColumnDefinition
    funkce_n_vii_dle_h_b_pooperacne: ColumnDefinition
}

export type SublingualMalignantColumns = CommonColumns

export interface ParotidMalignantColumns extends CommonColumns {
    funkce_n_vii_dle_h_b_predoperacne: ColumnDefinition
    funkce_n_vii_dle_h_b_pooperacne: ColumnDefinition
    pooperacni_komplikace: ColumnDefinition
    jine_pooperacni_komplikace: ColumnDefinition
}

export interface BenignColumns {
    [key: string]: ColumnDefinition
    id: ColumnDefinition
    form_type: ColumnDefinition
    attachments: ColumnDefinition
    jmeno: ColumnDefinition
    prijmeni: ColumnDefinition
    id_pacient: ColumnDefinition
    rodne_cislo: ColumnDefinition
    vek_pri_diagnoze: ColumnDefinition
    pohlavi: ColumnDefinition
    kraj: ColumnDefinition
    jine_nadorove_onemocneni_v_oa: ColumnDefinition
    specifikace_mista_vyskytu_jineho_karcinomu: ColumnDefinition
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: ColumnDefinition
    specifikace_onemocneni: ColumnDefinition
    koureni: ColumnDefinition
    pocet_cigaret_denne: ColumnDefinition
    jak_dlouho_kouri: ColumnDefinition
    pocet_balickoroku: ColumnDefinition
    abusus_alkoholu: ColumnDefinition
    rok_diagnozy: ColumnDefinition
    strana_nalezu: ColumnDefinition
    funkce_n_vii_dle_h_b_predoperacne: ColumnDefinition
    diagnosticke_metody: ColumnDefinition
    fnab: ColumnDefinition
    vysledek_fnab: ColumnDefinition
    core_biopsie: ColumnDefinition
    core_vysledek: ColumnDefinition
    otevrena_biopsie: ColumnDefinition
    otevrena_vysledek: ColumnDefinition
    datum_zahajeni_lecby: ColumnDefinition
    typ_terapie: ColumnDefinition
    rozsah_chirurgicke_lecby: ColumnDefinition
    funkce_n_vii_dle_h_b_pooperacne: ColumnDefinition
    pooperacni_komplikace: ColumnDefinition
    jine_pooperacni_komplikace: ColumnDefinition
    histopatologie_vysledek: ColumnDefinition
    histopatologie_vysledek_jine: ColumnDefinition
    velikost_nadoru_histopatologie: ColumnDefinition
    okraj_resekce_histopatologie: ColumnDefinition
    datum_prvni_kontroly_po_lecbe: ColumnDefinition
    doporuceno_dalsi_sledovani: ColumnDefinition
    perzistence: ColumnDefinition
    datum_prokazani_perzistence: ColumnDefinition
    recidiva: ColumnDefinition
    datum_prokazani_recidivy: ColumnDefinition
    stav: ColumnDefinition
    datum_umrti: ColumnDefinition
    posledni_kontrola: ColumnDefinition
    planovana_kontrola: ColumnDefinition
    poznamky: ColumnDefinition
    PRIMARY_KEY: ColumnDefinition
}

export type SubmandibularBenignColumns = BenignColumns
export type ParotidBenignColumns = BenignColumns

export interface StudyColumns {
    id: ColumnDefinition
    nazev_studie: ColumnDefinition
    typ_studie: ColumnDefinition
    PRIMARY_KEY: ColumnDefinition
}

export interface IsInStudyColumns {
    id: ColumnDefinition
    id_studie: ColumnDefinition
    id_pacient_db: ColumnDefinition
    typ_pacienta: ColumnDefinition
    FOREIGN_KEY: ColumnDefinition
    PRIMARY_KEY: ColumnDefinition
}

export interface PasswordColumns {
    id: ColumnDefinition
    password: ColumnDefinition
    using_encryption: ColumnDefinition
    PRIMARY_KEY: ColumnDefinition
}

export interface IsInStudyType {
    id: number
    id_studie: number
    id_pacient_db: number
    typ_pacienta: string
}

export interface PasswordType {
    id?: number
    password?: string
    using_encryption?: boolean
}

export interface PlannedPatientsMap {
    [key: string]: PatientType[]
}
