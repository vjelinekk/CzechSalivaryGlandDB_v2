import { NewTableNames, FormType } from '../constants'
import db from '../dbManager'
import {
    encryptPatientData,
    decryptPatientData,
} from '../utils/patientEncryption'
import { PatientMapper } from '../mappers/PatientMapper'
import { getActiveEdition } from './tnmRepository'
import { PatientDto } from '../../ipc/dtos/PatientDto'
import { PatientEntity } from '../db-entities/PatientEntity'
import { MalignantPatientEntity } from '../db-entities/MalignantPatientEntity'
import { BenignPatientEntity } from '../db-entities/BenignPatientEntity'
import { MalignantParotidSpecificEntity } from '../db-entities/MalignantParotidSpecificEntity'
import { MalignantSubmandibularSpecificEntity } from '../db-entities/MalignantSubmandibularSpecificEntity'
import { BiopsyResultEntity } from '../db-entities/BiopsyResultEntity'
import { HistopathologyEntity } from '../db-entities/HistopathologyEntity'
import { PatientStagingEntity } from '../db-entities/PatientStagingEntity'
import { AttachmentEntity } from '../db-entities/AttachmentEntity'
import { TumorTypeEnum } from '../../ipc/dtos/enums/TumorTypeEnum'
import { FilteredColumnsDto } from '../../ipc/dtos/FilteredColumnsDto'
import { KaplanMeierPatientDataDto } from '../../ipc/dtos/KaplanMeierPatientDataDto'
import { KaplanMeierDataDto } from '../../ipc/dtos/KaplanMeierDataDto'
import { KaplanMeierTypeEnum } from '../../ipc/dtos/enums/KaplanMeierTypeEnum'
import { PlannedPatientsMapDto } from '../../ipc/dtos/PlannedPatientsMapDto'
import { ITTestGroupsDto } from '../../ipc/dtos/ITTestGroupsDto'
import { NonParametricTestDataDto } from '../../ipc/dtos/NonParametricTestDataDto'
import { InferenceChiSquareCategories } from '../enums'
import { HistologyTypeMapper } from '../mappers/HistologyTypeMapper'
import {
    runQuery,
    runQueryAll,
    runInsert,
    runUpdate,
    runDelete,
} from './dbHelpers'

// =============================================
// CRUD Operations
// =============================================

export const insertPatient = async (
    data: PatientDto
): Promise<number | null> => {
    try {
        const activeEdition = await getActiveEdition()
        const editionId = activeEdition?.id ?? 1
        const encryptedData = encryptPatientData(data)
        const mapped = PatientMapper.toPersistence(encryptedData, editionId)

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION')

                // 1. Insert base patient
                runInsert(NewTableNames.patient, { ...mapped.base })
                    .then((patientId) => {
                        const insertPromises: Promise<unknown>[] = []

                        // 2. Insert malignant-specific
                        if (mapped.malignant) {
                            insertPromises.push(
                                runInsert(NewTableNames.malignantPatient, {
                                    ...mapped.malignant,
                                    id_patient: patientId,
                                })
                            )
                        }

                        // 3. Insert benign-specific
                        if (mapped.benign) {
                            insertPromises.push(
                                runInsert(NewTableNames.benignPatient, {
                                    ...mapped.benign,
                                    id_patient: patientId,
                                })
                            )
                        }

                        // 4. Insert location-specific (parotid/submandibular)
                        if (mapped.malignantParotid) {
                            insertPromises.push(
                                runInsert(
                                    NewTableNames.malignantParotidSpecific,
                                    {
                                        ...mapped.malignantParotid,
                                        id_malignant_patient: patientId,
                                    }
                                )
                            )
                        }
                        if (mapped.malignantSubmandibular) {
                            insertPromises.push(
                                runInsert(
                                    NewTableNames.malignantSubmandibularSpecific,
                                    {
                                        ...mapped.malignantSubmandibular,
                                        id_malignant_patient: patientId,
                                    }
                                )
                            )
                        }

                        // 5. Insert biopsy results
                        if (mapped.coreBiopsyResult) {
                            insertPromises.push(
                                runInsert(NewTableNames.biopsyResult, {
                                    ...mapped.coreBiopsyResult,
                                    id_patient: patientId,
                                })
                            )
                        }
                        if (mapped.openBiopsyResult) {
                            insertPromises.push(
                                runInsert(NewTableNames.biopsyResult, {
                                    ...mapped.openBiopsyResult,
                                    id_patient: patientId,
                                })
                            )
                        }

                        // 6. Insert histopathology
                        if (mapped.histopathologyResult) {
                            insertPromises.push(
                                runInsert(NewTableNames.histopathology, {
                                    ...mapped.histopathologyResult,
                                    id_patient: patientId,
                                })
                            )
                        }

                        // 7. Insert staging
                        if (mapped.patientStaging) {
                            insertPromises.push(
                                runInsert(NewTableNames.patientStaging, {
                                    ...mapped.patientStaging,
                                    id_patient: patientId,
                                })
                            )
                        }

                        // 8. Insert attachments
                        for (const attachment of mapped.attachments) {
                            insertPromises.push(
                                runInsert(NewTableNames.attachment, {
                                    ...attachment,
                                    id_patient: patientId,
                                })
                            )
                        }

                        return Promise.all(insertPromises).then(() => patientId)
                    })
                    .then((patientId) => {
                        db.run('COMMIT', (err) => {
                            if (err) {
                                db.run('ROLLBACK')
                                reject(err)
                            } else {
                                resolve(patientId)
                            }
                        })
                    })
                    .catch((err) => {
                        db.run('ROLLBACK')
                        reject(err)
                    })
            })
        })
    } catch (err) {
        console.error('Error inserting patient:', err)
        return null
    }
}

