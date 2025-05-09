import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../../../translations'

const SublingualMalignantGlandTherapy: React.FC<GlandComponentProps> = ({
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
                        title={t(formTranslationKeys.surgicalTreatmentScope)}
                        data={formData}
                        dbLabel={dbLabels.rozsah_chirurgicke_lecby}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            t(formTranslationKeys.peroralExstirpation),
                            t(formTranslationKeys.externalExstirpation),
                            t(formTranslationKeys.other),
                        ]}
                    />
                    <ConditionalCheckboxes
                        title={t(formTranslationKeys.blockNeckDissection)}
                        data={formData}
                        dbLabel={dbLabels.blokova_krcni_disekce}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.yes)}
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                title={t(formTranslationKeys.blockNeckDissectionSide)}
                                data={formData}
                                dbLabel={dbLabels.strana_blokove_krcni_disekce}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                disabled={disabled}
                                options={[t(formTranslationKeys.sameSide), t(formTranslationKeys.twoSided)]}
                            />
                            <SimpleCheckboxes
                                title={t(formTranslationKeys.ndType)}
                                data={formData}
                                dbLabel={dbLabels.typ_nd}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                disabled={disabled}
                                options={[
                                    t(formTranslationKeys.electiveCN0),
                                    t('therapeutic-cN+'),
                                ]}
                            />
                            <SimpleCheckboxes
                                title={t(formTranslationKeys.ndScope)}
                                data={formData}
                                dbLabel={dbLabels.rozsah_nd}
                                setFormData={setFormData}
                                enableSingleSelect={false}
                                disabled={disabled}
                                options={[
                                    t(formTranslationKeys.ia),
                                    t(formTranslationKeys.ib),
                                    t(formTranslationKeys.iia),
                                    t(formTranslationKeys.iib),
                                    t(formTranslationKeys.iii),
                                    t(formTranslationKeys.iv),
                                    t(formTranslationKeys.v),
                                    t(formTranslationKeys.va),
                                    t(formTranslationKeys.vb),
                                    t(formTranslationKeys.vi),
                                    t(formTranslationKeys.scopeUndefined),
                                ]}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label={t(formTranslationKeys.no)}
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                    </ConditionalCheckboxes>
                    <SimpleCheckboxes
                        title={t(formTranslationKeys.adjuvantTherapy)}
                        data={formData}
                        dbLabel={dbLabels.adjuvantni_terapie}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            t(formTranslationKeys.rt),
                            t(formTranslationKeys.chrt),
                            t(formTranslationKeys.ch),
                            t(formTranslationKeys.protonTherapy),
                            t(formTranslationKeys.notIndicated),
                        ]}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.nonSurgical)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title={t(formTranslationKeys.nonSurgicalTherapyOncologicalTreatment)}
                        data={formData}
                        dbLabel={dbLabels.typ_nechirurgicke_terapie}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            t(formTranslationKeys.rt),
                            t(formTranslationKeys.chrt),
                            t(formTranslationKeys.ch),
                            t(formTranslationKeys.protonTherapy),
                        ]}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.notIndicated)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default SublingualMalignantGlandTherapy
