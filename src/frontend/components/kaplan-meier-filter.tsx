import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FiltrationCheckbox from './filtration-checkbox'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import {
    FilterColumn,
    FilteredColumns,
    KaplanMeierData,
    TumorType,
} from '../types'
import { FormType, KaplanMeierType } from '../constants'

interface KaplanMeierFilterProps {
    setKaplanMeierData: Dispatch<SetStateAction<KaplanMeierData>>
    selectedCurveType: KaplanMeierType | null
    setSelectedCurveType: Dispatch<SetStateAction<KaplanMeierType | null>>
}

const KaplanMeierFilter: React.FC<KaplanMeierFilterProps> = ({
    setKaplanMeierData,
    selectedCurveType,
    setSelectedCurveType,
}) => {
    const [filteredColumns, setFilteredColumns] = useState<FilteredColumns>({
        [FilterColumn.FORM_TYPE]: [
            FormType.parotidMalignant,
            FormType.submandibularMalignant,
            FormType.sublingualMalignant,
        ],
        [FilterColumn.TYP_NADORU]: TumorType.MALIGNANT,
        [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
        [FilterColumn.TYP_TERAPIE]: [],
        [FilterColumn.PERZISTENCE]: null,
        [FilterColumn.RECIDIVA]: null,
        [FilterColumn.STAV]: null,
        [FilterColumn.POHLAVI]: null,
    })

    const getKaplanMeierData = async () => {
        const data = await window.api.getKaplanMeierData(
            selectedCurveType,
            filteredColumns
        )
        console.log(data)
        setKaplanMeierData(data)
    }

    useEffect(() => {
        getKaplanMeierData()
    }, [filteredColumns, selectedCurveType])

    const handleCurveTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedCurveType(event.target.value as KaplanMeierType)
    }

    return (
        <Stack sx={{ maxHeight: 800, overflowY: 'auto' }}>
            <Typography variant="h6" color="initial">
                Volba typu křivky
            </Typography>
            <RadioGroup
                aria-label="curve-type"
                name="curve-type"
                value={selectedCurveType}
                onChange={handleCurveTypeChange}
            >
                <FormControlLabel
                    value={KaplanMeierType.survival}
                    control={<Radio />}
                    label="Křivka přežití"
                />
                <FormControlLabel
                    value={KaplanMeierType.recidive}
                    control={<Radio />}
                    label="Křivka recidivy"
                />
            </RadioGroup>
            <Typography variant="h6" color="initial">
                Výběr skupin podle histopatologie
            </Typography>
            <FormGroup>
                <FiltrationCheckbox
                    label="acinocelulární karcinom"
                    dbValue="acinocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="sekretorický karcinom"
                    dbValue="sekretorický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="mukoepidermoidní karcinom"
                    dbValue="mukoepidermoidní karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="adenoidně cystický karcinom"
                    dbValue="adenoidně cystický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="polymorfní adenokarcinom"
                    dbValue="polymorfní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="epiteliální myoepiteliální karcinom"
                    dbValue="epiteliální myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="hyalinizující karcinom ze světlých buněk"
                    dbValue="hyalinizující karcinom ze světlých buněk"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="bazocelulární adenokarcinom"
                    dbValue="bazocelulární adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="sebaceózní adenokarcinom"
                    dbValue="sebaceózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="intraduktální karcinom"
                    dbValue="intraduktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="salivární karcinom NOS"
                    dbValue="salivární karcinom NOS"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="salivární duktální karcinom"
                    dbValue="salivární duktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="myoepiteliální karcinom"
                    dbValue="myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="karcinom z pleomorfniho adenomu"
                    dbValue="karcinom z pleomorfniho adenomu"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="karcinosarkom"
                    dbValue="karcinosarkom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                    dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="lymfoepiteliální karcinom"
                    dbValue="lymfoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="skvamocelulární karcinom"
                    dbValue="skvamocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="mikrosekretorický adenokarcinom"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="sklerózující mikrocystický adenokarcinom"
                />
                <FiltrationCheckbox
                    label="mikrosekretorický adenokarcinom"
                    dbValue="mikrosekretorický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="sklerózující mikrocystický adenokarcinom"
                    dbValue="sklerózující mikrocystický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="mucinózní adenokarcinom"
                    dbValue="mucinózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="asialoblastom"
                    dbValue="asialoblastom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="MALT-lymfom"
                    dbValue="MALT-lymfom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label="jiné"
                    dbValue="jiné"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
            </FormGroup>
        </Stack>
    )
}

export default KaplanMeierFilter