export const updatePatient = async (
    data: PatientDto
): Promise<number | null> => {
    try {
        const patientId = data.id as number
        const activeEdition = await getActiveEdition()
        const editionId = activeEdition?.id ?? 1
        const encryptedData = encryptPatientData(data)
        const mapped = PatientMapper.toPersistence(encryptedData, editionId)

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION')

                const updatePromises: Promise<unknown>[] = []

                // 1. Update base patient
                updatePromises.push(
                    runUpdate(NewTableNames.patient, patientId, {
                        ...mapped.base,
                    })
                )

                // 2. Upsert malignant-specific (delete + insert pattern for simplicity)
                if (mapped.malignant) {
                    updatePromises.push(
                        runDelete(
                            NewTableNames.malignantPatient,
                            patientId,
                            'id_patient'
                        ).then(() =>
                            runInsert(NewTableNames.malignantPatient, {
                                ...mapped.malignant,
                                id_patient: patientId,
                            })
                        )
                    )
                }

                // 3. Upsert benign-specific
                if (mapped.benign) {
                    updatePromises.push(
                        runDelete(
                            NewTableNames.benignPatient,
                            patientId,
                            'id_patient'
                        ).then(() =>
                            runInsert(NewTableNames.benignPatient, {
                                ...mapped.benign,
                                id_patient: patientId,
                            })
                        )
                    )
                }

                // 4. Upsert location-specific
                if (mapped.malignantParotid) {
                    updatePromises.push(
                        runDelete(
                            NewTableNames.malignantParotidSpecific,
                            patientId,
                            'id_malignant_patient'
                        ).then(() =>
                            runInsert(NewTableNames.malignantParotidSpecific, {
                                ...mapped.malignantParotid,
                                id_malignant_patient: patientId,
                            })
                        )
                    )
                }
                if (mapped.malignantSubmandibular) {
                    updatePromises.push(
                        runDelete(
                            NewTableNames.malignantSubmandibularSpecific,
                            patientId,
                            'id_malignant_patient'
                        ).then(() =>
                            runInsert(
                                NewTableNames.malignantSubmandibularSpecific,
                                {
                                    ...mapped.malignantSubmandibular,
                                    id_malignant_patient: patientId,
                                }
                            )
                        )
                    )
                }

                // 5. Replace biopsy results
                updatePromises.push(
                    runQueryAll(
                        `DELETE FROM ${NewTableNames.biopsyResult} WHERE id_patient = ?`,
                        [patientId]
                    ).then(() => {
                        const biopsyInserts: Promise<unknown>[] = []
                        if (mapped.coreBiopsyResult) {
                            biopsyInserts.push(
                                runInsert(NewTableNames.biopsyResult, {
                                    ...mapped.coreBiopsyResult,
                                    id_patient: patientId,
                                })
                            )
                        }
                        if (mapped.openBiopsyResult) {
                            biopsyInserts.push(
                                runInsert(NewTableNames.biopsyResult, {
                                    ...mapped.openBiopsyResult,
                                    id_patient: patientId,
                                })
                            )
                        }
                        return Promise.all(biopsyInserts)
                    })
                )

                // 6. Replace histopathology
                updatePromises.push(
                    runDelete(
                        NewTableNames.histopathology,
                        patientId,
                        'id_patient'
                    ).then(() => {
                        if (mapped.histopathologyResult) {
                            return runInsert(NewTableNames.histopathology, {
                                ...mapped.histopathologyResult,
                                id_patient: patientId,
                            })
                        }
                    })
                )

                // 7. Replace staging
                updatePromises.push(
                    runDelete(
                        NewTableNames.patientStaging,
                        patientId,
                        'id_patient'
                    ).then(() => {
                        if (mapped.patientStaging) {
                            return runInsert(NewTableNames.patientStaging, {
                                ...mapped.patientStaging,
                                id_patient: patientId,
                            })
                        }
                    })
                )

                // 8. Replace attachments
                updatePromises.push(
                    runQueryAll(
                        `DELETE FROM ${NewTableNames.attachment} WHERE id_patient = ?`,
                        [patientId]
                    ).then(() => {
                        return Promise.all(
                            mapped.attachments.map((attachment) =>
                                runInsert(NewTableNames.attachment, {
                                    ...attachment,
                                    id_patient: patientId,
                                })
                            )
                        )
                    })
                )

                Promise.all(updatePromises)
                    .then(() => {
                        db.run('COMMIT', (err) => {
                            if (err) {
                                db.run('ROLLBACK')
                                reject(err)
                            } else {
                                resolve(patientId)
                            }
                        })
                    })
                    .catch((err) => {
                        db.run('ROLLBACK')
                        reject(err)
                    })
            })
        })
    } catch (err) {
        console.error('Error updating patient:', err)
        return null
    }
}

