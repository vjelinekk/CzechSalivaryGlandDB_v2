import React from 'react'
import { useTranslation } from 'react-i18next'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import SimpleCheckboxes from './simple-checkboxes'
import TextInput from './text-input'
import NumberInput from './number-input'
import { formTranslationKeys } from '../../translations'

const HistopathologyBenign: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.histopathology)}</h1>
            <h2>{t(formTranslationKeys.histologicalType)}</h2>
            <ConditionalCheckboxes
                dbLabel={dbLabels.histopatologie_vysledek}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.pleomorphicAdenoma)}
                    dbValue="pleomorphic-adenoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.coreResultWarthinTumor)}
                    dbValue="warthin-tumor"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.basalCellAdenoma)}
                    dbValue="basal-cell-adenoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.myoepithelioma)}
                    dbValue="myoepithelioma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.oncocytoma)}
                    dbValue="oncocytoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.canalicularAdenoma)}
                    dbValue="canalicular-adenoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.sebaceousAdenoma)}
                    dbValue="sebaceous-adenoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.ductalPapilloma)}
                    dbValue="ductal-papilloma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.sebaceousLymphadenoma)}
                    dbValue="sebaceous-lymphadenoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.keratocystoma)}
                    dbValue="keratocystoma"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.other)}
                    dbValue="other"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <TextInput
                        label={t(
                            formTranslationKeys.histologicalTypeSpecification
                        )}
                        dbLabel={dbLabels.histopatologie_vysledek_jine}
                        data={getDataFromPatientInterface(
                            formData,
                            dbLabels.histopatologie_vysledek_jine
                        )}
                        setFormData={setFormData}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>
            <h2>{t(formTranslationKeys.histologicalTypeSpecification)}</h2>
            <NumberInput
                label={t(formTranslationKeys.tumorSizeLargestDimension)}
                dbLabel={dbLabels.velikost_nadoru_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <TextInput
                label={t(formTranslationKeys.tumorSizeNotDeterminedExplain)}
                dbLabel={dbLabels.velikost_nadoru_neurcena_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_neurcena_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title={t(formTranslationKeys.resectionMargin)}
                dbLabel={dbLabels.okraj_resekce_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={[t(formTranslationKeys.r0), t(formTranslationKeys.r1)]}
                disabled={disabled}
            />
        </div>
    )
}

export default HistopathologyBenign
