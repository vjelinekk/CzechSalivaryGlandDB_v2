import { FormType } from '../../constants'

export interface SubmandibularBenignPatientDomainEntity {
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
