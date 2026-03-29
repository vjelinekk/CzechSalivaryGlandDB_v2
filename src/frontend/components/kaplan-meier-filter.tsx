import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
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
import { appTranslationKeys, formTranslationKeys } from '../translations'
import {
    kaplanMeierTypeToDto,
    filteredColumnsToDto,
} from '../mappers/enumMappers'
import { FormControlLabel } from '@mui/material'

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
            kaplanMeierTypeToDto[selectedCurveType],
            filteredColumnsToDto(filteredColumns)
        )
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
                    label={t(formTranslationKeys.acinicCellCarcinoma)}
                    dbValue="acinic-cell-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.secretoryCarcinoma)}
                    dbValue="secretory-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.mucoepidermoidCarcinoma)}
                    dbValue="mucoepidermoid-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.adenoidCysticCarcinoma)}
                    dbValue="adenoid-cystic-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.polymorphousAdenocarcinoma)}
                    dbValue="polymorphous-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(
                        formTranslationKeys.epithelialMyoepithelialCarcinoma
                    )}
                    dbValue="epithelial-myoepithelial-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.hyalinizingClearCellCarcinoma)}
                    dbValue="hyalinizing-clear-cell-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.basalCellAdenocarcinoma)}
                    dbValue="basal-cell-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.sebaceousAdenocarcinoma)}
                    dbValue="sebaceous-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.intraductalCarcinoma)}
                    dbValue="intraductal-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.salivaryCarcinomaNos)}
                    dbValue="salivary-carcinoma-nos"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.salivaryDuctCarcinoma)}
                    dbValue="salivary-duct-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.myoepithelialCarcinoma)}
                    dbValue="myoepithelial-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.carcinomaExPleomorphicAdenoma)}
                    dbValue="carcinoma-ex-pleomorphic-adenoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.carcinosarcoma)}
                    dbValue="carcinosarcoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.poorlyDifferentiatedCarcinoma)}
                    dbValue="poorly-differentiated-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.lymphoepithelialCarcinoma)}
                    dbValue="lymphoepithelial-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.squamousCellCarcinoma)}
                    dbValue="squamous-cell-carcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.microsecretoryAdenocarcinoma)}
                    dbValue="microsecretory-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(
                        appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                    )}
                    dbValue="sclerosing-microcystic-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.mucinousAdenocarcinoma)}
                    dbValue="mucinous-adenocarcinoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(formTranslationKeys.asialoblastoma)}
                    dbValue="asialoblastoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.maltLymphoma)}
                    dbValue="malt-lymphoma"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t(appTranslationKeys.other)}
                    dbValue="other"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
            </FormGroup>
        </Stack>
    )
}

export default KaplanMeierFilter
