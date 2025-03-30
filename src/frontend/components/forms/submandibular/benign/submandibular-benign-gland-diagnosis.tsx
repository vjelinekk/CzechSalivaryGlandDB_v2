import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'
import TextInput from '../../text-input'

const SubmandibularBenignGlandDiagnosis: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>DIAGNOSTIKA</h1>
            <DatePicker
                label="Rok diagnózy"
                dbLabel={dbLabels.rok_diagnozy}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.rok_diagnozy
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Strana nálezu"
                dbLabel={dbLabels.strana_nalezu}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['Vpravo', 'Vlevo', 'Oboustranně']}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Funkce n. VII dle H-B (předoperačně)"
                dbLabel={dbLabels.funkce_n_vii_dle_h_b_predoperacne}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Použité diagnostické metody"
                dbLabel={dbLabels.diagnosticke_metody}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={false}
                options={[
                    'UZ',
                    'CT',
                    'MRI',
                    'PET/CT',
                    'PET/MR',
                    'Zobrazovací vyšetření nebylo provedeno',
                ]}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title="FNAB"
                dbLabel={dbLabels.fnab}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label="Ano"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title="Výsledek FNAB (cytopatologická klasifikace tumorů dle MSRSGC)"
                        dbLabel={dbLabels.vysledek_fnab}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            'I nediagnostická',
                            'II nenádorová',
                            'III atypie neurčeného významu',
                            'IVa nádor benigní',
                            'IVb nádor nejasného maligního potenciálu',
                            'V nádor suspektní z malignity',
                            'VI nádor maligní',
                        ]}
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
                title="CORE biopsie"
                dbLabel={dbLabels.core_biopsie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label="Ano"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <ConditionalCheckboxes
                        title="Výsledek CORE biopsie"
                        dbLabel={dbLabels.core_vysledek}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                    >
                        <ConditionalCheckboxOption
                            label="pleomorfní adenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="pleomorfní adenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="papilární cystadenolymfom (Warthinův tumor)"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="bazocelulární adenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="myoepiteliom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />            
                        <ConditionalCheckboxOption
                            label="onkocytom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="kanalikulární adenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sebaceózní adenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="duktální papilom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="debaceózní lymfadenom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="keratocystom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="jiné"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <TextInput
                                label="Specifikace histologického typu"
                                dbLabel={dbLabels.jine_pooperacni_komplikace} // TODO: fix this in database
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.jine_pooperacni_komplikace // TODO: fix this in database
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Ne"
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
            <ConditionalCheckboxes
                title="Otevřená biopsie"
                dbLabel={dbLabels.otevrena_biopsie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label="Ano"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <ConditionalCheckboxes
                        title="Výsledek CORE biopsie"
                        dbLabel={dbLabels.otevrena_vysledek}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                    >
                <ConditionalCheckboxOption
                    label="pleomorfní adenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="pleomorfní adenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="papilární cystadenolymfom (Warthinův tumor)"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="bazocelulární adenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="myoepiteliom"
                    disabled={disabled}
                    setFormData={setFormData}
                />            
                <ConditionalCheckboxOption
                    label="onkocytom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="kanalikulární adenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="sebaceózní adenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="duktální papilom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="debaceózní lymfadenom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="keratocystom"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="jiné"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <TextInput
                        label="Specifikace histologického typu"
                        dbLabel={dbLabels.jine_pooperacni_komplikace} // TODO: fix this in database
                        data={getDataFromPatientInterface(
                            formData,
                            dbLabels.jine_pooperacni_komplikace // TODO: fix this in database
                        )}
                        setFormData={setFormData}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Ne"
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default SubmandibularBenignGlandDiagnosis
