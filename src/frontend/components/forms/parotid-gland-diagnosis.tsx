import React, { Dispatch, SetStateAction } from 'react'
import { ParotidPatientData } from '../../types'
import { dbLabels } from '../../constants'
import DatePicker from './date-picker'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import SimpleCheckboxes from './simple-checkboxes'
import ConditionalCheckboxes from './conditional-checkboxes'
import ConditionalCheckboxOption from './conditional-checkbox-option'

interface ParotidGlandDiagnosisProps {
    formData: ParotidPatientData | null
    setFormData: Dispatch<SetStateAction<ParotidPatientData | null>>
    setFormErrors: Dispatch<SetStateAction<string[]>>
    disabled: boolean
}

const ParotidGlandDiagnosis: React.FC<ParotidGlandDiagnosisProps> = ({
    formData,
    setFormData,
    setFormErrors,
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
                title="Diagnóza (MKN-10):"
                dbLabel={dbLabels.diagnoza_mkn_10}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['C07']}
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
                <ConditionalCheckboxOption label="Ano" disabled={disabled}>
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
                <ConditionalCheckboxOption label="Ne" disabled={disabled} />
            </ConditionalCheckboxes>
            <ConditionalCheckboxes
                title="CORE biopsie"
                dbLabel={dbLabels.core_biopsie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption label="Ano" disabled={disabled}>
                    <ConditionalCheckboxes
                        title="Výsledek CORE biopsie"
                        dbLabel={dbLabels.core_vysledek}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                    >
                        <ConditionalCheckboxOption
                            label="acinocelulární karcinom"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="sekretorický karcinom"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="mukoepidermoidní karcinom"
                            disabled={disabled}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.mukoepidermoidni_karcinom_core
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'low grade',
                                    'intermediate grade',
                                    'high grade',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="adenoidně cystický karcinom"
                            disabled={disabled}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.adenoidne_cysticky_karcinom_core
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    's převahou tubulární/kribriformní složky',
                                    '>30% solidní složky',
                                    'high grade',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="polymorfní adenokarcinom"
                            disabled={disabled}
                        >
                            <SimpleCheckboxes
                                dbLabel={dbLabels.polymorfni_adenokarcinom_core}
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'klasický',
                                    'kribriformní',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="epiteliální myoepiteliální karcinom"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="hyalinizující karcinom ze světlých buněk"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="bazocelulární adenokarcinom"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="sebaceózní adenokarcinom"
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="intraduktální karcinom"
                            disabled={disabled}
                        >
                            <SimpleCheckboxes
                                dbLabel={dbLabels.intraduktalni_karcinom_core}
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'podobný vmezeřenému vývodu',
                                    'apokrinní',
                                    'onkocytární',
                                    'smíšený',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="salivární karcinom NOS"
                            disabled={disabled}
                        >
                            <SimpleCheckboxes
                                dbLabel={dbLabels.salivarni_karcinom_nos_core}
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'onkocytární adenokarcinom',
                                    'adenokarcinom intestinálního typu',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label="Ne" disabled={disabled} />
            </ConditionalCheckboxes>
        </div>
    )
}

export default ParotidGlandDiagnosis