export const savePatient = async (data: PatientDto): Promise<number | null> => {
    try {
        const existingPatient = data.id
            ? await getPatient(data.id as number)
            : null

        if (existingPatient) {
            return updatePatient(data)
        } else {
            return insertPatient(data)
        }
    } catch (err) {
        console.error('Error saving patient:', err)
        return null
    }
}

export const getPatient = async (id: number): Promise<PatientDto | null> => {
    try {
        // Get base patient
        const patient = await runQuery<PatientEntity>(
            `SELECT * FROM ${NewTableNames.patient} WHERE id = ?`,
            [id]
        )

        if (!patient) return null

        // Get related entities
        const [
            malignant,
            benign,
            malignantParotid,
            malignantSubmandibular,
            biopsies,
            histopathology,
            staging,
            attachments,
        ] = await Promise.all([
            runQuery<MalignantPatientEntity>(
                `SELECT * FROM ${NewTableNames.malignantPatient} WHERE id_patient = ?`,
                [id]
            ),
            runQuery<BenignPatientEntity>(
                `SELECT * FROM ${NewTableNames.benignPatient} WHERE id_patient = ?`,
                [id]
            ),
            runQuery<MalignantParotidSpecificEntity>(
                `SELECT * FROM ${NewTableNames.malignantParotidSpecific} WHERE id_malignant_patient = ?`,
                [id]
            ),
            runQuery<MalignantSubmandibularSpecificEntity>(
                `SELECT * FROM ${NewTableNames.malignantSubmandibularSpecific} WHERE id_malignant_patient = ?`,
                [id]
            ),
            runQueryAll<BiopsyResultEntity>(
                `SELECT * FROM ${NewTableNames.biopsyResult} WHERE id_patient = ?`,
                [id]
            ),
            runQuery<HistopathologyEntity>(
                `SELECT * FROM ${NewTableNames.histopathology} WHERE id_patient = ?`,
                [id]
            ),
            runQuery<PatientStagingEntity>(
                `SELECT * FROM ${NewTableNames.patientStaging} WHERE id_patient = ?`,
                [id]
            ),
            runQueryAll<AttachmentEntity>(
                `SELECT * FROM ${NewTableNames.attachment} WHERE id_patient = ?`,
                [id]
            ),
        ])

        const coreBiopsy = biopsies.find((b) => b.biopsy_type === 'core')
        const openBiopsy = biopsies.find((b) => b.biopsy_type === 'open')

        const dto = PatientMapper.toDto(
            patient,
            malignant,
            benign,
            malignantParotid,
            malignantSubmandibular,
            coreBiopsy,
            openBiopsy,
            histopathology,
            staging,
            attachments
        )

        // Decrypt sensitive fields
        const decrypted = decryptPatientData([dto])
        return decrypted[0]
    } catch (err) {
        console.error('Error getting patient:', err)
        return null
    }
}

