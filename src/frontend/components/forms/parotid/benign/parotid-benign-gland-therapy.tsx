import React from 'react'
import { dbLabels } from '../../../../constants'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import { GlandComponentProps } from '../../../../types'
import DatePicker from '../../date-picker'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import SimpleCheckboxes from '../../simple-checkboxes'
import TextInput from '../../text-input'

const ParotidBenignGlandTherapy: React.FC<GlandComponentProps> = ({
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
            <i>
                Pozn: u chirurgické léčby datum operace / u nechirurgické
                zahájení sledování
            </i>
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
                            'Parotidektomie I–IV (VII)',
                            'Parotidektomie I–IV',
                            'Parotidektomie I–IV (VII, S, MM)',
                            'Parotidektomie I–II (PES)',
                            'Parotidektomie III–IV (Deep lobe parotidectomy)',
                            'Parotidektomie I',
                            'Parotidektomie II',
                            'Parotidektomie I–II–III',
                            'Parotidektomie V',
                            'ECD I',
                            'ECD II',
                            'ECD V',
                        ]}
                    />
                    <SimpleCheckboxes
                        title="Funkce n. VII dle H-B (pooperačně)"
                        data={formData}
                        dbLabel={dbLabels.funkce_n_vii_dle_h_b_pooperacne}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                        options={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    />
                    <ConditionalCheckboxes
                        title="Jiné pooperační komplikace"
                        data={formData}
                        dbLabel={dbLabels.pooperacni_komplikace}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        disabled={disabled}
                    >
                        <ConditionalCheckboxOption
                            label="Nejsou"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="Syndrom Freyové"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="Slinná píštěl"
                            disabled={disabled}
                            setFormData={setFormData}
                        />
                        <ConditionalCheckboxOption
                            label="Jiné"
                            disabled={disabled}
                            setFormData={setFormData}
                        >
                            <TextInput
                                label="Upřesnění jiné komplikace"
                                dbLabel={dbLabels.jine_pooperacni_komplikace}
                                data={getDataFromPatientInterface(
                                    formData,
                                    dbLabels.jine_pooperacni_komplikace
                                )}
                                setFormData={setFormData}
                                disabled={disabled}
                            />
                        </ConditionalCheckboxOption>
                    </ConditionalCheckboxes>
                </ConditionalCheckboxOption>

                <ConditionalCheckboxOption
                    label="Nechirurgická-sledování"
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label="Nebyla indikována"
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>
        </div>
    )
}

export default ParotidBenignGlandTherapy
