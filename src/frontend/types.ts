import { Dispatch, SetStateAction } from 'react'
import { Components, FormStates, FormType, StudyType } from './constants'

export interface ActiveComponentState {
    component: Components
    activePatient?: PatientType | null
    studyType?: StudyType | null
    activeStudy?: Study | null
}

export interface EditSavedState {
    done: boolean
    saved: boolean | null
}

export interface GlandComponentProps {
    formData: PatientData | null
    setFormData: Dispatch<SetStateAction<PatientData | null>>
    setFormErrors?: Dispatch<SetStateAction<string[]>>
    disabled: boolean
}

export interface GlandFormProps {
    data?: PatientData
    defaultFormState: FormStates
    setActiveComponent?: Dispatch<SetStateAction<ActiveComponentState>>
    editSaved?: EditSavedState
    setEditSaved?: Dispatch<SetStateAction<EditSavedState>>
    setActivePatient?: Dispatch<SetStateAction<PatientType | null>>
    defaultSelectedStudies?: Study[]
    idStudie?: number
}

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
    start_date: string
    event_date: string
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

export interface PlannedPatientsMap {
    [key: string]: PatientType[]
}

export interface PlannedDay {
    date: Date
    patients: PatientType[]
}

export type JSONObject = { 
    [key: string]: string 
}
