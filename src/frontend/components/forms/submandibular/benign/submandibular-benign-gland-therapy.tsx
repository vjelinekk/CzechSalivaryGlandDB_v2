import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'
import TextInput from '../../text-input'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../../../translations'

const SubmandibularBenignGlandTherapy: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.therapyTitle)}</h1>
            <DatePicker
                label={t(formTranslationKeys.treatmentStartDate)}
                dbLabel={dbLabels.datum_zahajeni_lecby}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_zahajeni_lecby
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title={t(formTranslationKeys.therapyType)}
                data={formData}
                dbLabel={dbLabels.typ_terapie}
                setFormData={setFormData}
                enableSingleSelect={true}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.surgical)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title={t(formTranslationKeys.surgicalScope)}
                        data={formData}
                        dbLabel={dbLabels.rozsah_chirurgicke_lecby}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            t(formTranslationKeys.peroralExtirpation),
                            t(formTranslationKeys.externalExtirpation),
                            t(formTranslationKeys.other),
                        ]}
                    />
                    <SimpleCheckboxes
                        title={t(formTranslationKeys.nVIIFunctionHBPostoperative)}
                        data={formData}
                        dbLabel={dbLabels.funkce_n_vii_dle_h_b_pooperacne}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    />
                    <ConditionalCheckboxes
                        title={t(formTranslationKeys.otherPostoperativeComplications)}
                        data={formData}
                        dbLabel={dbLabels.pooperacni_komplikace}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.none)}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.freysSyndrome)}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.salivaryFistula)}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.other)}
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <TextInput
                                label={t(
                                    'specify-other-postoperative-complication'
                                )}
                                dbLabel={dbLabels.jine_pooperacni_komplikace}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.jine_pooperacni_komplikace
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.nonSurgicalMonitoring)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.notIndicated)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default SubmandibularBenignGlandTherapy
