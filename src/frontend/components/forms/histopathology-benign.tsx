import React from 'react'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import SimpleCheckboxes from './simple-checkboxes'
import TextInput from './text-input'
import NumberInput from './number-input'

const HistopathologyBenign: React.FC<GlandComponentProps> = ({
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
            <h2>Specifikace histologického typu</h2>
            <NumberInput
                label="Velikost nádoru - největší rozměr (mm)"
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
        </div>
    )
}

export default HistopathologyBenign
