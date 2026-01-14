import sqlite3 from 'sqlite3'
import {
    isInStudyColumns,
    parotidBenignColumns,
    passwordColumns,
    submandibularMalignantColumns,
    sublingualMalignantColumns,
    parotidMalignantColumns,
    studyColumns,
    submandibularBenignColumns,
    TableNames,
} from './constants'
import {
    IsInStudyColumns,
    ParotidBenignColumns,
    PasswordColumns,
    SubmandibularMalignantColumns,
    SublingualMalignantColumns,
    ParotidMalignantColumns,
    StudyColumns,
    SubmandibularBenignColumns,
} from './types'
import { columnToSQL } from './utils'
import path from 'path'
import { app } from 'electron'

// TODO: Migrate to the new schema and remove old tables after migration period

const getDBPath = (filename: string): string => {
    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
    }
    return path.resolve(base, `${filename}.sqlite`)
}

const db = new sqlite3.Database(getDBPath('db'))

const createTable = (
    tableName: TableNames,
    columns:
        | SubmandibularMalignantColumns
        | SublingualMalignantColumns
        | ParotidMalignantColumns
        | SubmandibularBenignColumns
        | ParotidBenignColumns
        | IsInStudyColumns
        | StudyColumns
        | PasswordColumns
) => {
    const columnDefinitions = Object.values(columns).map(
        ({ columnName, columnType }) => columnToSQL(columnName, columnType)
    )

    db.run(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions.join(', ')})`
    )
}

export const createTables = () => {
    db.serialize(() => {
        createTable(
            TableNames.submandibularMalignant,
            submandibularMalignantColumns
        )
        createTable(TableNames.sublingualMalignant, sublingualMalignantColumns)
        createTable(TableNames.parotidMalignant, parotidMalignantColumns)
        createTable(TableNames.submandibularBenign, submandibularBenignColumns)
        createTable(TableNames.parotidBenign, parotidBenignColumns)
        createTable(TableNames.studies, studyColumns)
        createTable(TableNames.isInStudy, isInStudyColumns)
        createTable(TableNames.password, passwordColumns)
    })
}

// --- NEW ERA MODEL SCHEMA ---
const newSchemaQueries = [
    // 1. Independent Lookups & Config
    `CREATE TABLE IF NOT EXISTS password (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        password TEXT,
        encryption_enabled INTEGER -- boolean
    )`,
    `CREATE TABLE IF NOT EXISTS study (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        study_name TEXT NOT NULL,
        study_type INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS tnm_edition (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        active_from TEXT,
        is_active INTEGER -- boolean
    )`,
    `CREATE TABLE IF NOT EXISTS histology_type (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tumor_type TEXT NOT NULL,
        translation_key TEXT UNIQUE
    )`,

    // 2. Dependent Lookups
    `CREATE TABLE IF NOT EXISTS tnm_value_definition (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        edition_id INTEGER NOT NULL,
        category TEXT, -- 'T', 'N', 'M', 'G'
        code TEXT,
        description TEXT,
        sort_order INTEGER,
        FOREIGN KEY (edition_id) REFERENCES tnm_edition(id)
    )`,
    `CREATE TABLE IF NOT EXISTS histology_subtype (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_histology_type INTEGER NOT NULL,
        translation_key TEXT UNIQUE,
        FOREIGN KEY (id_histology_type) REFERENCES histology_type(id)
    )`,

    // 3. Base Patient Table
    `CREATE TABLE IF NOT EXISTS patient (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tumor_type TEXT NOT NULL, -- 'malignant', 'benign'
        name TEXT,
        surname TEXT,
        internal_patient_id TEXT,
        personal_identification_number TEXT,
        age_at_diagnosis INTEGER,
        gender TEXT, -- 'male', 'female'
        region TEXT,
        other_malignancy_in_personal_history TEXT,
        specification_of_site_of_other_carcinoma TEXT,
        other_major_salivary_gland_disease_in_personal_history TEXT,
        disease_specification TEXT,
        smokes INTEGER, -- boolean
        cigarettes_per_day INTEGER,
        smoking_duration REAL,
        pack_years REAL,
        alcohol_abuse INTEGER, -- boolean
        tumor_location TEXT, -- 'submandibular', 'sublingual', 'parotid'
        diagnosis_year TEXT, -- date
        side_of_lesion TEXT,
        diagnosis_methods TEXT,
        fnab INTEGER, -- boolean
        fnab_result TEXT,
        date_of_treatment_initiation TEXT, -- date
        therapy_type TEXT,
        extent_of_surgical_treatment TEXT,
        date_of_first_post_treatment_follow_up TEXT, -- date
        persistence INTEGER, -- boolean
        date_of_persistence TEXT, -- date
        recidive INTEGER, -- boolean
        date_of_recidive TEXT, -- date
        is_alive INTEGER, -- boolean
        death_date TEXT, -- date
        last_follow_up TEXT, -- date
        next_follow_up TEXT, -- date
        notes TEXT
    )`,

    // 4. Patient Relationships & Inheritance
    `CREATE TABLE IF NOT EXISTS is_in_study (
        id_study INTEGER NOT NULL,
        id_patient INTEGER NOT NULL,
        PRIMARY KEY (id_study, id_patient),
        FOREIGN KEY (id_study) REFERENCES study(id) ON DELETE CASCADE,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS attachment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER NOT NULL,
        file_path TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS patient_staging (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER NOT NULL,
        id_edition INTEGER NOT NULL,
        clinical_t_id INTEGER,
        clinical_n_id INTEGER,
        clinical_m_id INTEGER,
        clinical_grade TEXT,
        patalogical_t_id INTEGER,
        patalogical_n_id INTEGER,
        patalogical_m_id INTEGER,
        patalogical_grade TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE,
        FOREIGN KEY (id_edition) REFERENCES tnm_edition(id),
        FOREIGN KEY (clinical_t_id) REFERENCES tnm_value_definition(id),
        FOREIGN KEY (clinical_n_id) REFERENCES tnm_value_definition(id),
        FOREIGN KEY (clinical_m_id) REFERENCES tnm_value_definition(id),
        FOREIGN KEY (patalogical_t_id) REFERENCES tnm_value_definition(id),
        FOREIGN KEY (patalogical_n_id) REFERENCES tnm_value_definition(id),
        FOREIGN KEY (patalogical_m_id) REFERENCES tnm_value_definition(id)
    )`,

    // 5. Histology & Biopsy Results
    `CREATE TABLE IF NOT EXISTS biopsy_result (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_patient INTEGER NOT NULL,
        id_histology_type INTEGER NOT NULL,
        id_histology_subtype INTEGER,
        biopsy_type TEXT, -- 'core', 'open'
        note TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE,
        FOREIGN KEY (id_histology_type) REFERENCES histology_type(id),
        FOREIGN KEY (id_histology_subtype) REFERENCES histology_subtype(id)
    )`,
    // Unique Constraint for Biopsy
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_biopsy_unique_type 
     ON biopsy_result (id_patient, biopsy_type)`,

    `CREATE TABLE IF NOT EXISTS histopathology (
        id_patient INTEGER PRIMARY KEY, -- 1:1 Relationship
        id_histology_type INTEGER NOT NULL,
        id_histology_subtype INTEGER,
        tumor_size INTEGER,
        tumor_size_not_determined_reason TEXT,
        resection_margin TEXT, -- 'R0', 'R1'
        lymphovascular_invasion INTEGER, -- boolean
        perineural_invasion INTEGER, -- boolean
        number_of_metastatic_lymph_nodes INTEGER,
        extranodal_extension INTEGER, -- boolean
        ene_result TEXT, -- 'ENEma', 'ENEmi'
        proven_distant_metastasis INTEGER, -- boolean
        site_of_distant_metastasis TEXT,
        note TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE,
        FOREIGN KEY (id_histology_type) REFERENCES histology_type(id),
        FOREIGN KEY (id_histology_subtype) REFERENCES histology_subtype(id)
    )`,

    // 6. Inheritance Sub-Tables
    `CREATE TABLE IF NOT EXISTS malignant_patient (
        id_patient INTEGER PRIMARY KEY,
        block_neck_dissection INTEGER, -- boolean
        side_of_neck_dissection TEXT,
        type_of_nd TEXT,
        extent_of_nd TEXT,
        adjuvant_therapy TEXT,
        type_of_non_surgical_therapy TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS benign_patient (
        id_patient INTEGER PRIMARY KEY,
        preoperative_house_brackmann_grade_of_facial_nerve_function TEXT,
        postoperative_house_brackmann_grade_of_facial_nerve_function TEXT,
        postoperative_complications TEXT,
        other_postoperative_complications TEXT,
        further_follow_up_recommended TEXT,
        FOREIGN KEY (id_patient) REFERENCES patient(id) ON DELETE CASCADE
    )`,
    
    // 7. Specific Leaf Tables
    `CREATE TABLE IF NOT EXISTS malignant_parotid_specific (
        id_malignant_patient INTEGER PRIMARY KEY,
        preoperative_house_brackmann_grade_of_facial_nerve_function TEXT,
        postoperative_house_brackmann_grade_of_facial_nerve_function TEXT, 
        postoperative_complications TEXT,
        other_postoperative_complications TEXT,
        FOREIGN KEY (id_malignant_patient) REFERENCES malignant_patient(id_patient) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS malignant_submandibular_specific (
        id_malignant_patient INTEGER PRIMARY KEY,
        preoperative_house_brackmann_grade_of_facial_nerve_function TEXT,
        postoperative_house_brackmann_grade_of_facial_nerve_function TEXT,
        FOREIGN KEY (id_malignant_patient) REFERENCES malignant_patient(id_patient) ON DELETE CASCADE
    )`
]

export const initNewSchema = () => {
    db.serialize(() => {
        // Enforce Foreign Keys
        db.run("PRAGMA foreign_keys = ON")

        newSchemaQueries.forEach((query) => {
            db.run(query, (err) => {
                if (err) {
                    console.error("Error creating new schema table:", err)
                    console.error("Query:", query)
                }
            })
        })
    })
}

createTables()
initNewSchema()

export default db
