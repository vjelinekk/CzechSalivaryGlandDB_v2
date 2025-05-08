import React from 'react'
import { dbLabels } from '../../../../constants'
import { GlandComponentProps } from '../../../../types'
import getDataFromPatientInterface from '../../../../utils/getDataFromPatientInterface'
import ConditionalCheckboxOption from '../../conditional-checkbox-option'
import ConditionalCheckboxes from '../../conditional-checkboxes'
import DatePicker from '../../date-picker'
import SimpleCheckboxes from '../../simple-checkboxes'

const SubmandibularBenignGlandTherapy: React.FC<GlandComponentProps> = ({
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

export default SubmandibularBenignGlandTherapy