export const deletePatient = async (data: PatientDto): Promise<boolean> => {
    try {
        const patientId = data.id as number
        // CASCADE will handle related tables
        await runDelete(NewTableNames.patient, patientId)
        return true
    } catch (err) {
        console.error('Error deleting patient:', err)
        return false
    }
}

const fetchFullPatients = async (ids: number[]): Promise<PatientDto[]> => {
    const promises = ids.map((id) => getPatient(id))
    const results = await Promise.all(promises)
    return results.filter((p): p is PatientDto => p !== null)
}

// =============================================
// Query Operations
// =============================================

export const getAllPatients = async (): Promise<PatientDto[]> => {
    try {
        const patients = await runQueryAll<PatientEntity>(
            `SELECT id FROM ${NewTableNames.patient}`
        )

        const ids = patients.map((p) => p.id)
        return fetchFullPatients(ids)
    } catch (err) {
        console.error('Error getting all patients:', err)
        return []
    }
}

export const getPatientsInStudy = async (
    idStudy: number
): Promise<PatientDto[]> => {
    const query = `
        SELECT p.*
        FROM ${NewTableNames.patient} p
        INNER JOIN ${NewTableNames.isInStudy} iis ON p.id = iis.id_patient
        WHERE iis.id_study = ?
    `

    try {
        const patients = await runQueryAll<PatientDto>(query, [idStudy])

        const ids = patients.map((p) => p.id as number)
        return fetchFullPatients(ids)
    } catch (err) {
        return []
    }
}

export const getPatientsByType = async (
    formType: FormType
): Promise<PatientDto[] | null> => {
    try {
        const { tumorType, tumorLocation } = formTypeToTumorInfo(formType)

        const patients = await runQueryAll<PatientEntity>(
            `SELECT id FROM ${NewTableNames.patient} WHERE tumor_type = ? AND tumor_location = ?`,
            [tumorType, tumorLocation]
        )

        const ids = patients.map((p) => p.id)
        return fetchFullPatients(ids)
    } catch (err) {
        console.error('Error getting patients by type:', err)
        return null
    }
}

export const getFilteredPatients = async (
    filter: FilteredColumnsDto,
    idStudie?: number
): Promise<PatientDto[] | null> => {
    try {
        let query = `SELECT p.id FROM ${NewTableNames.patient} p`
        const params: unknown[] = []

        // Join with study if filtering by study
        if (idStudie) {
            query += ` JOIN ${NewTableNames.isInStudy} s ON p.id = s.id_patient WHERE s.id_study = ?`
            params.push(idStudie)
        } else {
            query += ' WHERE 1=1'
        }

        // Filter by tumor type
        if (filter.typ_nadoru === TumorTypeEnum.MALIGNANT) {
            query += ` AND p.tumor_type = 'malignant'`
        } else if (filter.typ_nadoru === TumorTypeEnum.BENIGN) {
            query += ` AND p.tumor_type = 'benign'`
        }

        // Filter by form type (location)
        if (filter.form_type && filter.form_type.length > 0) {
            const locations = filter.form_type.map((ft) => {
                const info = formTypeToTumorInfo(ft)
                return info.tumorLocation
            })
            query += ` AND p.tumor_location IN (${locations.map(() => '?').join(', ')})`
            params.push(...locations)
        }

        // Filter by therapy type
        if (filter.typ_terapie && filter.typ_terapie.length > 0) {
            query += ` AND p.therapy_type IN (${filter.typ_terapie.map(() => '?').join(', ')})`
            params.push(...filter.typ_terapie)
        }

        // Filter by persistence
        if (filter.perzistence) {
            query += ` AND p.persistence = ?`
            params.push(filter.perzistence === 'Ano' ? 1 : 0)
        }

        // Filter by recurrence
        if (filter.recidiva) {
            query += ` AND p.recidive = ?`
            params.push(filter.recidiva === 'Ano' ? 1 : 0)
        }

        // Filter by state (alive/dead)
        if (filter.stav) {
            query += ` AND p.is_alive = ?`
            params.push(filter.stav === 'Zije' ? 1 : 0)
        }

        // Filter by gender
        if (filter.pohlavi) {
            query += ` AND p.gender = ?`
            params.push(filter.pohlavi)
        }

        const patients = await runQueryAll<PatientEntity>(query, params)

        const ids = patients.map((p) => p.id)
        return fetchFullPatients(ids)
    } catch (err) {
        console.error('Error getting filtered patients:', err)
        return null
    }
}

