// --- Copied from Frontend Types ---

import { FormType, StudyType } from './constants'

export interface PatientData {
    [key: string]: string | number | FormType
    id?: number
    form_type?: FormType
    attachments?: string
    jmeno?: string
    prijmeni?: string
    id_pacient?: string
    rodne_cislo?: string
    vek_pri_diagnoze?: number
    pohlavi?: string
    kraj?: string
    jine_nadorove_onemocneni_v_oa?: string
    specifikace_mista_vyskytu_jineho_karcinomu?: string
    jine_onemocneni_velkych_slinnych_zlaz_v_oa?: string
    specifikace_onemocneni?: string
    koureni?: string
    pocet_cigaret_denne?: number
    jak_dlouho_kouri?: number
    pocet_balickoroku?: number
    abusus_alkoholu?: string
    rok_diagnozy?: string
    diagnoza_mkn_10?: string
    strana_nalezu?: string
    diagnosticke_metody?: string
    fnab?: string
    vysledek_fnab?: string
    core_biopsie?: string
    core_vysledek?: string
    mukoepidermoidni_karcinom_core?: string
    adenoidne_cysticky_karcinom_core?: string
    polymorfni_adenokarcinom_core?: string
    intraduktalni_karcinom_core?: string
    salivarni_karcinom_nos_core?: string
    karcinom_z_pleomorfniho_adenomu_core?: string
    spatne_diferencovany_karcinom_core?: string
    otevrena_biopsie?: string
    otevrena_vysledek?: string
    mukoepidermoidni_karcinom_otevrena?: string
    adenoidne_cysticky_karcinom_otevrena?: string
    polymorfni_adenokarcinom_otevrena?: string
    intraduktalni_karcinom_otevrena?: string
    salivarni_karcinom_nos_otevrena?: string
    karcinom_z_pleomorfniho_adenomu_otevrena?: string
    spatne_diferencovany_karcinom_otevrena?: string
    datum_zahajeni_lecby?: string
    typ_terapie?: string
    rozsah_chirurgicke_lecby?: string
    blokova_krcni_disekce?: string
    strana_blokove_krcni_disekce?: string
    typ_nd?: string
    rozsah_nd?: string
    adjuvantni_terapie?: string
    typ_nechirurgicke_terapie?: string
    histopatologie_vysledek?: string
    mukoepidermoidni_karcinom_histopatologie?: string
    adenoidne_cysticky_karcinom_histopatologie?: string
    polymorfni_adenokarcinom_histopatologie?: string
    intraduktalni_karcinom_histopatologie?: string
    salivarni_karcinom_nos_histopatologie?: string
    karcinom_z_pleomorfniho_adenomu_histopatologie?: string
    spatne_diferencovany_karcinom_histopatologie?: string
    velikost_nadoru_histopatologie?: number
    velikost_nadoru_neurcena_histopatologie?: string
    okraj_resekce_histopatologie?: string
    lymfovaskularni_invaze_histopatologie?: string
    perineuralni_invaze_histopatologie?: string
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie?: string
    extranodalni_sireni_histopatologie?: string
    extranodalni_sireni_vysledek_histopatologie?: string
    prokazane_vzdalene_metastazy_histopatologie?: string
    misto_vyskytu_vzdalene_metastazy_histopatologie?: string
    t_klasifikace_klinicka?: string
    n_klasifikace_klinicka?: string
    m_klasifikace_klinicka?: string
    tnm_klasifikace_klinicka?: string
    t_klasifikace_patologicka?: string
    n_klasifikace_patologicka?: string
    m_klasifikace_patologicka?: string
    tnm_klasifikace_patologicka?: string
    datum_prvni_kontroly_po_lecbe?: string
    perzistence?: string
    datum_prokazani_perzistence?: string
    recidiva?: string
    datum_prokazani_recidivy?: string
    stav?: string
    datum_umrti?: string
    posledni_kontrola?: string
    planovana_kontrola?: string
    poznamky?: string
}

export interface ParotidMalignantPatientData extends PatientData {
    funkce_n_vii_dle_h_b_predoperacne?: string
    funkce_n_vii_dle_h_b_pooperacne?: string
    pooperacni_komplikace?: string
    jine_pooperacni_komplikace?: string
}

export interface SubmandibularMalignantPatientData extends PatientData {
    funkce_n_vii_dle_h_b_predoperacne?: string
    funkce_n_vii_dle_h_b_pooperacne?: string
}

export type SublingualMalignantPatientData = PatientData

