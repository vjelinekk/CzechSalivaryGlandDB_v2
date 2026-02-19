import React from 'react'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import TNMClassificationCalculator from './tnm-classification-calculator'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../translations'

const TNMClassification: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.tnmClassification)}</h1>
            <h2>{t(formTranslationKeys.tnmClassificationClinical)}</h2>
            <TNMClassificationCalculator
                tIdLabel={dbLabels.t_klasifikace_klinicka_id}
                nIdLabel={dbLabels.n_klasifikace_klinicka_id}
                mIdLabel={dbLabels.m_klasifikace_klinicka_id}
                gradeIdLabel={dbLabels.tnm_klasifikace_klinicka_id}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
            <h2>{t(formTranslationKeys.tnmClassificationPathological)}</h2>
            <TNMClassificationCalculator
                tIdLabel={dbLabels.t_klasifikace_patologicka_id}
                nIdLabel={dbLabels.n_klasifikace_patologicka_id}
                mIdLabel={dbLabels.m_klasifikace_patologicka_id}
                gradeIdLabel={dbLabels.tnm_klasifikace_patologicka_id}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
        </div>
    )
}

export default TNMClassification
