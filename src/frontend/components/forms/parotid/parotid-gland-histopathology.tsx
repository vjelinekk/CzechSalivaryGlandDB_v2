import React, { Dispatch, SetStateAction } from 'react'
import getDataFromPatientInterface from '../../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../../constants'
import { ParotidPatientData } from '../../../types'
import ConditionalCheckboxOption from '../conditional-checkbox-option'
import ConditionalCheckboxes from '../conditional-checkboxes'
import SimpleCheckboxes from '../simple-checkboxes'
import TextInput from '../text-input'
import NumberInput from '../number-input'

interface ParotidGlandHistopathologyProps {
    formData: ParotidPatientData | null
    setFormData: Dispatch<SetStateAction<ParotidPatientData | null>>
    setFormErrors: Dispatch<SetStateAction<string[]>>
    disabled: boolean
}

const ParotidGlandHistopathology: React.FC<ParotidGlandHistopathologyProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>HISTOPATOLOGIE</h1>
            <h2>Histologický typ nádoru</h2>
            <ConditionalCheckboxes
                dbLabel={dbLabels.histopatologie_vysledek}
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
                            dbLabels.mukoepidermoidni_karcinom_histopatologie
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
                            dbLabels.adenoidne_cysticky_karcinom_histopatologie
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
                            dbLabels.polymorfni_adenokarcinom_histopatologie
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
                        dbLabel={dbLabels.intraduktalni_karcinom_histopatologie}
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
                        dbLabel={dbLabels.salivarni_karcinom_nos_histopatologie}
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
                            dbLabels.karcinom_z_pleomorfniho_adenomu_histopatologie
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
                            dbLabels.spatne_diferencovany_karcinom_histopatologie
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
            <h2>Specifikace histologického typu</h2>
            <NumberInput
                label="Velikost nádoru - největší rozměr (cm)"
                dbLabel={dbLabels.velikost_nadoru_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <TextInput
                label="Velikost nádoru - nebyla určena (vysvětlit)"
                dbLabel={dbLabels.velikost_nadoru_neurcena_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_neurcena_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Okraj resekce"
                dbLabel={dbLabels.okraj_resekce_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['R0', 'R1']}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Lymfovaskulární invaze"
                dbLabel={dbLabels.lymfovaskularni_invaze_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['Ne', 'Ano']}
                disabled={disabled}
            />
            <SimpleCheckboxes
                title="Perineurální invaze"
                dbLabel={dbLabels.perineuralni_invaze_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={['Ne', 'Ano']}
                disabled={disabled}
            />
            <NumberInput
                label="Počet lymfatických uzlin s metastázou"
                dbLabel={
                    dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie
                }
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title="Extranodální šíření (ENE)"
                dbLabel={dbLabels.extranodalni_sireni_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label="Ne"
                    disabled={disabled}
                    setFormData={setFormData}
                ></ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Ano"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.extranodalni_sireni_vysledek_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={['ENEma (>2 mm)', 'ENEmi (≤2 mm)']}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>
            <ConditionalCheckboxes
                title="Prokázané vzdálené metastázy"
                dbLabel={dbLabels.prokazane_vzdalene_metastazy_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label="Ne"
                    disabled={disabled}
                    setFormData={setFormData}
                ></ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Ano"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <TextInput
                        label="Specifikace místa výskytu vzdálené metastázy"
                        dbLabel={
                            dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie
                        }
                        data={getDataFromPatientInterface(
                            formData,
                            dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie
                        )}
                        setFormData={setFormData}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>
        </div>
    )
}

export default ParotidGlandHistopathology
