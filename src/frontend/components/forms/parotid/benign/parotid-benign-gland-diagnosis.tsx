import React from 'react'
import { GlandComponentProps } from '../../../../types'
import { dbLabels } from '../../../../constants'
import DatePicker from '../../date-picker'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import SimpleCheckboxes from '../../simple-checkboxes'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import TextInput from '../../text-input'
import { useTranslation } from 'react-i18next'

const ParotidBenignGlandDiagnosis: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t('diagnosis-title')}</h1>
            <DatePicker
                label={t('year-of-diagnosis')}
                dbLabel={dbLabels.rok_diagnozy}
                data={getDataFromPatientInterface(formData, dbLabels.rok_diagnozy)}
                setFormData={setFormData}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title={t('side-of-finding')}
                dbLabel={dbLabels.strana_nalezu}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={[t('side-right'), t('side-left'), t('bilateraly')]}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title={t('n-vii-function-hb-pre-op')}
                dbLabel={dbLabels.funkce_n_vii_dle_h_b_predoperacne}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title={t('diagnostic-methods')}
                dbLabel={dbLabels.diagnosticke_metody}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={false}
                options={[
                    t('method-uz'),
                    t('method-ct'),
                    t('method-mri'),
                    t('method-pet-ct'),
                    t('method-pet-mr'),
                    t('no-imaging-performed'),
                ]}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title={t('fnab')}
                dbLabel={dbLabels.fnab}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption label={t('yes')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes
                        title={t('fnab-result-MSRSGC')}
                        dbLabel={dbLabels.vysledek_fnab}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t('fnab-result-i'),
                            t('fnab-result-ii'),
                            t('atypia-unspecified'),
                            t('IVa-tumor-benign'),
                            t('uncertain-malignant-potential'),
                            t('suspected-malignancy'),
                            t('malignant-tumor'),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('no')} disabled={disabled} setFormData={setFormData} />
            </ConditionalCheckboxes>
            <ConditionalCheckboxes
                title= {t('core-biopsy')}                dbLabel={dbLabels.core_biopsie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption label={t('yes')} disabled={disabled} setFormData={setFormData}>
                    <ConditionalCheckboxes
                        title={t('core-biopsy-result')}
                        dbLabel={dbLabels.core_vysledek}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                    >
                        <ConditionalCheckboxOption label={t('core-result-pleomorphic-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-warthin-tumor')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-basal-cell-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-myoepithelioma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-oncocytoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-canalicular-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-sebaceous-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('ductal-papilloma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-sebaceous-lymphadenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-keratocystoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('other')} disabled={disabled} setFormData={setFormData}>
                            <TextInput
                                label={t('histological-type-specification')}
                                dbLabel={dbLabels.core_vysledek_jine}
                                data={getDataFromPatientInterface(formData, dbLabels.core_vysledek_jine)}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('no')} disabled={disabled} setFormData={setFormData} />
            </ConditionalCheckboxes>
            <ConditionalCheckboxes
                title={t('open-biopsy')}
                dbLabel={dbLabels.otevrena_biopsie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption label={t('yes')} disabled={disabled} setFormData={setFormData}>
                    <ConditionalCheckboxes
                        title={t('open-biopsy-result')}
                        dbLabel={dbLabels.otevrena_vysledek}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                    >
                        <ConditionalCheckboxOption label={t('core-result-pleomorphic-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-warthin-tumor')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-basal-cell-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-myoepithelioma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-oncocytoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-canalicular-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-sebaceous-adenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('ductal-papilloma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-sebaceous-lymphadenoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('core-result-keratocystoma')} disabled={disabled} setFormData={setFormData} />
                        <ConditionalCheckboxOption label={t('other')} disabled={disabled} setFormData={setFormData}>
                            <TextInput
                                label={t('histological-type-specification')}
                                dbLabel={dbLabels.otevrena_vysledek_jine}
                                data={getDataFromPatientInterface(formData, dbLabels.otevrena_vysledek_jine)}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('no')} disabled={disabled} setFormData={setFormData} />
            </ConditionalCheckboxes>
        </div>
    )
}

export default ParotidBenignGlandDiagnosis
