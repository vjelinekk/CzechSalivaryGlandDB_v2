import React from 'react'
import { useTranslation } from 'react-i18next' // Import translation
import { dbLabels } from '../../../../constants'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import { GlandComponentProps } from '../../../../types'
import DatePicker from '../../date-picker'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import SimpleCheckboxes from '../../simple-checkboxes'
import TextInput from '../../text-input'
import { formTranslationKeys } from '../../../../translations'

const ParotidBenignGlandTherapy: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.therapy)}</h1>
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
            <i>{t(formTranslationKeys.noteSurgicalTreatment)}</i>
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
                            t(formTranslationKeys.parotidectomyI_IV),
                            t(formTranslationKeys.parotidectomyI_IV_VII),
                            t(formTranslationKeys.parotidectomyI_IV_VII_s_MM),
                            t(formTranslationKeys.parotidectomyI_II_Pes),
                            t(formTranslationKeys.parotidectomyIII_IV),
                            t(formTranslationKeys.parotidectomyI),
                            t(formTranslationKeys.parotidectomyII),
                            t(formTranslationKeys.parotidectomyI_II_III),
                            t(formTranslationKeys.parotidectomyV),
                            t(formTranslationKeys.ecdI),
                            t(formTranslationKeys.ecdII),
                            t(formTranslationKeys.ecdV),
                        ]}
                    />
                    <SimpleCheckboxes
                        title={t(
                            formTranslationKeys.nVIIFunctionHBPostoperative
                        )}
                        data={formData}
                        dbLabel={dbLabels.funkce_n_vii_dle_h_b_pooperacne}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    />
                    <ConditionalCheckboxes
                        title={t(
                            formTranslationKeys.otherPostoperativeComplications
                        )}
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
                                    formTranslationKeys.specifyOtherComplications
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

export default ParotidBenignGlandTherapy
