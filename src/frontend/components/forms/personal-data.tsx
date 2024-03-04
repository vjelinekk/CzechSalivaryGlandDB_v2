import React, { Dispatch, SetStateAction } from 'react'
import SimpleCheckboxes from './simple-checkboxes'
import ConditionalCheckboxes from './conditional-checkboxes'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import TextInput from './text-input'
import NumberInput from './number-input'
import { PatientData } from '../../types'
import isCzechAlphabet from '../../utils/isCzechAlphabet'
import isPID from '../../utils/isPID'
import calculatePackYears from '../../utils/calculatePackYears'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../constants'

interface PersonalDataProps {
    formData: PatientData | null
    setFormData: Dispatch<SetStateAction<PatientData | null>>
    setFormErrors: Dispatch<SetStateAction<string[]>>
    disabled: boolean
}

const PersonalData: React.FC<PersonalDataProps> = ({
    formData,
    setFormData,
    setFormErrors,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>ANAMNESTICKÁ/PERSONÁLNÍ DATA</h1>
            <div className="subsectionDiv">
                <h2>Základní informace</h2>
                <TextInput
                    label="Jméno"
                    dbLabel={dbLabels.jmeno}
                    data={getDataFromPatientInterface(formData, dbLabels.jmeno)}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isCzechAlphabet}
                    disabled={disabled}
                />
                <TextInput
                    label="Příjmení"
                    dbLabel={dbLabels.prijmeni}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.prijmeni
                    )}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isCzechAlphabet}
                    disabled={disabled}
                />
                <TextInput
                    label="Identifikační kód pacienta"
                    dbLabel={dbLabels.id_pacient}
                    data={getDataFromPatientInterface(
                        formData,
                        dbLabels.id_pacient
                    )}
                    setFormData={setFormData}
                    disabled={disabled}
                />
                <TextInput
                    label="RČ"
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
                    label="Věk pacienta v době diagnózy"
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
                    title="Pohlaví pacienta"
                    dbLabel={dbLabels.pohlavi}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={['Žena', 'Muž']}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title="Demografické informace - kraj trvalého bydliště pacienta"
                    dbLabel={dbLabels.kraj}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={[
                        'Hlavní město Praha',
                        'Středočeský kraj',
                        'Jihočeský kraj',
                        'Plzeňský kraj',
                        'Karlovarský kraj',
                        'Ústecký kraj',
                        'Liberecký kraj',
                        'Královéhradecký kraj',
                        'Pardubický kraj',
                        'Kraj Vysočina',
                        'Jihomoravský kraj',
                        'Zlínský kraj',
                        'Olomoucký kraj',
                        'Moravskoslezský kraj',
                    ]}
                    disabled={disabled}
                />
            </div>
            <div className="subsectionDiv">
                <h2>Informace z OA</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.jine_nadorove_onemocneni_v_oa}
                    data={formData}
                    setFormData={setFormData}
                    title="Jiné nádorové onemocnění v OA"
                >
                    <ConditionalCheckboxOption
                        label="Ano"
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label="Specifikace místa výskytu jiného karcinomu"
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
                        label="Ne"
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
                    title="Jiné onemocnění velkých slinných žláz v OA"
                >
                    <ConditionalCheckboxOption
                        label="Ano"
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <TextInput
                            label="Specifikace onemocnění:"
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
                        label="Ne"
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
            </div>
            <div className="subsectionDiv">
                <h2>Přítomnost obecných rizikových faktorů</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    dbLabel={dbLabels.koureni}
                    data={formData}
                    setFormData={setFormData}
                    title="Kouření"
                >
                    <ConditionalCheckboxOption
                        label="Ano"
                        disabled={disabled}
                        setFormData={setFormData}
                    >
                        <NumberInput
                            label="Počet cigaret denně"
                            dbLabel={dbLabels.pocet_cigaret_denne}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.pocet_cigaret_denne
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label="Jak dlouho (roky)"
                            dbLabel={dbLabels.jak_dlouho_kouri}
                            data={getDataFromPatientInterface(
                                formData,
                                dbLabels.jak_dlouho_kouri
                            )}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <NumberInput
                            label="Počet balíčko roků"
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
                        label="Ne"
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                    <ConditionalCheckboxOption
                        label="Nezjištěno"
                        disabled={disabled}
                        setFormData={setFormData}
                    />
                </ConditionalCheckboxes>
                <SimpleCheckboxes
                    title="Abusus alkoholu"
                    dbLabel={dbLabels.abusus_alkoholu}
                    data={formData}
                    setFormData={setFormData}
                    enableSingleSelect={true}
                    options={['Ano', 'Ne', 'Nezjištěno']}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default PersonalData
