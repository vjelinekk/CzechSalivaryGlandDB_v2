import React from 'react'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import DatePicker from './date-picker'
import { useTranslation } from 'react-i18next'

const DispensarizationBenign: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t('dispensarization-title')}</h1>
            <DatePicker
                label={t('date-first-control')}
                dbLabel={dbLabels.datum_prvni_kontroly_po_lecbe}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_prvni_kontroly_po_lecbe
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title={t('recommended-follow-up')}
                data={formData}
                dbLabel={dbLabels.doporuceno_dalsi_sledovani}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label={t('yes')}
                    setFormData={setFormData}
                    disabled={disabled}
                >
                    <ConditionalCheckboxes
                        title={t('persistence')}
                        data={formData}
                        dbLabel={dbLabels.perzistence}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t('yes')}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t('date-persistence')}
                                dbLabel={dbLabels.datum_prokazani_perzistence}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_prokazani_perzistence
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label={t('no')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label={t('unknown')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>

                    <ConditionalCheckboxes
                        title={t('recurrence')}
                        data={formData}
                        dbLabel={dbLabels.recidiva}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t('yes')}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t('date-recurrence')}
                                dbLabel={dbLabels.datum_prokazani_recidivy}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_prokazani_recidivy
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label={t('no')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label={t('unknown')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                    <ConditionalCheckboxes
                        title={t('status')}
                        data={formData}
                        dbLabel={dbLabels.stav}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t('alive')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label={t('deceased')}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t('deceased-date')}
                                dbLabel={dbLabels.datum_umrti}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_umrti
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label={t('unknown')}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>

                <ConditionalCheckboxOption
                    label={t('no')}
                    setFormData={setFormData}
                    disabled={disabled}
                />
            </ConditionalCheckboxes>
            <h2>{t('controls')}</h2>
            <DatePicker
                label={t('last-checkup-date')}
                dbLabel={dbLabels.posledni_kontrola}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.posledni_kontrola
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <DatePicker
                label={t('scheduled-checkup-date')}
                dbLabel={dbLabels.planovana_kontrola}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.planovana_kontrola
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
        </div>
    )
}

export default DispensarizationBenign
