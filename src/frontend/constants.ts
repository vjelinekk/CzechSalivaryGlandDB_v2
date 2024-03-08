export enum components {
    patientsList = 'patients-list',
    addPatient = 'add-patient',
    studiesList = 'studies-list',
    addStudy = 'add-study',
    parotidGlandForm = 'parotid-gland-form',
    sublingualGlandForm = 'sublingual-gland-form',
    submandibularGlandForm = 'submandibular-gland-form',
}

export enum formStates {
    add = 'add',
    edit = 'edit',
    view = 'view',
}

export enum dbLabels {
    jmeno = 'jmeno',
    prijmeni = 'prijmeni',
    id_pacient = 'id_pacient',
    rodne_cislo = 'rodne_cislo',
    vek_pri_diagnoze = 'vek_pri_diagnoze',
    pohlavi = 'pohlavi',
    kraj = 'kraj',
    jine_nadorove_onemocneni_v_oa = 'jine_nadorove_onemocneni_v_oa',
    specifikace_mista_vyskytu_jineho_karcinomu = 'specifikace_mista_vyskytu_jineho_karcinomu',
    jine_onemocneni_velkych_slinnych_zlaz_v_oa = 'jine_onemocneni_velkych_slinnych_zlaz_v_oa',
    specifikace_onemocneni = 'specifikace_onemocneni',
    koureni = 'koureni',
    pocet_cigaret_denne = 'pocet_cigaret_denne',
    jak_dlouho_kouri = 'jak_dlouho_kouri',
    pocet_balickoroku = 'pocet_balickoroku',
    abusus_alkoholu = 'abusus_alkoholu',
    rok_diagnozy = 'rok_diagnozy',
    diagnoza_mkn_10 = 'diagnoza_mkn_10',
    strana_nalezu = 'strana_nalezu',
    funkce_n_vii_dle_h_b_predoperacne = 'funkce_n_vii_dle_h_b_predoperacne',
    diagnosticke_metody = 'diagnosticke_metody',
    fnab = 'fnab',
    vysledek_fnab = 'vysledek_fnab',
    core_biopsie = 'core_biopsie',
    core_vysledek = 'core_vysledek',
    mukoepidermoidni_karcinom_core = 'mukoepidermoidni_karcinom_core',
    adenoidne_cysticky_karcinom_core = 'adenoidne_cysticky_karcinom_core',
    polymorfni_adenokarcinom_core = 'polymorfni_adenokarcinom_core',
    intraduktalni_karcinom_core = 'intraduktalni_karcinom_core',
    salivarni_karcinom_nos_core = 'salivarni_karcinom_nos_core',
    karcinom_z_pleomorfniho_adenomu_core = 'karcinom_z_pleomorfniho_adenomu_core',
    spatne_diferencovany_karcinom_core = 'spatne_diferencovany_karcinom_core',
    otevrena_biopsie = 'otevrena_biopsie',
    otevrena_vysledek = 'otevrena_vysledek',
    mukoepidermoidni_karcinom_otevrena = 'mukoepidermoidni_karcinom_otevrena',
    adenoidne_cysticky_karcinom_otevrena = 'adenoidne_cysticky_karcinom_otevrena',
    polymorfni_adenokarcinom_otevrena = 'polymorfni_adenokarcinom_otevrena',
    intraduktalni_karcinom_otevrena = 'intraduktalni_karcinom_otevrena',
    salivarni_karcinom_nos_otevrena = 'salivarni_karcinom_nos_otevrena',
    karcinom_z_pleomorfniho_adenomu_otevrena = 'karcinom_z_pleomorfniho_adenomu_otevrena',
    spatne_diferencovany_karcinom_otevrena = 'spatne_diferencovany_karcinom_otevrena',
    datum_zahajeni_lecby = 'datum_zahajeni_lecby',
    typ_terapie = 'typ_terapie',
    rozsah_chirurgicke_lecby = 'rozsah_chirurgicke_lecby',
    blokova_krcni_disekce = 'blokova_krcni_disekce',
    strana_blokove_krcni_disekce = 'strana_blokove_krcni_disekce',
    typ_nd = 'typ_nd',
    rozsah_nd = 'rozsah_nd',
    funkce_n_vii_dle_h_b_pooperacne = 'funkce_n_vii_dle_h_b_pooperacne',
    pooperacni_komplikace = 'pooperacni_komplikace',
    jine_pooperacni_komplikace = 'jine_pooperacni_komplikace',
    adjuvantni_terapie = 'adjuvantni_terapie',
    typ_nechirurgicke_terapie = 'typ_nechirurgicke_terapie',
    histopatologie_vysledek = 'histopatologie_vysledek',
    mukoepidermoidni_karcinom_histopatologie = 'mukoepidermoidni_karcinom_histopatologie',
    adenoidne_cysticky_karcinom_histopatologie = 'adenoidne_cysticky_karcinom_histopatologie',
    polymorfni_adenokarcinom_histopatologie = 'polymorfni_adenokarcinom_histopatologie',
    intraduktalni_karcinom_histopatologie = 'intraduktalni_karcinom_histopatologie',
    salivarni_karcinom_nos_histopatologie = 'salivarni_karcinom_nos_histopatologie',
    karcinom_z_pleomorfniho_adenomu_histopatologie = 'karcinom_z_pleomorfniho_adenomu_histopatologie',
    spatne_diferencovany_karcinom_histopatologie = 'spatne_diferencovany_karcinom_histopatologie',
    velikost_nadoru_histopatologie = 'velikost_nadoru_histopatologie',
    velikost_nadoru_neurcena_histopatologie = 'velikost_nadoru_neurcena_histopatologie',
    okraj_resekce_histopatologie = 'okraj_resekce_histopatologie',
    lymfovaskularni_invaze_histopatologie = 'lymfovaskularni_invaze_histopatologie',
    perineuralni_invaze_histopatologie = 'perineuralni_invaze_histopatologie',
    pocet_lymfatickych_uzlin_s_metastazou_histopatologie = 'pocet_lymfatickych_uzlin_s_metastazou_histopatologie',
    extranodalni_sireni_histopatologie = 'extranodalni_sireni_histopatologie',
    extranodalni_sireni_vysledek_histopatologie = 'extranodalni_sireni_vysledek_histopatologie',
    prokazane_vzdalene_metastazy_histopatologie = 'prokazane_vzdalene_metastazy_histopatologie',
    misto_vyskytu_vzdalene_metastazy_histopatologie = 'misto_vyskytu_vzdalene_metastazy_histopatologie',
    t_klasifikace_klinicka = 't_klasifikace_klinicka',
    n_klasifikace_klinicka = 'n_klasifikace_klinicka',
    m_klasifikace_klinicka = 'm_klasifikace_klinicka',
    tnm_klasifikace_klinicka = 'tnm_klasifikace_klinicka',
    t_klasifikace_patologicka = 't_klasifikace_patologicka',
    n_klasifikace_patologicka = 'n_klasifikace_patologicka',
    m_klasifikace_patologicka = 'm_klasifikace_patologicka',
    tnm_klasifikace_patologicka = 'tnm_klasifikace_patologicka',
    datum_prvni_kontroly_po_lecbe = 'datum_prvni_kontroly_po_lecbe',
    perzistence = 'perzistence',
    datum_prokazani_perzistence = 'datum_prokazani_perzistence',
    recidiva = 'recidiva',
    datum_prokazani_recidivy = 'datum_prokazani_recidivy',
    stav = 'stav',
    datum_umrti = 'datum_umrti',
    posledni_kontrola = 'posledni_kontrola',
    planovana_kontrola = 'planovana_kontrola',
    poznamky = 'poznamky',
}

export enum TNMClassificationResult {
    stageI = 'Stage I',
    stageII = 'Stage II',
    stageIII = 'Stage III',
    stageIVA = 'Stage IVA',
    stageIVB = 'Stage IVB',
    stageIVC = 'Stage IVC',
}

export enum FormType {
    podcelistni = 1,
    podjazykove = 2,
    priusni = 3,
}
