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
                {t('curve-type-selection')}
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
                    label={t('survival-curve')}
                />
                <FormControlLabel
                    value={KaplanMeierType.recidive}
                    control={<Radio />}
                    label={t('recidive-curve')}
                />
            </RadioGroup>
            <Typography variant="h6" color="initial">
                {t('histopathology-selection')}
            </Typography>
            <FormGroup>
                <FiltrationCheckbox
                    label={t('acinocellular-carcinoma')}
                    dbValue="acinocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('secretory-carcinoma')}
                    dbValue="sekretorický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('mucoepidermoid-carcinoma')}
                    dbValue="mukoepidermoidní karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('adenoid-cystic-carcinoma')}
                    dbValue="adenoidně cystický karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('polymorphous-adenocarcinoma')}
                    dbValue="polymorfní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('epithelial-myoepithelial-carcinoma')}
                    dbValue="epiteliální myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('hyalinizing-carcinoma')}
                    dbValue="hyalinizující karcinom ze světlých buněk"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('basal-cell-adenocarcinoma')}
                    dbValue="bazocelulární adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('sebaceous-adenocarcinoma')}
                    dbValue="sebaceózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('intraductal-carcinoma')}
                    dbValue="intraduktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t('salivary-carcinoma-non-specific')}
                    dbValue="salivární karcinom NOS"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("salivary-ductal-carcinoma")}
                    dbValue="salivární duktální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("myoepithelial-carcinoma")}
                    dbValue="myoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("carcinoma-from-pleomorphic-adenoma")}
                    dbValue="karcinom z pleomorfniho adenomu"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("carcinosarcoma")}
                    dbValue="karcinosarkom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("poorly-differentiated-carcinoma")}
                    dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("lymphoepithelial-carcinoma")}
                    dbValue="lymfoepiteliální karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("squamous-cell-carcinoma")}
                    dbValue="skvamocelulární karcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={t("microsecretory-adenocarcinoma")}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={t("sclerosing-microcystic-adenocarcinoma")}
                />
                <FiltrationCheckbox
                    label={t("microsecretory-adenocarcinoma")}
                    dbValue="mikrosekretorický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("sclerosing-microcystic-adenocarcinoma")}
                    dbValue="sklerózující mikrocystický adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("mucinous-adenocarcinoma")}
                    dbValue="mucinózní adenokarcinom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("asialoblastoma")}
                    dbValue="asialoblastom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("malt-lymphoma")}
                    dbValue="MALT-lymfom"
                    filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                    filteredColumns={filteredColumns}
                    setFilteredColumns={setFilteredColumns}
                />
                <FiltrationCheckbox
                    label={t("other")}
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
