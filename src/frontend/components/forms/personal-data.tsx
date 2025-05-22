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
import { formTranslationKeys } from '../../translations'

const PersonalData: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    setFormErrors,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.anamnesticPersonalData)}</h1>
            <div className="subsectionDiv">
                <h2>{t(formTranslationKeys.basicInformation)}</h2>
                <TextInput
                    label={t(formTranslationKeys.firstName)}
                    dbLabel={dbLabels.jmeno}
                    data={getDataFromPatientInterface(formData, dbLabels.jmeno)}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isValidName}
                    disabled={disabled}
                />
                <TextInput
                    label={t(formTranslationKeys.surname)}
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
                    label={t(formTranslationKeys.patientId)}
                    dbLabel={dbLabels.id_pacient}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.id_pacient
                    )}
                    setFormData={setFormData}
                    disabled={disabled}
                />
                <TextInput
                    label={t(formTranslationKeys.birthNumberNoSlash)}
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
                    label={t(formTranslationKeys.ageAtDiagnosis)}
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
                    title={t(formTranslationKeys.patientGender)}
                    dbLabel={dbLabels.pohlavi}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[
                        t(formTranslationKeys.female),
                        t(formTranslationKeys.male),
                    ]}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title={t(
                        formTranslationKeys.demographicInfoResidencyRegion
                    )}
                    dbLabel={dbLabels.kraj}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[
                        t(formTranslationKeys.prague),
                        t(formTranslationKeys.centralBohemianRegion),
                        t(formTranslationKeys.southBohemianRegion),
                        t(formTranslationKeys.pilsenRegion),
                        t(formTranslationKeys.karlovyVaryRegion),
                        t(formTranslationKeys.usteckyRegion),
                        t(formTranslationKeys.liberecRegion),
                        t(formTranslationKeys.hradecKraloveRegion),
                        t(formTranslationKeys.pardubiceRegion),
                        t(formTranslationKeys.vysocinaRegion),
                        t(formTranslationKeys.southMoravianRegion),
                        t(formTranslationKeys.zlinRegion),
                        t(formTranslationKeys.olomoucRegion),
                        t(formTranslationKeys.moravianSilesianRegion),
                    ]}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <h2>{t(formTranslationKeys.informationFromOa)}</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.jine_nadorove_onemocneni_v_oa}
                    data={formData}
                    setFormData={setFormData}
                    title={t(formTranslationKeys.otherCancerInOa)}
                >
                    <ConditionalCheckboxOption
                        label={t(formTranslationKeys.yes)}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label={t(
                                formTranslationKeys.specifyOtherCancerLocation
                            )}
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
                        label={t(formTranslationKeys.no)}
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
                    title={t(formTranslationKeys.otherSalivaryGlandDiseaseInOa)}
                >
                    <ConditionalCheckboxOption
                        label={t(formTranslationKeys.yes)}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label={t(formTranslationKeys.specifyDisease)}
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
                        label={t(formTranslationKeys.no)}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
            </div>
            <div className="subsectionDiv">
                <h2>{t(formTranslationKeys.presenceOfGeneralRiskFactors)}</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.koureni}
                    data={formData}
                    setFormData={setFormData}
                    title={t(formTranslationKeys.smoking)}
                >
                    <ConditionalCheckboxOption
                        label={t(formTranslationKeys.yes)}
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <NumberInput
                            label={t(formTranslationKeys.cigarettesPerDay)}
                            dbLabel={dbLabels.pocet_cigaret_denne}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.pocet_cigaret_denne
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label={t(formTranslationKeys.howLongYears)}
                            dbLabel={dbLabels.jak_dlouho_kouri}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.jak_dlouho_kouri
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label={t(formTranslationKeys.packYears)}
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
                        label={t(formTranslationKeys.no)}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                    <ConditionalCheckboxOption
                        label={t(formTranslationKeys.unknown)}
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
                <SimpleCheckboxes
                    title={t(formTranslationKeys.alcoholAbuse)}
                    dbLabel={dbLabels.abusus_alkoholu}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[
                        t(formTranslationKeys.yes),
                        t(formTranslationKeys.no),
                        t(formTranslationKeys.unknown),
                    ]}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default PersonalData
