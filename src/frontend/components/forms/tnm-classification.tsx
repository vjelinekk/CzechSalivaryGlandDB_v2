import React, { Dispatch, SetStateAction } from 'react'
import { dbLabels } from '../../constants'
import { PatientType } from '../../types'
import TNMClassificationCalculator from './tnm-classification-calculator'

interface TNMClassificationProps {
    formData: PatientType | null
    setFormData: Dispatch<SetStateAction<PatientType | null>>
    disabled: boolean
}

const TNMClassification: React.FC<TNMClassificationProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>TNM klasifikace</h1>
            <h2>TNM klasifikace (klinická)</h2>
            <TNMClassificationCalculator
                tLabel={dbLabels.t_klasifikace_klinicka}
                nLabel={dbLabels.n_klasifikace_klinicka}
                mLabel={dbLabels.m_klasifikace_klinicka}
                tnmLabel={dbLabels.tnm_klasifikace_klinicka}
                formData={formData}
                setFormData={setFormData}
                disabled={disabled}
            />
            <h2>TNM klasifikace (patologická)</h2>
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
