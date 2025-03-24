import {
    JeVeStudiiColumns,
    ParotidBenignColumns,
    PasswordColumns,
    PodcelistniColumns,
    PodjazykoveColumns,
    PriusniColumns,
    StudieColumns,
    SubmandibularBenignColumns,
} from './types'

export enum TableNames {
    podcelistni = 'form_podcelistni',
    podjazykove = 'form_podjazykove',
    priusni = 'form_priusni',
    submandibularBenign = 'form_submandibular_benign',
    parotidBenign = 'form_parotid_benign',
    studie = 'studie',
    jeVeStudii = 'je_ve_studii',
    password = 'password',
}

export const podcelistniColumns: PodcelistniColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    form_type: {
        columnName: 'form_type',
        columnType: 'INTEGER',
    },
    jmeno: {
        columnName: 'jmeno',
        columnType: 'TEXT',
    },
    prijmeni: {
        columnName: 'prijmeni',
        columnType: 'TEXT',
    },
    id_pacient: {
        columnName: 'id_pacient',
        columnType: 'TEXT',
    },
    rodne_cislo: {
        columnName: 'rodne_cislo',
        columnType: 'TEXT',
    },
    vek_pri_diagnoze: {
        columnName: 'vek_pri_diagnoze',
        columnType: 'INTEGER',
    },
    pohlavi: {
        columnName: 'pohlavi',
        columnType: 'TEXT',
    },
    kraj: {
        columnName: 'kraj',
        columnType: 'TEXT',
    },
    jine_nadorove_onemocneni_v_oa: {
        columnName: 'jine_nadorove_onemocneni_v_oa',
        columnType: 'TEXT',
    },
    specifikace_mista_vyskytu_jineho_karcinomu: {
        columnName: 'specifikace_mista_vyskytu_jineho_karcinomu',
        columnType: 'TEXT',
    },
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: {
        columnName: 'jine_onemocneni_velkych_slinnych_zlaz_v_oa',
        columnType: 'TEXT',
    },
    specifikace_onemocneni: {
        columnName: 'specifikace_onemocneni',
        columnType: 'TEXT',
    },
    koureni: {
        columnName: 'koureni',
        columnType: 'TEXT',
    },
    pocet_cigaret_denne: {
        columnName: 'pocet_cigaret_denne',
        columnType: 'INTEGER',
    },
    jak_dlouho_kouri: {
        columnName: 'jak_dlouho_kouri',
        columnType: 'INTEGER',
    },
    pocet_balickoroku: {
        columnName: 'pocet_balickoroku',
        columnType: 'REAL',
    },
    abusus_alkoholu: {
        columnName: 'abusus_alkoholu',
        columnType: 'TEXT',
    },
    rok_diagnozy: {
        columnName: 'rok_diagnozy',
        columnType: 'TEXT',
    },
    diagnoza_mkn_10: {
        columnName: 'diagnoza_mkn_10',
        columnType: 'TEXT',
    },
    strana_nalezu: {
        columnName: 'strana_nalezu',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_predoperacne: {
        columnName: 'funkce_n_vii_dle_h_b_predoperacne',
        columnType: 'TEXT',
    },
    diagnosticke_metody: {
        columnName: 'diagnosticke_metody',
        columnType: 'TEXT',
    },
    fnab: {
        columnName: 'fnab',
        columnType: 'TEXT',
    },
    vysledek_fnab: {
        columnName: 'vysledek_fnab',
        columnType: 'TEXT',
    },
    core_biopsie: {
        columnName: 'core_biopsie',
        columnType: 'TEXT',
    },
    core_vysledek: {
        columnName: 'core_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_core: {
        columnName: 'mukoepidermoidni_karcinom_core',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_core: {
        columnName: 'adenoidne_cysticky_karcinom_core',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_core: {
        columnName: 'polymorfni_adenokarcinom_core',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_core: {
        columnName: 'intraduktalni_karcinom_core',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_core: {
        columnName: 'salivarni_karcinom_nos_core',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_core: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_core',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_core: {
        columnName: 'spatne_diferencovany_karcinom_core',
        columnType: 'TEXT',
    },
    otevrena_biopsie: {
        columnName: 'otevrena_biopsie',
        columnType: 'TEXT',
    },
    otevrena_vysledek: {
        columnName: 'otevrena_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_otevrena: {
        columnName: 'mukoepidermoidni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_otevrena: {
        columnName: 'adenoidne_cysticky_karcinom_otevrena',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_otevrena: {
        columnName: 'polymorfni_adenokarcinom_otevrena',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_otevrena: {
        columnName: 'intraduktalni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_otevrena: {
        columnName: 'salivarni_karcinom_nos_otevrena',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_otevrena: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_otevrena',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_otevrena: {
        columnName: 'spatne_diferencovany_karcinom_otevrena',
        columnType: 'TEXT',
    },
    datum_zahajeni_lecby: {
        columnName: 'datum_zahajeni_lecby',
        columnType: 'TEXT',
    },
    typ_terapie: {
        columnName: 'typ_terapie',
        columnType: 'TEXT',
    },
    rozsah_chirurgicke_lecby: {
        columnName: 'rozsah_chirurgicke_lecby',
        columnType: 'TEXT',
    },
    blokova_krcni_disekce: {
        columnName: 'blokova_krcni_disekce',
        columnType: 'TEXT',
    },
    strana_blokove_krcni_disekce: {
        columnName: 'strana_blokove_krcni_disekce',
        columnType: 'TEXT',
    },
    typ_nd: {
        columnName: 'typ_nd',
        columnType: 'TEXT',
    },
    rozsah_nd: {
        columnName: 'rozsah_nd',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_pooperacne: {
        columnName: 'funkce_n_vii_dle_h_b_pooperacne',
        columnType: 'TEXT',
    },
    adjuvantni_terapie: {
        columnName: 'adjuvantni_terapie',
        columnType: 'TEXT',
    },
    typ_nechirurgicke_terapie: {
        columnName: 'typ_nechirurgicke_terapie',
        columnType: 'TEXT',
    },
    histopatologie_vysledek: {
        columnName: 'histopatologie_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_histopatologie: {
        columnName: 'mukoepidermoidni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_histopatologie: {
        columnName: 'adenoidne_cysticky_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_histopatologie: {
        columnName: 'polymorfni_adenokarcinom_histopatologie',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_histopatologie: {
        columnName: 'intraduktalni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_histopatologie: {
        columnName: 'salivarni_karcinom_nos_histopatologie',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_histopatologie: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_histopatologie',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_histopatologie: {
        columnName: 'spatne_diferencovany_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    velikost_nadoru_histopatologie: {
        columnName: 'velikost_nadoru_histopatologie',
        columnType: 'INTEGER',
    },
    velikost_nadoru_neurcena_histopatologie: {
        columnName: 'velikost_nadoru_neurcena_histopatologie',
        columnType: 'TEXT',
    },
    okraj_resekce_histopatologie: {
        columnName: 'okraj_resekce_histopatologie',
        columnType: 'TEXT',
    },
    lymfovaskularni_invaze_histopatologie: {
        columnName: 'lymfovaskularni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    perineuralni_invaze_histopatologie: {
        columnName: 'perineuralni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie: {
        columnName: 'pocet_lymfatickych_uzlin_s_metastazou_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_histopatologie: {
        columnName: 'extranodalni_sireni_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_vysledek_histopatologie: {
        columnName: 'extranodalni_sireni_vysledek_histopatologie',
        columnType: 'TEXT',
    },
    prokazane_vzdalene_metastazy_histopatologie: {
        columnName: 'prokazane_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    misto_vyskytu_vzdalene_metastazy_histopatologie: {
        columnName: 'misto_vyskytu_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    t_klasifikace_klinicka: {
        columnName: 't_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    n_klasifikace_klinicka: {
        columnName: 'n_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    m_klasifikace_klinicka: {
        columnName: 'm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_klinicka: {
        columnName: 'tnm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    t_klasifikace_patologicka: {
        columnName: 't_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    n_klasifikace_patologicka: {
        columnName: 'n_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    m_klasifikace_patologicka: {
        columnName: 'm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_patologicka: {
        columnName: 'tnm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    datum_prvni_kontroly_po_lecbe: {
        columnName: 'datum_prvni_kontroly_po_lecbe',
        columnType: 'TEXT',
    },
    perzistence: {
        columnName: 'perzistence',
        columnType: 'TEXT',
    },
    datum_prokazani_perzistence: {
        columnName: 'datum_prokazani_perzistence',
        columnType: 'TEXT',
    },
    recidiva: {
        columnName: 'recidiva',
        columnType: 'TEXT',
    },
    datum_prokazani_recidivy: {
        columnName: 'datum_prokazani_recidivy',
        columnType: 'TEXT',
    },
    stav: {
        columnName: 'stav',
        columnType: 'TEXT',
    },
    datum_umrti: {
        columnName: 'datum_umrti',
        columnType: 'TEXT',
    },
    posledni_kontrola: {
        columnName: 'posledni_kontrola',
        columnType: 'TEXT',
    },
    planovana_kontrola: {
        columnName: 'planovana_kontrola',
        columnType: 'TEXT',
    },
    attachments: {
        columnName: 'attachments',
        columnType: 'TEXT',
    },
    poznamky: {
        columnName: 'poznamky',
        columnType: 'TEXT',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const podjazykoveColumns: PodjazykoveColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    form_type: {
        columnName: 'form_type',
        columnType: 'INTEGER',
    },
    jmeno: {
        columnName: 'jmeno',
        columnType: 'TEXT',
    },
    prijmeni: {
        columnName: 'prijmeni',
        columnType: 'TEXT',
    },
    id_pacient: {
        columnName: 'id_pacient',
        columnType: 'TEXT',
    },
    rodne_cislo: {
        columnName: 'rodne_cislo',
        columnType: 'TEXT',
    },
    vek_pri_diagnoze: {
        columnName: 'vek_pri_diagnoze',
        columnType: 'INTEGER',
    },
    pohlavi: {
        columnName: 'pohlavi',
        columnType: 'TEXT',
    },
    kraj: {
        columnName: 'kraj',
        columnType: 'TEXT',
    },
    jine_nadorove_onemocneni_v_oa: {
        columnName: 'jine_nadorove_onemocneni_v_oa',
        columnType: 'TEXT',
    },
    specifikace_mista_vyskytu_jineho_karcinomu: {
        columnName: 'specifikace_mista_vyskytu_jineho_karcinomu',
        columnType: 'TEXT',
    },
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: {
        columnName: 'jine_onemocneni_velkych_slinnych_zlaz_v_oa',
        columnType: 'TEXT',
    },
    specifikace_onemocneni: {
        columnName: 'specifikace_onemocneni',
        columnType: 'TEXT',
    },
    koureni: {
        columnName: 'koureni',
        columnType: 'TEXT',
    },
    pocet_cigaret_denne: {
        columnName: 'pocet_cigaret_denne',
        columnType: 'INTEGER',
    },
    jak_dlouho_kouri: {
        columnName: 'jak_dlouho_kouri',
        columnType: 'INTEGER',
    },
    pocet_balickoroku: {
        columnName: 'pocet_balickoroku',
        columnType: 'REAL',
    },
    abusus_alkoholu: {
        columnName: 'abusus_alkoholu',
        columnType: 'TEXT',
    },
    rok_diagnozy: {
        columnName: 'rok_diagnozy',
        columnType: 'TEXT',
    },
    diagnoza_mkn_10: {
        columnName: 'diagnoza_mkn_10',
        columnType: 'TEXT',
    },
    strana_nalezu: {
        columnName: 'strana_nalezu',
        columnType: 'TEXT',
    },
    diagnosticke_metody: {
        columnName: 'diagnosticke_metody',
        columnType: 'TEXT',
    },
    fnab: {
        columnName: 'fnab',
        columnType: 'TEXT',
    },
    vysledek_fnab: {
        columnName: 'vysledek_fnab',
        columnType: 'TEXT',
    },
    core_biopsie: {
        columnName: 'core_biopsie',
        columnType: 'TEXT',
    },
    core_vysledek: {
        columnName: 'core_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_core: {
        columnName: 'mukoepidermoidni_karcinom_core',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_core: {
        columnName: 'adenoidne_cysticky_karcinom_core',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_core: {
        columnName: 'polymorfni_adenokarcinom_core',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_core: {
        columnName: 'intraduktalni_karcinom_core',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_core: {
        columnName: 'salivarni_karcinom_nos_core',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_core: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_core',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_core: {
        columnName: 'spatne_diferencovany_karcinom_core',
        columnType: 'TEXT',
    },
    otevrena_biopsie: {
        columnName: 'otevrena_biopsie',
        columnType: 'TEXT',
    },
    otevrena_vysledek: {
        columnName: 'otevrena_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_otevrena: {
        columnName: 'mukoepidermoidni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_otevrena: {
        columnName: 'adenoidne_cysticky_karcinom_otevrena',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_otevrena: {
        columnName: 'polymorfni_adenokarcinom_otevrena',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_otevrena: {
        columnName: 'intraduktalni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_otevrena: {
        columnName: 'salivarni_karcinom_nos_otevrena',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_otevrena: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_otevrena',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_otevrena: {
        columnName: 'spatne_diferencovany_karcinom_otevrena',
        columnType: 'TEXT',
    },
    datum_zahajeni_lecby: {
        columnName: 'datum_zahajeni_lecby',
        columnType: 'TEXT',
    },
    typ_terapie: {
        columnName: 'typ_terapie',
        columnType: 'TEXT',
    },
    rozsah_chirurgicke_lecby: {
        columnName: 'rozsah_chirurgicke_lecby',
        columnType: 'TEXT',
    },
    blokova_krcni_disekce: {
        columnName: 'blokova_krcni_disekce',
        columnType: 'TEXT',
    },
    strana_blokove_krcni_disekce: {
        columnName: 'strana_blokove_krcni_disekce',
        columnType: 'TEXT',
    },
    typ_nd: {
        columnName: 'typ_nd',
        columnType: 'TEXT',
    },
    rozsah_nd: {
        columnName: 'rozsah_nd',
        columnType: 'TEXT',
    },
    adjuvantni_terapie: {
        columnName: 'adjuvantni_terapie',
        columnType: 'TEXT',
    },
    typ_nechirurgicke_terapie: {
        columnName: 'typ_nechirurgicke_terapie',
        columnType: 'TEXT',
    },
    histopatologie_vysledek: {
        columnName: 'histopatologie_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_histopatologie: {
        columnName: 'mukoepidermoidni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_histopatologie: {
        columnName: 'adenoidne_cysticky_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_histopatologie: {
        columnName: 'polymorfni_adenokarcinom_histopatologie',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_histopatologie: {
        columnName: 'intraduktalni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_histopatologie: {
        columnName: 'salivarni_karcinom_nos_histopatologie',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_histopatologie: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_histopatologie',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_histopatologie: {
        columnName: 'spatne_diferencovany_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    velikost_nadoru_histopatologie: {
        columnName: 'velikost_nadoru_histopatologie',
        columnType: 'INTEGER',
    },
    velikost_nadoru_neurcena_histopatologie: {
        columnName: 'velikost_nadoru_neurcena_histopatologie',
        columnType: 'TEXT',
    },
    okraj_resekce_histopatologie: {
        columnName: 'okraj_resekce_histopatologie',
        columnType: 'TEXT',
    },
    lymfovaskularni_invaze_histopatologie: {
        columnName: 'lymfovaskularni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    perineuralni_invaze_histopatologie: {
        columnName: 'perineuralni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie: {
        columnName: 'pocet_lymfatickych_uzlin_s_metastazou_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_histopatologie: {
        columnName: 'extranodalni_sireni_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_vysledek_histopatologie: {
        columnName: 'extranodalni_sireni_vysledek_histopatologie',
        columnType: 'TEXT',
    },
    prokazane_vzdalene_metastazy_histopatologie: {
        columnName: 'prokazane_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    misto_vyskytu_vzdalene_metastazy_histopatologie: {
        columnName: 'misto_vyskytu_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    t_klasifikace_klinicka: {
        columnName: 't_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    n_klasifikace_klinicka: {
        columnName: 'n_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    m_klasifikace_klinicka: {
        columnName: 'm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_klinicka: {
        columnName: 'tnm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    t_klasifikace_patologicka: {
        columnName: 't_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    n_klasifikace_patologicka: {
        columnName: 'n_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    m_klasifikace_patologicka: {
        columnName: 'm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_patologicka: {
        columnName: 'tnm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    datum_prvni_kontroly_po_lecbe: {
        columnName: 'datum_prvni_kontroly_po_lecbe',
        columnType: 'TEXT',
    },
    perzistence: {
        columnName: 'perzistence',
        columnType: 'TEXT',
    },
    datum_prokazani_perzistence: {
        columnName: 'datum_prokazani_perzistence',
        columnType: 'TEXT',
    },
    recidiva: {
        columnName: 'recidiva',
        columnType: 'TEXT',
    },
    datum_prokazani_recidivy: {
        columnName: 'datum_prokazani_recidivy',
        columnType: 'TEXT',
    },
    stav: {
        columnName: 'stav',
        columnType: 'TEXT',
    },
    datum_umrti: {
        columnName: 'datum_umrti',
        columnType: 'TEXT',
    },
    posledni_kontrola: {
        columnName: 'posledni_kontrola',
        columnType: 'TEXT',
    },
    planovana_kontrola: {
        columnName: 'planovana_kontrola',
        columnType: 'TEXT',
    },
    attachments: {
        columnName: 'attachments',
        columnType: 'TEXT',
    },
    poznamky: {
        columnName: 'poznamky',
        columnType: 'TEXT',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const priusniColumns: PriusniColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    form_type: {
        columnName: 'form_type',
        columnType: 'INTEGER',
    },
    jmeno: {
        columnName: 'jmeno',
        columnType: 'TEXT',
    },
    prijmeni: {
        columnName: 'prijmeni',
        columnType: 'TEXT',
    },
    id_pacient: {
        columnName: 'id_pacient',
        columnType: 'TEXT',
    },
    rodne_cislo: {
        columnName: 'rodne_cislo',
        columnType: 'TEXT',
    },
    vek_pri_diagnoze: {
        columnName: 'vek_pri_diagnoze',
        columnType: 'INTEGER',
    },
    pohlavi: {
        columnName: 'pohlavi',
        columnType: 'TEXT',
    },
    kraj: {
        columnName: 'kraj',
        columnType: 'TEXT',
    },
    jine_nadorove_onemocneni_v_oa: {
        columnName: 'jine_nadorove_onemocneni_v_oa',
        columnType: 'TEXT',
    },
    specifikace_mista_vyskytu_jineho_karcinomu: {
        columnName: 'specifikace_mista_vyskytu_jineho_karcinomu',
        columnType: 'TEXT',
    },
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: {
        columnName: 'jine_onemocneni_velkych_slinnych_zlaz_v_oa',
        columnType: 'TEXT',
    },
    specifikace_onemocneni: {
        columnName: 'specifikace_onemocneni',
        columnType: 'TEXT',
    },
    koureni: {
        columnName: 'koureni',
        columnType: 'TEXT',
    },
    pocet_cigaret_denne: {
        columnName: 'pocet_cigaret_denne',
        columnType: 'INTEGER',
    },
    jak_dlouho_kouri: {
        columnName: 'jak_dlouho_kouri',
        columnType: 'INTEGER',
    },
    pocet_balickoroku: {
        columnName: 'pocet_balickoroku',
        columnType: 'REAL',
    },
    abusus_alkoholu: {
        columnName: 'abusus_alkoholu',
        columnType: 'TEXT',
    },
    rok_diagnozy: {
        columnName: 'rok_diagnozy',
        columnType: 'TEXT',
    },
    diagnoza_mkn_10: {
        columnName: 'diagnoza_mkn_10',
        columnType: 'TEXT',
    },
    strana_nalezu: {
        columnName: 'strana_nalezu',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_predoperacne: {
        columnName: 'funkce_n_vii_dle_h_b_predoperacne',
        columnType: 'TEXT',
    },
    diagnosticke_metody: {
        columnName: 'diagnosticke_metody',
        columnType: 'TEXT',
    },
    fnab: {
        columnName: 'fnab',
        columnType: 'TEXT',
    },
    vysledek_fnab: {
        columnName: 'vysledek_fnab',
        columnType: 'TEXT',
    },
    core_biopsie: {
        columnName: 'core_biopsie',
        columnType: 'TEXT',
    },
    core_vysledek: {
        columnName: 'core_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_core: {
        columnName: 'mukoepidermoidni_karcinom_core',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_core: {
        columnName: 'adenoidne_cysticky_karcinom_core',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_core: {
        columnName: 'polymorfni_adenokarcinom_core',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_core: {
        columnName: 'intraduktalni_karcinom_core',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_core: {
        columnName: 'salivarni_karcinom_nos_core',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_core: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_core',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_core: {
        columnName: 'spatne_diferencovany_karcinom_core',
        columnType: 'TEXT',
    },
    otevrena_biopsie: {
        columnName: 'otevrena_biopsie',
        columnType: 'TEXT',
    },
    otevrena_vysledek: {
        columnName: 'otevrena_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_otevrena: {
        columnName: 'mukoepidermoidni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_otevrena: {
        columnName: 'adenoidne_cysticky_karcinom_otevrena',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_otevrena: {
        columnName: 'polymorfni_adenokarcinom_otevrena',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_otevrena: {
        columnName: 'intraduktalni_karcinom_otevrena',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_otevrena: {
        columnName: 'salivarni_karcinom_nos_otevrena',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_otevrena: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_otevrena',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_otevrena: {
        columnName: 'spatne_diferencovany_karcinom_otevrena',
        columnType: 'TEXT',
    },
    datum_zahajeni_lecby: {
        columnName: 'datum_zahajeni_lecby',
        columnType: 'TEXT',
    },
    typ_terapie: {
        columnName: 'typ_terapie',
        columnType: 'TEXT',
    },
    rozsah_chirurgicke_lecby: {
        columnName: 'rozsah_chirurgicke_lecby',
        columnType: 'TEXT',
    },
    blokova_krcni_disekce: {
        columnName: 'blokova_krcni_disekce',
        columnType: 'TEXT',
    },
    strana_blokove_krcni_disekce: {
        columnName: 'strana_blokove_krcni_disekce',
        columnType: 'TEXT',
    },
    typ_nd: {
        columnName: 'typ_nd',
        columnType: 'TEXT',
    },
    rozsah_nd: {
        columnName: 'rozsah_nd',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_pooperacne: {
        columnName: 'funkce_n_vii_dle_h_b_pooperacne',
        columnType: 'TEXT',
    },
    pooperacni_komplikace: {
        columnName: 'pooperacni_komplikace',
        columnType: 'TEXT',
    },
    jine_pooperacni_komplikace: {
        columnName: 'jine_pooperacni_komplikace',
        columnType: 'TEXT',
    },
    adjuvantni_terapie: {
        columnName: 'adjuvantni_terapie',
        columnType: 'TEXT',
    },
    typ_nechirurgicke_terapie: {
        columnName: 'typ_nechirurgicke_terapie',
        columnType: 'TEXT',
    },
    histopatologie_vysledek: {
        columnName: 'histopatologie_vysledek',
        columnType: 'TEXT',
    },
    mukoepidermoidni_karcinom_histopatologie: {
        columnName: 'mukoepidermoidni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    adenoidne_cysticky_karcinom_histopatologie: {
        columnName: 'adenoidne_cysticky_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    polymorfni_adenokarcinom_histopatologie: {
        columnName: 'polymorfni_adenokarcinom_histopatologie',
        columnType: 'TEXT',
    },
    intraduktalni_karcinom_histopatologie: {
        columnName: 'intraduktalni_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    salivarni_karcinom_nos_histopatologie: {
        columnName: 'salivarni_karcinom_nos_histopatologie',
        columnType: 'TEXT',
    },
    karcinom_z_pleomorfniho_adenomu_histopatologie: {
        columnName: 'karcinom_z_pleomorfniho_adenomu_histopatologie',
        columnType: 'TEXT',
    },
    spatne_diferencovany_karcinom_histopatologie: {
        columnName: 'spatne_diferencovany_karcinom_histopatologie',
        columnType: 'TEXT',
    },
    velikost_nadoru_histopatologie: {
        columnName: 'velikost_nadoru_histopatologie',
        columnType: 'INTEGER',
    },
    velikost_nadoru_neurcena_histopatologie: {
        columnName: 'velikost_nadoru_neurcena_histopatologie',
        columnType: 'TEXT',
    },
    okraj_resekce_histopatologie: {
        columnName: 'okraj_resekce_histopatologie',
        columnType: 'TEXT',
    },
    lymfovaskularni_invaze_histopatologie: {
        columnName: 'lymfovaskularni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    perineuralni_invaze_histopatologie: {
        columnName: 'perineuralni_invaze_histopatologie',
        columnType: 'TEXT',
    },
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie: {
        columnName: 'pocet_lymfatickych_uzlin_s_metastazou_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_histopatologie: {
        columnName: 'extranodalni_sireni_histopatologie',
        columnType: 'TEXT',
    },
    extranodalni_sireni_vysledek_histopatologie: {
        columnName: 'extranodalni_sireni_vysledek_histopatologie',
        columnType: 'TEXT',
    },
    prokazane_vzdalene_metastazy_histopatologie: {
        columnName: 'prokazane_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    misto_vyskytu_vzdalene_metastazy_histopatologie: {
        columnName: 'misto_vyskytu_vzdalene_metastazy_histopatologie',
        columnType: 'TEXT',
    },
    t_klasifikace_klinicka: {
        columnName: 't_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    n_klasifikace_klinicka: {
        columnName: 'n_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    m_klasifikace_klinicka: {
        columnName: 'm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_klinicka: {
        columnName: 'tnm_klasifikace_klinicka',
        columnType: 'TEXT',
    },
    t_klasifikace_patologicka: {
        columnName: 't_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    n_klasifikace_patologicka: {
        columnName: 'n_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    m_klasifikace_patologicka: {
        columnName: 'm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    tnm_klasifikace_patologicka: {
        columnName: 'tnm_klasifikace_patologicka',
        columnType: 'TEXT',
    },
    datum_prvni_kontroly_po_lecbe: {
        columnName: 'datum_prvni_kontroly_po_lecbe',
        columnType: 'TEXT',
    },
    perzistence: {
        columnName: 'perzistence',
        columnType: 'TEXT',
    },
    datum_prokazani_perzistence: {
        columnName: 'datum_prokazani_perzistence',
        columnType: 'TEXT',
    },
    recidiva: {
        columnName: 'recidiva',
        columnType: 'TEXT',
    },
    datum_prokazani_recidivy: {
        columnName: 'datum_prokazani_recidivy',
        columnType: 'TEXT',
    },
    stav: {
        columnName: 'stav',
        columnType: 'TEXT',
    },
    datum_umrti: {
        columnName: 'datum_umrti',
        columnType: 'TEXT',
    },
    posledni_kontrola: {
        columnName: 'posledni_kontrola',
        columnType: 'TEXT',
    },
    planovana_kontrola: {
        columnName: 'planovana_kontrola',
        columnType: 'TEXT',
    },
    attachments: {
        columnName: 'attachments',
        columnType: 'TEXT',
    },
    poznamky: {
        columnName: 'poznamky',
        columnType: 'TEXT',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const submandibularBenignColumns: SubmandibularBenignColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    form_type: {
        columnName: 'form_type',
        columnType: 'INTEGER',
    },
    jmeno: {
        columnName: 'jmeno',
        columnType: 'TEXT',
    },
    prijmeni: {
        columnName: 'prijmeni',
        columnType: 'TEXT',
    },
    id_pacient: {
        columnName: 'id_pacient',
        columnType: 'TEXT',
    },
    rodne_cislo: {
        columnName: 'rodne_cislo',
        columnType: 'TEXT',
    },
    vek_pri_diagnoze: {
        columnName: 'vek_pri_diagnoze',
        columnType: 'INTEGER',
    },
    pohlavi: {
        columnName: 'pohlavi',
        columnType: 'TEXT',
    },
    kraj: {
        columnName: 'kraj',
        columnType: 'TEXT',
    },
    jine_nadorove_onemocneni_v_oa: {
        columnName: 'jine_nadorove_onemocneni_v_oa',
        columnType: 'TEXT',
    },
    specifikace_mista_vyskytu_jineho_karcinomu: {
        columnName: 'specifikace_mista_vyskytu_jineho_karcinomu',
        columnType: 'TEXT',
    },
    jine_onemocneni_velkych_slinnych_zlaz_v_oa: {
        columnName: 'jine_onemocneni_velkych_slinnych_zlaz_v_oa',
        columnType: 'TEXT',
    },
    specifikace_onemocneni: {
        columnName: 'specifikace_onemocneni',
        columnType: 'TEXT',
    },
    koureni: {
        columnName: 'koureni',
        columnType: 'TEXT',
    },
    pocet_cigaret_denne: {
        columnName: 'pocet_cigaret_denne',
        columnType: 'INTEGER',
    },
    jak_dlouho_kouri: {
        columnName: 'jak_dlouho_kouri',
        columnType: 'INTEGER',
    },
    pocet_balickoroku: {
        columnName: 'pocet_balickoroku',
        columnType: 'REAL',
    },
    abusus_alkoholu: {
        columnName: 'abusus_alkoholu',
        columnType: 'TEXT',
    },
    rok_diagnozy: {
        columnName: 'rok_diagnozy',
        columnType: 'TEXT',
    },
    strana_nalezu: {
        columnName: 'strana_nalezu',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_predoperacne: {
        columnName: 'funkce_n_vii_dle_h_b_predoperacne',
        columnType: 'TEXT',
    },
    diagnosticke_metody: {
        columnName: 'diagnosticke_metody',
        columnType: 'TEXT',
    },
    fnab: {
        columnName: 'fnab',
        columnType: 'TEXT',
    },
    vysledek_fnab: {
        columnName: 'vysledek_fnab',
        columnType: 'TEXT',
    },
    core_biopsie: {
        columnName: 'core_biopsie',
        columnType: 'TEXT',
    },
    core_vysledek: {
        columnName: 'core_vysledek',
        columnType: 'TEXT',
    },
    otevrena_biopsie: {
        columnName: 'otevrena_biopsie',
        columnType: 'TEXT',
    },
    otevrena_vysledek: {
        columnName: 'otevrena_vysledek',
        columnType: 'TEXT',
    },
    datum_zahajeni_lecby: {
        columnName: 'datum_zahajeni_lecby',
        columnType: 'TEXT',
    },
    typ_terapie: {
        columnName: 'typ_terapie',
        columnType: 'TEXT',
    },
    rozsah_chirurgicke_lecby: {
        columnName: 'rozsah_chirurgicke_lecby',
        columnType: 'TEXT',
    },
    funkce_n_vii_dle_h_b_pooperacne: {
        columnName: 'funkce_n_vii_dle_h_b_pooperacne',
        columnType: 'TEXT',
    },
    pooperacni_komplikace: {
        columnName: 'pooperacni_komplikace',
        columnType: 'TEXT',
    },
    jine_pooperacni_komplikace: {
        columnName: 'jine_pooperacni_komplikace',
        columnType: 'TEXT',
    },
    histopatologie_vysledek: {
        columnName: 'histopatologie_vysledek',
        columnType: 'TEXT',
    },
    histopatologie_vysledek_jine: {
        columnName: 'histopatologie_vysledek_jine',
        columnType: 'TEXT',
    },
    velikost_nadoru_histopatologie: {
        columnName: 'velikost_nadoru_histopatologie',
        columnType: 'INTEGER',
    },
    okraj_resekce_histopatologie: {
        columnName: 'okraj_resekce_histopatologie',
        columnType: 'TEXT',
    },
    datum_prvni_kontroly_po_lecbe: {
        columnName: 'datum_prvni_kontroly_po_lecbe',
        columnType: 'TEXT',
    },
    doporuceno_dalsi_sledovani: {
        columnName: 'doporuceno_dalsi_sledovani',
        columnType: 'TEXT',
    },
    perzistence: {
        columnName: 'perzistence',
        columnType: 'TEXT',
    },
    datum_prokazani_perzistence: {
        columnName: 'datum_prokazani_perzistence',
        columnType: 'TEXT',
    },
    recidiva: {
        columnName: 'recidiva',
        columnType: 'TEXT',
    },
    datum_prokazani_recidivy: {
        columnName: 'datum_prokazani_recidivy',
        columnType: 'TEXT',
    },
    stav: {
        columnName: 'stav',
        columnType: 'TEXT',
    },
    datum_umrti: {
        columnName: 'datum_umrti',
        columnType: 'TEXT',
    },
    posledni_kontrola: {
        columnName: 'posledni_kontrola',
        columnType: 'TEXT',
    },
    planovana_kontrola: {
        columnName: 'planovana_kontrola',
        columnType: 'TEXT',
    },
    attachments: {
        columnName: 'attachments',
        columnType: 'TEXT',
    },
    poznamky: {
        columnName: 'poznamky',
        columnType: 'TEXT',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const paroditBenignColumns: ParotidBenignColumns =
    submandibularBenignColumns

export const studieColumns: StudieColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    nazev_studie: {
        columnName: 'nazev_studie',
        columnType: 'TEXT',
    },
    typ_studie: {
        columnName: 'typ_studie',
        columnType: 'INTEGER',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const jeVeStudiiColumns: JeVeStudiiColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER',
    },
    id_studie: {
        columnName: 'id_studie',
        columnType: 'INTEGER',
    },
    id_pacient_db: {
        columnName: 'id_pacient_db',
        columnType: 'INTEGER',
    },
    typ_pacienta: {
        columnName: 'typ_pacienta',
        columnType: 'INTEGER',
    },
    FOREIGN_KEY: {
        columnName: 'FOREIGN KEY',
        columnType: '(id_studie) REFERENCES studie(id_studie)',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export const passwordColumns: PasswordColumns = {
    id: {
        columnName: 'id',
        columnType: 'INTEGER UNIQUE',
    },
    password: {
        columnName: 'password',
        columnType: 'TEXT',
    },
    using_encryption: {
        columnName: 'using_encryption',
        columnType: 'INTEGER',
    },
    PRIMARY_KEY: {
        columnName: 'PRIMARY KEY',
        columnType: '(id AUTOINCREMENT)',
    },
}

export enum FormType {
    podcelistni = 1,
    podjazykove = 2,
    priusni = 3,
    submandibularBenign = 4,
    parotidBenign = 5,
}

export const formTypeToTableName: { [key: number]: TableNames } = {
    1: TableNames.podcelistni,
    2: TableNames.podjazykove,
    3: TableNames.priusni,
    4: TableNames.submandibularBenign,
    5: TableNames.parotidBenign,
}

export enum StudyType {
    podcelistni = 1,
    podjazykove = 2,
    priusni = 3,
    specialni = 4,
}
