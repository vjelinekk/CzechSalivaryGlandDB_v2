export interface CommonPatientData {
    jmeno: string
    prijmeni: string
    id_pacient: string
    rodne_cislo: string
    vek_pri_diagnoze: number
    pohlavi: string
    kraj: string
    jine_nadorove_onemocneni_v_oa: string
    specifikace_mista_vyskytu_jineho_karcinomu: string
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: string
    specifikace_onemocneni: string
    koureni: string
    pocet_cigaret_denne: number
    jak_dlouho_kouri: number
    pocet_balickoroku: number
    abusus_alkoholu: string
}

export interface ParotidPatientData extends CommonPatientData {}

export interface SubmandibularPatientData extends CommonPatientData {}

export interface SublingualPatientData extends CommonPatientData {}