export const searchPatientsByNameSurnameRC = async (
    search: string
): Promise<PatientDto[] | null> => {
    try {
        const query = `
            SELECT id FROM ${NewTableNames.patient}
            WHERE name || ' ' || surname LIKE ?
            OR personal_identification_number LIKE ?
        `
        const searchPattern = `%${search}%`

        const patients = await runQueryAll<PatientEntity>(query, [
            searchPattern,
            searchPattern,
        ])

        const ids = patients.map((p) => p.id)
        return fetchFullPatients(ids)
    } catch (err) {
        console.error('Error searching patients:', err)
        return null
    }
}

export const getPlannedPatientsBetweenDates = async (
    startDate: Date,
    endDate: Date
): Promise<PlannedPatientsMapDto> => {
    try {
        const startDateFormatted = startDate.toISOString().split('T')[0]
        const endDateFormatted = endDate.toISOString().split('T')[0]

        const query = `
            SELECT id FROM ${NewTableNames.patient}
            WHERE next_follow_up BETWEEN ? AND ?
        `

        const patients = await runQueryAll<PatientEntity>(query, [
            startDateFormatted,
            endDateFormatted,
        ])

        const ids = patients.map((p) => p.id)
        const fullPatients = await fetchFullPatients(ids)

        // Group by date
        const plannedPatientsMap: PlannedPatientsMapDto = {}
        fullPatients.forEach((patient) => {
            const date = patient.planovana_kontrola as string
            if (!plannedPatientsMap[date]) {
                plannedPatientsMap[date] = []
            }
            plannedPatientsMap[date].push(patient)
        })

        return plannedPatientsMap
    } catch (err) {
        console.error('Error getting planned patients:', err)
        return {}
    }
}

// =============================================
// Statistics Operations
// =============================================

export const getKaplanMeierData = async (
    kaplanMeierType: KaplanMeierTypeEnum,
    filter: FilteredColumnsDto
): Promise<KaplanMeierDataDto | null> => {
    try {
        const kaplanMeierData: KaplanMeierDataDto = {}

        console.log(filter);
        // Need to join with histopathology to get histopatologie_vysledek
        for (const histopatologieVysledek of filter.histopatologie_vysledek) {
            let query = ''
            if (kaplanMeierType === KaplanMeierTypeEnum.survival) {
                query = `
                    SELECT p.diagnosis_year as rok_diagnozy,
                           p.death_date as datum_umrti,
                           p.last_follow_up as posledni_kontrola
                    FROM ${NewTableNames.patient} p
                    JOIN ${NewTableNames.histopathology} h ON p.id = h.id_patient
                    JOIN ${NewTableNames.histologyType} ht ON h.id_histology_type = ht.id
                    WHERE ht.id = ? AND p.tumor_type = 'malignant'
                `
            } else {
                query = `
                    SELECT p.diagnosis_year as rok_diagnozy,
                           p.date_of_recidive as datum_prokazani_recidivy,
                           p.last_follow_up as posledni_kontrola
                    FROM ${NewTableNames.patient} p
                    JOIN ${NewTableNames.histopathology} h ON p.id = h.id_patient
                    JOIN ${NewTableNames.histologyType} ht ON h.id_histology_type = ht.id
                    WHERE ht.id = ? AND p.tumor_type = 'malignant'
                `
            }

            console.log(histopatologieVysledek);
            const histologyTypeId = HistologyTypeMapper.mapKeyToId(histopatologieVysledek);
            console.log(histologyTypeId);
            const rows = await runQueryAll<{
                rok_diagnozy: string
                datum_umrti?: string
                datum_prokazani_recidivy?: string
                posledni_kontrola?: string
            }>(query, [histologyTypeId])
            console.log(rows);

            kaplanMeierData[histopatologieVysledek] = rows
                .filter((row) => row.rok_diagnozy !== null)
                .map((row) => {
                    const patientData: KaplanMeierPatientDataDto = {
                        start_date: new Date(row.rok_diagnozy),
                        event_date: getEventDate(row, kaplanMeierType),
                        last_follow_up_date: getLastFollowUpDate(row),
                    }
                    return patientData
                })
        }

        console.log(kaplanMeierData);
        return kaplanMeierData
    } catch (err) {
        console.error('Error getting Kaplan-Meier data:', err)
        return null
    }
}