export interface SubmandibularBenignPatientData {
    [key: string]: string | number | FormType
    id?: number
    form_type?: number
    jmeno?: string
    prijmeni?: string
    id_pacient?: string
    rodne_cislo?: string
    vek_pri_diagnoze?: number
    pohlavi?: string
    kraj?: string
    jine_nadorove_onemocneni_v_oa?: string
    specifikace_mista_vyskytu_jineho_karcinomu?: string
    jine_onemocneni_velkych_slinnych_zlaz_v_oa?: string
    specifikace_onemocneni?: string
    koureni?: string
    pocet_cigaret_denne?: number
    jak_dlouho_kouri?: number
    pocet_balickoroku?: number
    abusus_alkoholu?: string
    rok_diagnozy?: string
    strana_nalezu?: string
    funkce_n_vii_dle_h_b_predoperacne?: string
    diagnosticke_metody?: string
    fnab?: string
    vysledek_fnab?: string
    core_biopsie?: string
    core_vysledek?: string
    core_vysledek_jine?: string
    otevrena_biopsie?: string
    otevrena_vysledek?: string
    otevrena_vysledek_jine?: string
    datum_zahajeni_lecby?: string
    typ_terapie?: string
    rozsah_chirurgicke_lecby?: string
    funkce_n_vii_dle_h_b_pooperacne?: string
    pooperacni_komplikace?: string
    jine_pooperacni_komplikace?: string
    histopatologie_vysledek?: string
    histopatologie_vysledek_jine?: string
    velikost_nadoru_histopatologie?: number
    velikost_nadoru_neurcena_histopatologie?: string
    okraj_resekce_histopatologie?: string
    datum_prvni_kontroly_po_lecbe?: string
    doporuceno_dalsi_sledovani?: string
    perzistence?: string
    datum_prokazani_perzistence?: string
    recidiva?: string
    datum_prokazani_recidivy?: string
    stav?: string
    datum_umrti?: string
    posledni_kontrola?: string
    planovana_kontrola?: string
    attachments?: string
    poznamky?: string
}

export type ParoditBenignPatientData = SubmandibularBenignPatientData

export interface Study {
    id?: number
    nazev_studie?: string
    typ_studie?: StudyType
}

export interface PatientInStudy {
    id?: number
    id_pacient_db?: number
    id_studie?: number
    typ_pacienta?: FormType
}

export type PatientType =
    | ParotidMalignantPatientData
    | SubmandibularMalignantPatientData
    | SublingualMalignantPatientData
    | SubmandibularBenignPatientData
    | ParoditBenignPatientData

export enum TumorType {
    MALIGNANT = 1,
    BENIGN = 2,
}

export enum FilterColumn {
    FORM_TYPE = 'form_type',
    TYP_NADORU = 'typ_nadoru',
    TYP_TERAPIE = 'typ_terapie',
    HISTOPATOLOGIE_VYSLEDEK = 'histopatologie_vysledek',
    PERZISTENCE = 'perzistence',
    RECIDIVA = 'recidiva',
    STAV = 'stav',
    POHLAVI = 'pohlavi',
}

export interface FilteredColumns {
    [key: string]: string | string[] | FormType[] | TumorType
    [FilterColumn.FORM_TYPE]: FormType[]
    [FilterColumn.TYP_NADORU]: TumorType
    [FilterColumn.TYP_TERAPIE]: string[]
    [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: string[]
    [FilterColumn.PERZISTENCE]: string
    [FilterColumn.RECIDIVA]: string
    [FilterColumn.STAV]: string
    [FilterColumn.POHLAVI]: string
}

export interface KaplanMeierPatientData {
    start_date: Date | null
    event_date: Date | null
    last_follow_up_date: Date | null
}

export interface KaplanMeierData {
    [key: string]: KaplanMeierPatientData[]
}

export interface KaplanMeierCurveData {
    [key: string]: KaplanMeierCurveRecord[]
}

export interface KaplanMeierCurveRecord {
    time: number
    probability: number
}

export enum KaplanMeierType {
    survival = 'survival',
    recidive = 'recidive',
}

export interface PlannedPatientsMap {
    [key: string]: PatientType[]
}

export interface PlannedDay {
    date: Date
    patients: PatientType[]
}

export interface ITTestGroups {
    first: {
        histologicalTypes: string[]
        tClassification: string[]
        nClassification: string[]
        mClassification: string[]
        persistence: string[]
        recurrence: string[]
        state: string[]
    }
    second: {
        histologicalTypes: string[]
        tClassification: string[]
        nClassification: string[]
        mClassification: string[]
        persistence: string[]
        recurrence: string[]
        state: string[]
    }
}

export interface NonParametricTestData {
    group1: PatientType[]
    group2: PatientType[]
}

// --- Existing Backend Types ---

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
