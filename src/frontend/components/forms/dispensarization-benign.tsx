import React from 'react'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import DatePicker from './date-picker'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../translations'

const DispensarizationBenign: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.dispensarizationTitle)}</h1>
            <DatePicker
                label={t(formTranslationKeys.dateFirstControl)}
                dbLabel={dbLabels.datum_prvni_kontroly_po_lecbe}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_prvni_kontroly_po_lecbe
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title={t(formTranslationKeys.recommendedFollowUp)}
                data={formData}
                dbLabel={dbLabels.doporuceno_dalsi_sledovani}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.yes)}
                    setFormData={setFormData}
                    disabled={disabled}
                >
                    <ConditionalCheckboxes
                        title={t(formTranslationKeys.persistence)}
                        data={formData}
                        dbLabel={dbLabels.perzistence}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.yes)}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t(formTranslationKeys.datePersistence)}
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
                            label={t(formTranslationKeys.no)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.unknown)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>

                    <ConditionalCheckboxes
                        title={t(formTranslationKeys.recurrence)}
                        data={formData}
                        dbLabel={dbLabels.recidiva}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.yes)}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t(formTranslationKeys.dateRecurrence)}
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
                            label={t(formTranslationKeys.no)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.unknown)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                    <ConditionalCheckboxes
                        title={t(formTranslationKeys.status)}
                        data={formData}
                        dbLabel={dbLabels.stav}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.alive)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        />
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.deceased)}
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label={t(formTranslationKeys.deceasedDate)}
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
                            label={t(formTranslationKeys.unknown)}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>

                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.no)}
                    setFormData={setFormData}
                    disabled={disabled}
                />
            </ConditionalCheckboxes>
            <h2>{t(formTranslationKeys.controls)}</h2>
            <DatePicker
                label={t(formTranslationKeys.lastCheckupDate)}
                dbLabel={dbLabels.posledni_kontrola}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.posledni_kontrola
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <DatePicker
                label={t(formTranslationKeys.scheduledCheckupDate)}
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