const getEventDate = (
    row: {
        datum_umrti?: string
        datum_prokazani_recidivy?: string
    },
    kaplanMeierType: KaplanMeierTypeEnum
): Date | null => {
    if (kaplanMeierType === KaplanMeierTypeEnum.survival) {
        if (row.datum_umrti && row.datum_umrti !== '') {
            return new Date(row.datum_umrti)
        }
        return null
    } else {
        if (
            row.datum_prokazani_recidivy &&
            row.datum_prokazani_recidivy !== ''
        ) {
            return new Date(row.datum_prokazani_recidivy)
        }
        return null
    }
}

const getLastFollowUpDate = (row: {
    posledni_kontrola?: string
    rok_diagnozy?: string
}): Date | null => {
    if (row.posledni_kontrola && row.posledni_kontrola !== '') {
        return new Date(row.posledni_kontrola)
    }
    if (row.rok_diagnozy && row.rok_diagnozy !== '') {
        return new Date(row.rok_diagnozy)
    }
    return null
}

export const getChiSquareContingencyTable = async (
    rows: number,
    columns: number,
    rowSelectedCategories: Record<
        number,
        Record<InferenceChiSquareCategories, string[]>
    >,
    columnSelectedCategories: Record<
        number,
        Record<InferenceChiSquareCategories, string[]>
    >
): Promise<number[][]> => {
    console.log(rows);
    console.log(columns);
    console.log(rowSelectedCategories);
    console.log(columnSelectedCategories);

    const contingencyTable = Array.from({ length: rows }, () =>
        Array(columns).fill(0)
    )

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const rowData = rowSelectedCategories[i]
            const columnData = columnSelectedCategories[j]
            if (rowData && columnData) {
                const count = await getChiSquareCount(rowData, columnData)
                contingencyTable[i][j] = count
            }
        }
    }

    return contingencyTable
}

const getChiSquareCount = async (
    rowData: Record<InferenceChiSquareCategories, string[]>,
    columnData: Record<InferenceChiSquareCategories, string[]>
): Promise<number> => {
    const rowFilters = collectCategoryFilters(rowData)
    const colFilters = collectCategoryFilters(columnData)

    // Deduplicate joins across row and column filters
    const allJoins = [...rowFilters.joins]
    for (const join of colFilters.joins) {
        if (!allJoins.includes(join)) {
            allJoins.push(join)
        }
    }

    const joinClause = allJoins.length > 0 ? ' ' + allJoins.join(' ') : ''
    const allConditions = [...rowFilters.conditions, ...colFilters.conditions]
    const whereClause =
        allConditions.length > 0
            ? ' AND ' + allConditions.join(' AND ')
            : ''
    const params = [...rowFilters.params, ...colFilters.params]

    const query = `SELECT COUNT(DISTINCT p.id) as count FROM ${NewTableNames.patient} p ${joinClause} WHERE p.tumor_type = 'malignant'${whereClause}`

    const result = await runQuery<{ count: number }>(query, params)
    return result?.count ?? 0
}

interface CategoryQueryFragment {
    joins: string[]
    condition: string
    params: unknown[]
}

const convertValues = (
    category: InferenceChiSquareCategories,
    values: string[]
): unknown[] => {
    switch (category) {
        case InferenceChiSquareCategories.persistence:
        case InferenceChiSquareCategories.recurrence:
            return values.map((v) => (v === 'Ano' ? 1 : 0))
        case InferenceChiSquareCategories.state:
            return values.map((v) => (v === 'Žije' ? 1 : 0))
        default:
            return values
    }
}

