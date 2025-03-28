import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'

const SubmandibularGlandTherapy: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    return (
        <div className="sectionDiv">
            <h1>TERAPIE</h1>
            <DatePicker
                label="Datum zahájení léčby"
                dbLabel={dbLabels.datum_zahajeni_lecby}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.datum_zahajeni_lecby
                )}
                setFormData={setFormData}
                disabled={disabled}
            />
            <ConditionalCheckboxes
                title="Typ terapie"
                data={formData}
                dbLabel={dbLabels.typ_terapie}
                setFormData={setFormData}
                enableSingleSelect={true}
                disabled={disabled}
            >
                <ConditionalCheckboxOption
                    label="Chirurgická"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title="Rozsah chirurgické léčby"
                        data={formData}
                        dbLabel={dbLabels.rozsah_chirurgicke_lecby}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            'Peroorální exstirpace',
                            'Zevní exstirpace',
                            'Jiná',
                        ]}
                    />
                    <ConditionalCheckboxes
                        title="Bloková krční disekce"
                        data={formData}
                        dbLabel={dbLabels.blokova_krcni_disekce}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label="Ano"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <SimpleCheckboxes
                                title="Strana blokové krční disekce"
                                data={formData}
                                dbLabel={dbLabels.strana_blokove_krcni_disekce}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                disabled={disabled}
                                options={['stejnostranná', 'oboustranná']}
                            />
                            <SimpleCheckboxes
                                title="Typ ND"
                                data={formData}
                                dbLabel={dbLabels.typ_nd}
                                setFormData={setFormData}
                                enableSingleSelect={true}
                                disabled={disabled}
                                options={[
                                    'Elektivní (cN0)',
                                    'Terapeutická (cN+)',
                                ]}
                            />
                            <SimpleCheckboxes
                                title="Rozsah ND"
                                data={formData}
                                dbLabel={dbLabels.rozsah_nd}
                                setFormData={setFormData}
                                enableSingleSelect={false}
                                disabled={disabled}
                                options={[
                                    'IA',
                                    'IB',
                                    'IIA',
                                    'IIB',
                                    'III',
                                    'IV',
                                    'V',
                                    'VA',
                                    'VB',
                                    'VI',
                                    'Rozsah nespecifikován',
                                ]}
                            />
                        </ConditionalCheckboxOption>
                        <ConditionalCheckboxOption
                            label="Ne"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                    </ConditionalCheckboxes>
                    <SimpleCheckboxes
                        title="Funkce n. VII dle H-B (pooperačně)"
                        data={formData}
                        dbLabel={dbLabels.funkce_n_vii_dle_h_b_pooperacne}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    />
                    <SimpleCheckboxes
                        title="Adjuvantní terapie"
                        data={formData}
                        dbLabel={dbLabels.adjuvantni_terapie}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={[
                            'RT',
                            'CHRT',
                            'CH',
                            'Protonová terapie',
                            'Nebyla indikována',
                        ]}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Nechirurgická"
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        title="Typ nechirurgické terapie - onkologická léčba"
                        data={formData}
                        dbLabel={dbLabels.typ_nechirurgicke_terapie}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['RT', 'CHRT', 'CH', 'Protonová terapie']}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label="Nebyla indikována"
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default SubmandibularGlandTherapy
