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
                tLabel={dbLabels.t_klasifikace_klinicka}
                nLabel={dbLabels.n_klasifikace_klinicka}
                mLabel={dbLabels.m_klasifikace_klinicka}
                tnmLabel={dbLabels.tnm_klasifikace_klinicka}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
            <h2>{t(formTranslationKeys.tnmClassificationPathological)}</h2>
            <TNMClassificationCalculator
                tLabel={dbLabels.t_klasifikace_patologicka}
                nLabel={dbLabels.n_klasifikace_patologicka}
                mLabel={dbLabels.m_klasifikace_patologicka}
                tnmLabel={dbLabels.tnm_klasifikace_patologicka}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
        </div>
    )
}

export default TNMClassification
