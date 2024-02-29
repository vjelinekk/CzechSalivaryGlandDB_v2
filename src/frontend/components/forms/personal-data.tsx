import React, { Dispatch, SetStateAction } from 'react'
import SimpleCheckboxes from './simple-checkboxes'
import ConditionalCheckboxes from './conditional-checkboxes'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import TextInput from './text-input'
import NumberInput from './number-input'
import PackYears from './pack-years'
import { PatientData } from '../../types'
import isCzechAlphabet from '../../utils/isCzechAlphabet'
import isPID from '../../utils/isPID'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'

interface PersonalDataProps {
    formData: PatientData | null
    setFormData: Dispatch<SetStateAction<PatientData | null>>
    setFormErrors: Dispatch<SetStateAction<string[]>>
}

const PersonalData: React.FC<PersonalDataProps> = ({
    formData,
    setFormData,
    setFormErrors,
}) => {
    return (
        <div className="sectionDiv">
            <h1>ANAMNESTICKÁ/PERSONÁLNÍ DATA</h1>
            <div className="subsectionDiv">
                <h2>Základní informace</h2>
                <TextInput
                    label="Jméno"
                    dbLabel="jmeno"
                    data={getDataFromPatientInterface(formData, 'jmeno')}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isCzechAlphabet}
                />
                <TextInput
                    label="Příjmení"
                    dbLabel="prijmeni"
                    data={getDataFromPatientInterface(formData, 'prijmeni')}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isCzechAlphabet}
                />
                <TextInput
                    label="Identifikační kód pacienta"
                    dbLabel="id_pacient"
                    data={getDataFromPatientInterface(formData, 'id_pacient')}
                    setFormData={setFormData}
                />
                <TextInput
                    label="RČ"
                    dbLabel="rodne_cislo"
                    data={getDataFromPatientInterface(formData, 'rodne_cislo')}
                    setFormData={setFormData}
                    setFormErrors={setFormErrors}
                    validation={isPID}
                />
                <NumberInput
                    label="Věk pacienta v době diagnózy"
                    dbLabel="vek_pri_diagnoze"
                    data={
                        getDataFromPatientInterface(
                            formData,
                            'vek_pri_diagnoze'
                        ) as number
                    }
                    setFormData={setFormData}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title="Pohlaví pacienta"
                    enableSingleSelect={true}
                    options={['Žena', 'Muž']}
                />
            </div>
            <div className="subsectionDiv">
                <SimpleCheckboxes
                    title="Demografické informace - kraj trvalého bydliště pacienta"
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
                />
            </div>
            <div className="subsectionDiv">
                <h2>Informace z OA</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    title="Jiné nádorové onemocnění v OA"
                >
                    <ConditionalCheckboxOption label="Ano">
                        <TextInput
                            label="Specifikace místa výskytu jiného karcinomu"
                            dbLabel="specifikace_mista_vyskytu_jineho_karcinomu"
                            data={getDataFromPatientInterface(
                                formData,
                                'specifikace_mista_vyskytu_jineho_karcinomu'
                            )}
                            setFormData={setFormData}
                        />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption label="Ne" />
                </ConditionalCheckboxes>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    title="Jiné onemocnění velkých slinných žláz v OA"
                >
                    <ConditionalCheckboxOption label="Ano">
                        <TextInput
                            label="Specifikace onemocnění:"
                            dbLabel="specifikace_onemocneni"
                            data={getDataFromPatientInterface(
                                formData,
                                'specifikace_onemocneni'
                            )}
                            setFormData={setFormData}
                        />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption label="Ne" />
                </ConditionalCheckboxes>
            </div>
            <div className="subsectionDiv">
                <h2>Přítomnost obecných rizikových faktorů</h2>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    title="Kouření"
                >
                    <ConditionalCheckboxOption label="Ano">
                        <PackYears />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption label="Ne" />
                    <ConditionalCheckboxOption label="Nezjištěno" />
                </ConditionalCheckboxes>
                <SimpleCheckboxes
                    title="Abusus alkoholu"
                    enableSingleSelect={true}
                    options={['Ano', 'Ne', 'Nezjištěno']}
                />
            </div>
        </div>
    )
}

export default PersonalData
