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

const ParotidBenignGlandTherapy: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t('therapy')}</h1>
            <DatePicker
                label={t('treatment-start-date')}
                dbLabel={dbLabels.datum_zahajeni_lecby}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_zahajeni_lecby
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <i>{t('note-surgical-treatment')}</i>
            <ConditionalCheckboxes
                title={t('therapy-type')}
                data={formData}
                dbLabel={dbLabels.typ_terapie}
                setFormData={setFormData}
                enableSingleSelect={true}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label={t('surgical')}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title={t('surgical-scope')}
                        data={formData}
                        dbLabel={dbLabels.rozsah_chirurgicke_lecby}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            t('parotidectomy-i-iv'),
                            t('parotidectomy-i-iv-vii'),
                            t('parotidectomy-i-iv-vii-s-mm'),
                            t('parotidectomy-i-ii-pes'),
                            t('parotidectomy-iii-iv'),
                            t('parotidectomy-i'),
                            t('parotidectomy-ii'),
                            t('parotidectomy-i-ii-iii'),
                            t('parotidectomy-v'),
                            t('ecd-i'),
                            t('ecd-ii'),
                            t('ecd-v'),
                        ]}
                    />
                    <SimpleCheckboxes
                        title={t('n-vii-function-hb-postoperative')}
                        data={formData}
                        dbLabel={dbLabels.funkce_n_vii_dle_h_b_pooperacne}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    />
                    <ConditionalCheckboxes
                        title={t('other-postoperative-complications')}
                        data={formData}
                        dbLabel={dbLabels.pooperacni_komplikace}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t('none')}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t('freys-syndrome')}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t('salivary-fistula')}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label={t('other')}
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <TextInput
                                label={t('specify-other-complications')}
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
                    label={t('non-surgical-monitoring')}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t('not-indicated')}
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default ParotidBenignGlandTherapy
