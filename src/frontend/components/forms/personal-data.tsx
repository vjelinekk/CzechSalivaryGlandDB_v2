import React, { useState } from 'react'
import SimpleCheckboxes from './simple-checkboxes'
import ConditionalCheckboxes from './conditional-checkboxes'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import TextInput from './text-input'

const PersonalData = () => {
    const [showCarcinomaSpecification, setShowCarcinomaSpecification] =
        useState(false)

    const [showDiseaseSpecification, setShowDiseaseSpecification] =
        useState(false)

    const [showPackYearCount, setShowPackYearCount] = useState(false)

    return (
        <div className="sectionDiv">
            <h1>ANAMNESTICKÁ/PERSONÁLNÍ DATA</h1>
            <div className="subsectionDiv">
                <h2>Základní informace</h2>
                <TextInput label="Jméno" />
                <TextInput label="Příjmení" />
                <TextInput label="Identifikační kód pacienta" />
                <TextInput label="RČ" />
                <TextInput label="Věk pacienta v době diagnózy" />
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
                        <TextInput label="Specifikace místa výskytu jiného karcinomu" />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption label="Ne" />
                </ConditionalCheckboxes>
                <ConditionalCheckboxes
                    enableSingleSelect={true}
                    title="Jiné onemocnění velkých slinných žláz v OA"
                >
                    <ConditionalCheckboxOption label="Ano">
                        <TextInput label="Specifikace onemocnění:" />
                    </ConditionalCheckboxOption>
                    <ConditionalCheckboxOption label="Ne" />
                </ConditionalCheckboxes>
            </div>
            <div className="subsectionDiv">
                <h2>Přítomnost obecných rizikových faktorů</h2>
                <div className="conditionalCheckboxDiv">
                    <h3 className="conditionalCheckboxTitle">Kouření</h3>
                    <div className="optionalCheckboxOptionDiv">
                        <input
                            type="checkbox"
                            onClick={() =>
                                setShowPackYearCount(!showPackYearCount)
                            }
                        />
                        <p className="conditionalOptionLabel">Ano</p>
                    </div>
                    {showPackYearCount && (
                        <div className="nestedDiv">
                            <div className="textInputDiv">
                                <p>Počet cigaret denně:</p>
                                <input type="text" className="textInput" />
                            </div>
                            <div className="textInputDiv">
                                <p>Jak dlouho:</p>
                                <input type="text" className="textInput" />
                            </div>
                            <div className="textInputDiv">
                                <p>Počet balíčko roků:</p>
                                <input
                                    type="text"
                                    className="textInput"
                                    disabled
                                />
                            </div>
                        </div>
                    )}
                    <div className="optionalCheckboxOptionDiv">
                        <input type="checkbox" />
                        <p className="conditionalOptionLabel">Ne</p>
                    </div>
                    <div className="optionalCheckboxOptionDiv">
                        <input type="checkbox" />
                        <p className="conditionalOptionLabel">Nezjištěno</p>
                    </div>
                </div>
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
