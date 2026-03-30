import React, { useEffect, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { dbLabels } from '../../constants'
import { GlandComponentProps, PatientStaging, TnmEdition } from '../../types'
import TNMClassificationCalculator from './tnm-classification-calculator'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../translations'
import { ipcAPISaveChannels } from '../../../ipc/ipcChannels'

// Flat TNM field labels for clinical and pathological staging
const CLINICAL_LABELS = {
    t: dbLabels.t_klasifikace_klinicka_id,
    n: dbLabels.n_klasifikace_klinicka_id,
    m: dbLabels.m_klasifikace_klinicka_id,
    grade: dbLabels.tnm_klasifikace_klinicka_id,
}

const PATHOLOGICAL_LABELS = {
    t: dbLabels.t_klasifikace_patologicka_id,
    n: dbLabels.n_klasifikace_patologicka_id,
    m: dbLabels.m_klasifikace_patologicka_id,
    grade: dbLabels.tnm_klasifikace_patologicka_id,
}

// Extract staging values from formData flat fields
const extractStagingFromFormData = (
    formData: GlandComponentProps['formData'],
    editionId: number
): PatientStaging => ({
    id_patient: (formData?.id as number) ?? 0,
    id_edition: editionId,
    clinical_t_id: (formData?.[CLINICAL_LABELS.t] as number) ?? null,
    clinical_n_id: (formData?.[CLINICAL_LABELS.n] as number) ?? null,
    clinical_m_id: (formData?.[CLINICAL_LABELS.m] as number) ?? null,
    clinical_grade_id: (formData?.[CLINICAL_LABELS.grade] as number) ?? null,
    pathological_t_id: (formData?.[PATHOLOGICAL_LABELS.t] as number) ?? null,
    pathological_n_id: (formData?.[PATHOLOGICAL_LABELS.n] as number) ?? null,
    pathological_m_id: (formData?.[PATHOLOGICAL_LABELS.m] as number) ?? null,
    pathological_grade_id:
        (formData?.[PATHOLOGICAL_LABELS.grade] as number) ?? null,
})

const TNMClassification: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()
    const [editions, setEditions] = useState<TnmEdition[]>([])
    const [selectedEditionId, setSelectedEditionId] = useState<number | null>(
        null
    )
    // Cache of staging data for all editions (keyed by edition id)
    const [stagingsCache, setStagingsCache] = useState<
        Record<number, PatientStaging>
    >({})

    // Load all available editions on mount
    useEffect(() => {
        window.api.getAllTnmEditions().then((eds: TnmEdition[]) => {
            setEditions(eds)

            // Determine initial edition: use patient's existing edition or the active one
            const patientEditionId = formData?.id_edition as number | undefined
            const initial =
                patientEditionId ??
                eds.find((e) => e.is_active)?.id ??
                eds[0]?.id ??
                null
            setSelectedEditionId(initial)
        })
    }, [])

    // When formData.id is available (existing patient form opened), load all
    // stagings from DB to populate the cache for edition switching.
    useEffect(() => {
        const patientId = formData?.id as number | undefined
        if (!patientId) return

        window.api
            .getAllPatientStagings(patientId)
            .then((stagings: PatientStaging[]) => {
                const cache: Record<number, PatientStaging> = {}
                for (const s of stagings) {
                    cache[s.id_edition] = s
                }
                // Seed the cache with the current formData values for the active
                // edition so they aren't lost if the user switches immediately
                if (selectedEditionId !== null && !cache[selectedEditionId]) {
                    cache[selectedEditionId] = extractStagingFromFormData(
                        formData,
                        selectedEditionId
                    )
                }
                setStagingsCache(cache)
            })
    }, [formData?.id])

    const handleEditionChange = (newEditionId: number) => {
        if (newEditionId === selectedEditionId || !formData) return

        const currentEditionId = selectedEditionId
        if (currentEditionId !== null) {
            // Snapshot current flat fields into the cache
            const currentStaging = extractStagingFromFormData(
                formData,
                currentEditionId
            )
            const updatedCache = {
                ...stagingsCache,
                [currentEditionId]: currentStaging,
            }
            setStagingsCache(updatedCache)

            // All editions except the one being switched TO are "other" stagings.
            // Store them as JSON in formData so insertPatient can save them all
            // even when the patient has no ID yet.
            const otherStagings = Object.values(updatedCache).filter(
                (s) => s.id_edition !== newEditionId
            )

            // Load new edition's staging from cache and update formData flat fields
            const newStaging = updatedCache[newEditionId]
            setFormData((prev) => {
                if (!prev) return prev
                return {
                    ...prev,
                    id_edition: newEditionId,
                    other_stagings_json: JSON.stringify(otherStagings),
                    [CLINICAL_LABELS.t]: newStaging?.clinical_t_id ?? null,
                    [CLINICAL_LABELS.n]: newStaging?.clinical_n_id ?? null,
                    [CLINICAL_LABELS.m]: newStaging?.clinical_m_id ?? null,
                    [CLINICAL_LABELS.grade]:
                        newStaging?.clinical_grade_id ?? null,
                    [PATHOLOGICAL_LABELS.t]:
                        newStaging?.pathological_t_id ?? null,
                    [PATHOLOGICAL_LABELS.n]:
                        newStaging?.pathological_n_id ?? null,
                    [PATHOLOGICAL_LABELS.m]:
                        newStaging?.pathological_m_id ?? null,
                    [PATHOLOGICAL_LABELS.grade]:
                        newStaging?.pathological_grade_id ?? null,
                }
            })

            // For existing patients, persist the previous edition to DB immediately
            if (formData.id) {
                window.api.save(
                    ipcAPISaveChannels.savePatientStaging,
                    currentStaging
                )
            }
        }

        setSelectedEditionId(newEditionId)
    }

    if (editions.length === 0 || selectedEditionId === null) {
        return null
    }

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.tnmClassification)}</h1>
            <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 500 }}>
                    {t(formTranslationKeys.tnmEditionSelector)}
                </p>
                <ToggleButtonGroup
                    value={selectedEditionId}
                    exclusive
                    onChange={(_, newVal) => {
                        if (newVal !== null) handleEditionChange(newVal)
                    }}
                    size="small"
                    color="primary"
                    sx={{
                        '& span': {
                            margin: 0,
                            display: 'revert',
                            position: 'static',
                        },
                    }}
                >
                    {editions.map((edition) => (
                        <ToggleButton key={edition.id} value={edition.id}>
                            {edition.name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
            <h2>{t(formTranslationKeys.tnmClassificationClinical)}</h2>
            <TNMClassificationCalculator
                tIdLabel={CLINICAL_LABELS.t}
                nIdLabel={CLINICAL_LABELS.n}
                mIdLabel={CLINICAL_LABELS.m}
                gradeIdLabel={CLINICAL_LABELS.grade}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
            <h2>{t(formTranslationKeys.tnmClassificationPathological)}</h2>
            <TNMClassificationCalculator
                tIdLabel={PATHOLOGICAL_LABELS.t}
                nIdLabel={PATHOLOGICAL_LABELS.n}
                mIdLabel={PATHOLOGICAL_LABELS.m}
                gradeIdLabel={PATHOLOGICAL_LABELS.grade}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
        </div>
    )
}

export default TNMClassification
