import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'

const SubmandibularMalignantGlandDiagnosis: React.FC<GlandComponentProps> = ({
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
                title="Diagnóza (MKN-10):"
                dbLabel={dbLabels.diagnoza_mkn_10}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['C080']}
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
                            label="acinocelulární karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sekretorický karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mukoepidermoidní karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
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
                            setFormData={setFormData}
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
                            setFormData={setFormData}
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
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="hyalinizující karcinom ze světlých buněk"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="bazocelulární adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sebaceózní adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="intraduktální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
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
                            setFormData={setFormData}
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
                        <ConditionalCheckboxOption
                            label="salivární duktální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="myoepiteliální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="karcinom z pleomorfního adenomu"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.karcinom_z_pleomorfniho_adenomu_core
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'intrakapsulární',
                                    'minimálně invazivní',
                                    'invazivní',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="karcinosarkom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.spatne_diferencovany_karcinom_core
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'nediferencovaný karcinom',
                                    'velkobuněčný neuroendokrinní karcinom',
                                    'malobuněčný neuroendokrinní karcinom',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="lymfoepiteliální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="skvamocelulární karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mikrosekretorický adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sklerózující mikrocystický adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mucinózní adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="asialoblastom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="MALT-lymfom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="jiné"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
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
                            label="acinocelulární karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sekretorický karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mukoepidermoidní karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.mukoepidermoidni_karcinom_otevrena
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
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.adenoidne_cysticky_karcinom_otevrena
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
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.polymorfni_adenokarcinom_otevrena
                                }
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
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="hyalinizující karcinom ze světlých buněk"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="bazocelulární adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sebaceózní adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="intraduktální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.intraduktalni_karcinom_otevrena
                                }
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
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.salivarni_karcinom_nos_otevrena
                                }
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
                        <ConditionalCheckboxOption
                            label="salivární duktální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="myoepiteliální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="karcinom z pleomorfního adenomu"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.karcinom_z_pleomorfniho_adenomu_otevrena
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'intrakapsulární',
                                    'minimálně invazivní',
                                    'invazivní',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="karcinosarkom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                dbLabel={
                                    dbLabels.spatne_diferencovany_karcinom_otevrena
                                }
                                data={formData}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                options={[
                                    'nediferencovaný karcinom',
                                    'velkobuněčný neuroendokrinní karcinom',
                                    'malobuněčný neuroendokrinní karcinom',
                                    'subtyp nebyl určen',
                                ]}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="lymfoepiteliální karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="skvamocelulární karcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mikrosekretorický adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="sklerózující mikrocystický adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="mucinózní adenokarcinom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="asialoblastom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="MALT-lymfom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="MALT-lymfom"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
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

export default SubmandibularMalignantGlandDiagnosis
