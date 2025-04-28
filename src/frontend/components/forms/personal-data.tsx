import React from 'react'
import { useTranslation } from 'react-i18next'
import SimpleCheckboxes from './simple-checkboxes'
import ConditionalCheckboxes from './conditional-checkboxes'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import TextInput from './text-input'
import NumberInput from './number-input'
import { GlandComponentProps } from '../../types'
import isValidName from '../../utils/isValidName'
import isPID from '../../utils/isPID'
import calculatePackYears from '../../utils/calculatePackYears'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../constants'

const PersonalData: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    setFormErrors,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t('anamnestic-personal-data')}</h1>
            <div className="subsectionDiv">
                <h2>{t('basic-information')}</h2>
                <TextInput
                    label={t('first-name')}
                    dbLabel={dbLabels.jmeno}
                    data={getDataFromPatientInterface(formData, dbLabels.jmeno)}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isValidName}
                    disabled={disabled}
                />
                <TextInput
                    label={t('surname')}
                    dbLabel={dbLabels.prijmeni}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.prijmeni
                    )}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isValidName}
                    disabled={disabled}
                />
                <TextInput
                    label={t('patient-id')}
                    dbLabel={dbLabels.id_pacient}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.id_pacient
                    )}
                    setFormData={setFormData}
                    disabled={disabled}
                />
                <TextInput
                    label={t('birth-number-no-slash')}
                    dbLabel={dbLabels.rodne_cislo}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.rodne_cislo
                    )}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isPID}
                    disabled={disabled}
                />
                <NumberInput
                    label={t('age-at-diagnosis')}
                    dbLabel={dbLabels.vek_pri_diagnoze}
                    data={
                        getDataFromPatientInterface(
                            formData,
                            dbLabels.vek_pri_diagnoze
                        ) as number
                    }
                    setFormData={setFormData}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title={t('patient-gender')}
                    dbLabel={dbLabels.pohlavi}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[t('female'), t('male')]}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title={t('demographic-info-residency-region')}
                    dbLabel={dbLabels.kraj}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[
                        t('prague'),
                        t('central-bohemian-region'),
                        t('south-bohemian-region'),
                        t('pilsen-region'),
                        t('karlovy-vary-region'),
                        t('ustecky-region'),
                        t('liberec-region'),
                        t('hradec-kralove-region'),
                        t('pardubice-region'),
                        t('vysocina-region'),
                        t('south-moravian-region'),
                        t('zlin-region'),
                        t('olomouc-region'),
                        t('moravian-silesian-region'),
                    ]}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <h2>{t('information-from-oa')}</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.jine_nadorove_onemocneni_v_oa}
                    data={formData}
                    setFormData={setFormData}
                    title={t('other-cancer-in-oa')}
                >
                    <ConditionalCheckboxOption
                        label={t('yes')}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label={t('specify-other-cancer-location')}
                            dbLabel={
                                dbLabels.specifikace_mista_vyskytu_jineho_karcinomu
                            }
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.specifikace_mista_vyskytu_jineho_karcinomu
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption
                        label={t('no')}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={
                        dbLabels.jine_onemocneni_velkych_slinnych_zlaz_v_oa
                    }
                    data={formData}
                    setFormData={setFormData}
                    title={t('other-salivary-gland-disease-in-oa')}
                >
                    <ConditionalCheckboxOption
                        label={t('yes')}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label={t('specify-disease')}
                            dbLabel={dbLabels.specifikace_onemocneni}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.specifikace_onemocneni
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption
                        label={t('no')}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
            </div>
            <div className="subsectionDiv">
                <h2>{t('presence-of-general-risk-factors')}</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.koureni}
                    data={formData}
                    setFormData={setFormData}
                    title={t('smoking')}
                >
                    <ConditionalCheckboxOption
                        label={t('yes')}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <NumberInput
                            label={t('cigarettes-per-day')}
                            dbLabel={dbLabels.pocet_cigaret_denne}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.pocet_cigaret_denne
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label={t('how-long-years')}
                            dbLabel={dbLabels.jak_dlouho_kouri}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.jak_dlouho_kouri
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label={t('pack-years')}
                            dbLabel={dbLabels.pocet_balickoroku}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.pocet_balickoroku
                            )}
                            calculateFrom={[
                                dbLabels.pocet_cigaret_denne,
                                dbLabels.jak_dlouho_kouri,
                            ]}
                            calculate={() => calculatePackYears(formData)}
                            formData={formData}
                            setFormData={setFormData}
                            disabled={true}
                        />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption
                        label={t('no')}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                    <ConditionalCheckboxOption
                        label={t('unknown')}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
                <SimpleCheckboxes
                    title={t('alcohol-abuse')}
                    dbLabel={dbLabels.abusus_alkoholu}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[t('yes'), t('no'), t('unknown')]}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default PersonalData
