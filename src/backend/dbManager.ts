import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite')

db.serialize(() => {
    db.run(
        'CREATE TABLE IF NOT EXISTS form_podcelistni ( id_podcelistni INTEGER UNIQUE, form_type INTEGER, jmeno TEXT, prijmeni TEXT, id_pacient TEXT, rodne_cislo TEXT, vek_pri_diagnoze INTEGER, pohlavi TEXT, kraj TEXT, jine_nadorove_onemocneni_v_oa TEXT, specifikace_mista_vyskytu_jineho_karcinomu TEXT, jine_onemocneni_velkych_slinnych_zlaz_v_oa TEXT, specifikace_onemocneni TEXT, koureni TEXT, pocet_cigaret_denne INTEGER, jak_dlouho_kouri INTEGER, pocet_balickoroku REAL, abusus_alkoholu TEXT, rok_diagnozy TEXT, diagnoza_mkn_10 TEXT, strana_nalezu TEXT, funkce_n_vii_dle_h_b_predoperacne TEXT, diagnosticke_metody TEXT, fnab TEXT, vysledek_fnab TEXT, core_biopsie TEXT, core_vysledek TEXT, mukoepidermoidni_karcinom_core TEXT, adenoidne_cysticky_karcinom_core TEXT, polymorfni_adenokarcinom_core TEXT, intraduktalni_karcinom_core TEXT, salivarni_karcinom_nos_core TEXT, karcinom_z_pleomorfniho_adenomu_core TEXT, spatne_diferencovany_karcinom_core TEXT, otevrena_biopsie TEXT, otevrena_vysledek TEXT, mukoepidermoidni_karcinom_otevrena TEXT, adenoidne_cysticky_karcinom_otevrena TEXT, polymorfni_adenokarcinom_otevrena TEXT, intraduktalni_karcinom_otevrena TEXT, salivarni_karcinom_nos_otevrena TEXT, karcinom_z_pleomorfniho_adenomu_otevrena TEXT, spatne_diferencovany_karcinom_otevrena TEXT, datum_zahajeni_lecby TEXT, typ_terapie TEXT, rozsah_chirurgicke_lecby TEXT, blokova_krcni_disekce TEXT, strana_blokove_krcni_disekce TEXT, typ_nd TEXT, rozsah_nd TEXT, funkce_n_vii_dle_h_b_pooperacne TEXT, adjuvantni_terapie TEXT, typ_nechirurgicke_terapie TEXT, histopatologie_vysledek TEXT, mukoepidermoidni_karcinom_histopatologie TEXT, adenoidne_cysticky_karcinom_histopatologie TEXT, polymorfni_adenokarcinom_histopatologie TEXT, intraduktalni_karcinom_histopatologie TEXT, salivarni_karcinom_nos_histopatologie TEXT, karcinom_z_pleomorfniho_adenomu_histopatologie TEXT, spatne_diferencovany_karcinom_histopatologie TEXT, velikost_nadoru_histopatologie INTEGER, velikost_nadoru_neurcena_histopatologie TEXT, okraj_resekce_histopatologie TEXT, lymfovaskularni_invaze_histopatologie TEXT, perineuralni_invaze_histopatologie TEXT, pocet_lymfatickych_uzlin_s_metastazou_histopatologie TEXT, extranodalni_sireni_histopatologie TEXT, extranodalni_sireni_vysledek_histopatologie TEXT, prokazane_vzdalene_metastazy_histopatologie TEXT, misto_vyskytu_vzdalene_metastazy_histopatologie TEXT,t_klasifikace_klinicka TEXT, n_klasifikace_klinicka TEXT, m_klasifikace_klinicka TEXT, tnm_klasifikace_klinicka TEXT, t_klasifikace_patologicka TEXT, n_klasifikace_patologicka TEXT, m_klasifikace_patologicka TEXT, tnm_klasifikace_patologicka TEXT, datum_prvni_kontroly_po_lecbe TEXT, perzistence TEXT, datum_prokazani_perzistence TEXT, recidiva TEXT, datum_prokazani_recidivy TEXT, stav TEXT, datum_umrti TEXT, posledni_kontrola TEXT, planovana_kontrola TEXT, attachments TEXT, poznamky TEXT, PRIMARY KEY(id_podcelistni AUTOINCREMENT))'
    )
    db.run(
        'CREATE TABLE IF NOT EXISTS form_podjazykove ( id_podjazykove INTEGER UNIQUE, form_type INTEGER, jmeno TEXT, prijmeni TEXT, id_pacient TEXT, rodne_cislo TEXT, vek_pri_diagnoze INTEGER, pohlavi TEXT, kraj TEXT, jine_nadorove_onemocneni_v_oa TEXT, specifikace_mista_vyskytu_jineho_karcinomu TEXT, jine_onemocneni_velkych_slinnych_zlaz_v_oa TEXT, specifikace_onemocneni TEXT, koureni TEXT, pocet_cigaret_denne INTEGER, jak_dlouho_kouri INTEGER, pocet_balickoroku REAL, abusus_alkoholu TEXT, rok_diagnozy TEXT, diagnoza_mkn_10 TEXT, strana_nalezu TEXT, diagnosticke_metody TEXT, fnab TEXT, vysledek_fnab TEXT, core_biopsie TEXT, core_vysledek TEXT, mukoepidermoidni_karcinom_core TEXT, adenoidne_cysticky_karcinom_core TEXT, polymorfni_adenokarcinom_core TEXT, intraduktalni_karcinom_core TEXT, salivarni_karcinom_nos_core TEXT, karcinom_z_pleomorfniho_adenomu_core TEXT, spatne_diferencovany_karcinom_core TEXT, otevrena_biopsie TEXT, otevrena_vysledek TEXT, mukoepidermoidni_karcinom_otevrena TEXT, adenoidne_cysticky_karcinom_otevrena TEXT, polymorfni_adenokarcinom_otevrena TEXT, intraduktalni_karcinom_otevrena TEXT, salivarni_karcinom_nos_otevrena TEXT, karcinom_z_pleomorfniho_adenomu_otevrena TEXT, spatne_diferencovany_karcinom_otevrena TEXT, datum_zahajeni_lecby TEXT, typ_terapie TEXT, rozsah_chirurgicke_lecby TEXT, blokova_krcni_disekce TEXT, strana_blokove_krcni_disekce TEXT, typ_nd TEXT, rozsah_nd TEXT, adjuvantni_terapie TEXT, typ_nechirurgicke_terapie TEXT, histopatologie_vysledek TEXT, mukoepidermoidni_karcinom_histopatologie TEXT, adenoidne_cysticky_karcinom_histopatologie TEXT, polymorfni_adenokarcinom_histopatologie TEXT, intraduktalni_karcinom_histopatologie TEXT, salivarni_karcinom_nos_histopatologie TEXT, karcinom_z_pleomorfniho_adenomu_histopatologie TEXT, spatne_diferencovany_karcinom_histopatologie TEXT, velikost_nadoru_histopatologie INTEGER, velikost_nadoru_neurcena_histopatologie TEXT, okraj_resekce_histopatologie TEXT, lymfovaskularni_invaze_histopatologie TEXT, perineuralni_invaze_histopatologie TEXT, pocet_lymfatickych_uzlin_s_metastazou_histopatologie TEXT, extranodalni_sireni_histopatologie TEXT, extranodalni_sireni_vysledek_histopatologie TEXT, prokazane_vzdalene_metastazy_histopatologie TEXT, misto_vyskytu_vzdalene_metastazy_histopatologie TEXT, t_klasifikace_klinicka TEXT, n_klasifikace_klinicka TEXT, m_klasifikace_klinicka TEXT, tnm_klasifikace_klinicka TEXT, t_klasifikace_patologicka TEXT, n_klasifikace_patologicka TEXT, m_klasifikace_patologicka TEXT, tnm_klasifikace_patologicka TEXT, datum_prvni_kontroly_po_lecbe TEXT, perzistence TEXT, datum_prokazani_perzistence TEXT, recidiva TEXT, datum_prokazani_recidivy TEXT, stav TEXT, datum_umrti TEXT, posledni_kontrola TEXT, planovana_kontrola TEXT, attachments TEXT, poznamky TEXT, PRIMARY KEY(id_podjazykove AUTOINCREMENT))'
    )
    db.run(
        'CREATE TABLE IF NOT EXISTS form_priusni ( id_priusni INTEGER UNIQUE, form_type INTEGER, jmeno TEXT, prijmeni TEXT, id_pacient TEXT, rodne_cislo TEXT, vek_pri_diagnoze INTEGER, pohlavi TEXT, kraj TEXT, jine_nadorove_onemocneni_v_oa TEXT, specifikace_mista_vyskytu_jineho_karcinomu TEXT, jine_onemocneni_velkych_slinnych_zlaz_v_oa TEXT, specifikace_onemocneni TEXT, koureni TEXT, pocet_cigaret_denne INTEGER, jak_dlouho_kouri INTEGER, pocet_balickoroku REAL, abusus_alkoholu TEXT, rok_diagnozy TEXT, diagnoza_mkn_10 TEXT, strana_nalezu TEXT, funkce_n_vii_dle_h_b_predoperacne TEXT, diagnosticke_metody TEXT, fnab TEXT, vysledek_fnab TEXT, core_biopsie TEXT, core_vysledek TEXT, mukoepidermoidni_karcinom_core TEXT, adenoidne_cysticky_karcinom_core TEXT, polymorfni_adenokarcinom_core TEXT, intraduktalni_karcinom_core TEXT, salivarni_karcinom_nos_core TEXT, karcinom_z_pleomorfniho_adenomu_core TEXT, spatne_diferencovany_karcinom_core TEXT, otevrena_biopsie TEXT, otevrena_vysledek TEXT, mukoepidermoidni_karcinom_otevrena TEXT, adenoidne_cysticky_karcinom_otevrena TEXT, polymorfni_adenokarcinom_otevrena TEXT, intraduktalni_karcinom_otevrena TEXT, salivarni_karcinom_nos_otevrena TEXT, karcinom_z_pleomorfniho_adenomu_otevrena TEXT, spatne_diferencovany_karcinom_otevrena TEXT, datum_zahajeni_lecby TEXT, typ_terapie TEXT, rozsah_chirurgicke_lecby TEXT, blokova_krcni_disekce TEXT, strana_blokove_krcni_disekce TEXT, typ_nd TEXT, rozsah_nd TEXT, funkce_n_vii_dle_h_b_pooperacne TEXT, pooperacni_komplikace TEXT, jine_pooperacni_komplikace TEXT, adjuvantni_terapie TEXT, typ_nechirurgicke_terapie TEXT, histopatologie_vysledek TEXT, mukoepidermoidni_karcinom_histopatologie TEXT, adenoidne_cysticky_karcinom_histopatologie TEXT, polymorfni_adenokarcinom_histopatologie TEXT, intraduktalni_karcinom_histopatologie TEXT, salivarni_karcinom_nos_histopatologie TEXT, karcinom_z_pleomorfniho_adenomu_histopatologie TEXT, spatne_diferencovany_karcinom_histopatologie TEXT, velikost_nadoru_histopatologie INTEGER, velikost_nadoru_neurcena_histopatologie TEXT, okraj_resekce_histopatologie TEXT, lymfovaskularni_invaze_histopatologie TEXT, perineuralni_invaze_histopatologie TEXT, pocet_lymfatickych_uzlin_s_metastazou_histopatologie TEXT, extranodalni_sireni_histopatologie TEXT, extranodalni_sireni_vysledek_histopatologie TEXT, prokazane_vzdalene_metastazy_histopatologie TEXT, misto_vyskytu_vzdalene_metastazy_histopatologie TEXT,t_klasifikace_klinicka TEXT, n_klasifikace_klinicka TEXT, m_klasifikace_klinicka TEXT, tnm_klasifikace_klinicka TEXT, t_klasifikace_patologicka TEXT, n_klasifikace_patologicka TEXT, m_klasifikace_patologicka TEXT, tnm_klasifikace_patologicka TEXT, datum_prvni_kontroly_po_lecbe TEXT, perzistence TEXT, datum_prokazani_perzistence TEXT, recidiva TEXT, datum_prokazani_recidivy TEXT, stav TEXT, datum_umrti TEXT,posledni_kontrola TEXT, planovana_kontrola TEXT, attachments TEXT, poznamky TEXT, PRIMARY KEY(id_priusni AUTOINCREMENT))'
    )
    db.run(
        'CREATE TABLE IF NOT EXISTS studie (id_studie INTEGER, nazev_studie	TEXT, typ_studie INTEGER, PRIMARY KEY(id_studie AUTOINCREMENT))'
    )
    db.run(
        'CREATE TABLE IF NOT EXISTS je_ve_studii (id_je_ve_studii INTEGER, id_studie INTEGER, id_pacient_db INTEGER, typ_pacienta INTEGER, FOREIGN KEY(id_studie) REFERENCES studie(id_studie), PRIMARY KEY(id_je_ve_studii AUTOINCREMENT))'
    )
})

db.run('INSERT INTO form_priusni (jmeno) VALUES (?)', ['Petr'], function (err) {
    if (err) {
        return console.error(err.message)
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`)
})

db.get('SELECT * FROM form_priusni', (err, row) => {
    if (err) {
        console.error(err.message)
    }
    console.log(row)
})

export default db
