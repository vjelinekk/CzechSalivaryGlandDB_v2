import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FiltrationCheckbox from './filtration-checkbox'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { useTranslation } from 'react-i18next'
import {
    FilterColumn,
    FilteredColumns,
    KaplanMeierData,
    TumorType,
} from '../types'
import { FormType, KaplanMeierType } from '../constants'
import { appTranslationKeys } from '../translations'

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
    const { t } = useTranslation()

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
                {t(appTranslationKeys.curveTypeSelection)}
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
                    label={t(appTranslationKeys.survivalCurve)}
                />
                <FormControlLabel
                    value={KaplanMeierType.recidive}
                    control={<Radio />}
                    label={t(appTranslationKeys.recidiveCurve)}
                />
            </RadioGroup>
            <Typography variant="h6" color="initial">
                {t(appTranslationKeys.histopathologySelection)}
            </Typography>
            <FormGroup>
                <FiltrationCheckbox
                    label={t(appTranslationKeys.acinocellularCarcinoma)}
                    dbValue="acinocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.secretoryCarcinoma)}
                    dbValue="sekretorický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.mucoepidermoidCarcinoma)}
                    dbValue="mukoepidermoidní karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.adenoidCysticCarcinoma)}
                    dbValue="adenoidně cystický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.polymorphousAdenocarcinoma)}
                    dbValue="polymorfní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(
                        appTranslationKeys.epithelialMyoepithelialCarcinoma
                    )}
                    dbValue="epiteliální myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.hyalinizingCarcinoma)}
                    dbValue="hyalinizující karcinom ze světlých buněk"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.basalCellAdenocarcinoma)}
                    dbValue="bazocelulární adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.sebaceousAdenocarcinoma)}
                    dbValue="sebaceózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.intraductalCarcinoma)}
                    dbValue="intraduktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.salivaryCarcinomaNonSpecific)}
                    dbValue="salivární karcinom NOS"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.salivaryDuctalCarcinoma)}
                    dbValue="salivární duktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.myoepithelialCarcinoma)}
                    dbValue="myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(
                        appTranslationKeys.carcinomaFromPleomorphicAdenoma
                    )}
                    dbValue="karcinom z pleomorfniho adenomu"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.carcinosarcoma)}
                    dbValue="karcinosarkom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.poorlyDifferentiatedCarcinoma)}
                    dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.lymphoepithelialCarcinoma)}
                    dbValue="lymfoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.squamousCellCarcinoma)}
                    dbValue="skvamocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={t(appTranslationKeys.microsecretoryAdenocarcinoma)}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={t(
                        appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                    )}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.microsecretoryAdenocarcinoma)}
                    dbValue="mikrosekretorický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(
                        appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                    )}
                    dbValue="sklerózující mikrocystický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.mucinousAdenocarcinoma)}
                    dbValue="mucinózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.asialoblastoma)}
                    dbValue="asialoblastom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.maltLymphoma)}
                    dbValue="MALT-lymfom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.other)}
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