const buildCategoryFilter = (
    category: InferenceChiSquareCategories,
    values: string[]
): CategoryQueryFragment => {
    const converted = convertValues(category, values)
    const placeholders = converted.map(() => '?').join(', ')

    switch (category) {
        case InferenceChiSquareCategories.histologicalTypes:
            return {
                joins: [
                    `JOIN ${NewTableNames.histopathology} hp ON hp.id_patient = p.id`,
                    `JOIN ${NewTableNames.histologyType} ht ON ht.id = hp.id_histology_type`,
                ],
                condition: `ht.translation_key IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.tClassification:
            return {
                joins: [
                    `JOIN ${NewTableNames.patientStaging} ps ON ps.id_patient = p.id`,
                    `JOIN ${NewTableNames.tnmValueDefinition} tvd_t ON tvd_t.id = ps.clinical_t_id`,
                ],
                condition: `tvd_t.code IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.nClassification:
            return {
                joins: [
                    `JOIN ${NewTableNames.patientStaging} ps ON ps.id_patient = p.id`,
                    `JOIN ${NewTableNames.tnmValueDefinition} tvd_n ON tvd_n.id = ps.clinical_n_id`,
                ],
                condition: `tvd_n.code IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.mClassification:
            return {
                joins: [
                    `JOIN ${NewTableNames.patientStaging} ps ON ps.id_patient = p.id`,
                    `JOIN ${NewTableNames.tnmValueDefinition} tvd_m ON tvd_m.id = ps.clinical_m_id`,
                ],
                condition: `tvd_m.code IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.persistence:
            return {
                joins: [],
                condition: `p.persistence IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.recurrence:
            return {
                joins: [],
                condition: `p.recidive IN (${placeholders})`,
                params: converted,
            }
        case InferenceChiSquareCategories.state:
            return {
                joins: [],
                condition: `p.is_alive IN (${placeholders})`,
                params: converted,
            }
    }
}

const collectCategoryFilters = (
    data: Record<InferenceChiSquareCategories, string[]>
): { joins: string[]; conditions: string[]; params: unknown[] } => {
    const allJoins: string[] = []
    const conditions: string[] = []
    const params: unknown[] = []

    for (const [category, values] of Object.entries(data)) {
        const filteredValues = values.filter((v) => v.length > 0)
        if (filteredValues.length > 0) {
            const fragment = buildCategoryFilter(
                category as InferenceChiSquareCategories,
                filteredValues
            )
            for (const join of fragment.joins) {
                if (!allJoins.includes(join)) {
                    allJoins.push(join)
                }
            }
            conditions.push(fragment.condition)
            params.push(...fragment.params)
        }
    }

    return { joins: allJoins, conditions, params }
}

export const getTTestData = async (
    groups: ITTestGroupsDto
): Promise<NonParametricTestDataDto> => {
    const group1Data = await getTTestGroupData(groups.first)
    const group2Data = await getTTestGroupData(groups.second)

    return {
        group1: group1Data,
        group2: group2Data,
    }
}

const getTTestGroupData = async (group: {
    histologicalTypes: string[]
    tClassification: string[]
    nClassification: string[]
    mClassification: string[]
    persistence: string[]
    recurrence: string[]
    state: string[]
}): Promise<PatientDto[]> => {
    const filters = collectCategoryFilters(
        group as Record<InferenceChiSquareCategories, string[]>
    )

    const joinClause =
        filters.joins.length > 0 ? ' ' + filters.joins.join(' ') : ''
    const whereClause =
        filters.conditions.length > 0
            ? ' AND ' + filters.conditions.join(' AND ')
            : ''

    const query = `SELECT DISTINCT p.id FROM ${NewTableNames.patient} p ${joinClause} WHERE p.tumor_type = 'malignant'${whereClause}`

    const patients = await runQueryAll<PatientEntity>(query, filters.params)

    const ids = patients.map((p) => p.id)
    return fetchFullPatients(ids)
}

// =============================================
// Helper Functions
// =============================================

const formTypeToTumorInfo = (
    formType: FormType | number
): { tumorType: string; tumorLocation: string } => {
    switch (formType) {
        case FormType.submandibularMalignant:
            return { tumorType: 'malignant', tumorLocation: 'submandibular' }
        case FormType.sublingualMalignant:
            return { tumorType: 'malignant', tumorLocation: 'sublingual' }
        case FormType.parotidMalignant:
            return { tumorType: 'malignant', tumorLocation: 'parotid' }
        case FormType.submandibularBenign:
            return { tumorType: 'benign', tumorLocation: 'submandibular' }
        case FormType.parotidBenign:
            return { tumorType: 'benign', tumorLocation: 'parotid' }
        default:
            return { tumorType: 'malignant', tumorLocation: 'parotid' }
    }
}
