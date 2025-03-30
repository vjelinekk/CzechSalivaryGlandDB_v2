import React from 'react'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import DatePicker from './date-picker'

const DispensarizationBenign: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>DISPENZARIZACE</h1>
            <DatePicker
                label="Datum první kontroly po léčbě"
                dbLabel={dbLabels.datum_prvni_kontroly_po_lecbe}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_prvni_kontroly_po_lecbe
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title="Doporučeno další sledování"
                data={formData}
                dbLabel={dbLabels.doporuceno_dalsi_sledovani}
                enableSingleSelect={true}
                setFormData={setFormData}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label="Ano"
                    setFormData={setFormData}
                    disabled={disabled}
                >
                    <ConditionalCheckboxes
                        title="Perzistence"
                        data={formData}
                        dbLabel={dbLabels.perzistence}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label="Ano"
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label="Datum prokázání perzistence"
                                dbLabel={dbLabels.datum_prokazani_perzistence}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_prokazani_perzistence
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="Ne"
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="Neznámo"
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>

                    <ConditionalCheckboxes
                        title="Recidiva"
                        data={formData}
                        dbLabel={dbLabels.recidiva}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label="Ano"
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label="Datum prokázání recidivy"
                                dbLabel={dbLabels.datum_prokazani_recidivy}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_prokazani_recidivy
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="Ne"
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                        <ConditionalCheckboxOption
                            label="Neznámo"
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                    <ConditionalCheckboxes
                        title="Stav"
                        data={formData}
                        dbLabel={dbLabels.stav}
                        enableSingleSelect={true}
                        setFormData={setFormData}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label="Žije"
                            setFormData={setFormData}
                            disabled={disabled}
                        ></ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="Zemřel"
                            setFormData={setFormData}
                            disabled={disabled}
                        >
                            <DatePicker
                                label="Datum úmrtí (pokud je dostupné)"
                                dbLabel={dbLabels.datum_umrti}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.datum_umrti
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="Neznámo"
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>

                <ConditionalCheckboxOption
                    label="Ne"
                    setFormData={setFormData}
                    disabled={disabled}
                />
            </ConditionalCheckboxes>
            <h2>Kontroly</h2>
            <DatePicker
                label="Datum poslední kontroly"
                dbLabel={dbLabels.posledni_kontrola}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.posledni_kontrola
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <DatePicker
                label="Datum plánované kontroly"
                dbLabel={dbLabels.planovana_kontrola}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.planovana_kontrola
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
        </div>
    )
}

export default DispensarizationBenign
