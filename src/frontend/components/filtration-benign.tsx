import React from 'react'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import ListSubheader from '@mui/material/ListSubheader'
import { FilterColumn, FilteredColumns } from '../types'
import FiltrationCheckbox from './filtration-checkbox'
import { useTranslation } from 'react-i18next'
import { appTranslationKeys, formTranslationKeys } from '../translations'

interface FiltrationBenignProps {
    filteredColumns: FilteredColumns
    setFilteredColumns: React.Dispatch<React.SetStateAction<FilteredColumns>>
}

const FiltrationBenign: React.FC<FiltrationBenignProps> = ({
    filteredColumns,
    setFilteredColumns,
}) => {
    const { t } = useTranslation()

    return (
        <>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.therapyType)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.surgical)}
                            dbValue={formTranslationKeys.surgical}
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.nonSurgicalMonitoring)}
                            dbValue={formTranslationKeys.nonSurgicalMonitoring}
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.notIndicated)}
                            dbValue={formTranslationKeys.notIndicated}
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.gender)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.male)}
                            dbValue={formTranslationKeys.male}
                            filterLabel={FilterColumn.POHLAVI}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.female)}
                            dbValue={formTranslationKeys.female}
                            filterLabel={FilterColumn.POHLAVI}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.persistence)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.yes)}
                            dbValue={appTranslationKeys.yes}
                            filterLabel={FilterColumn.PERZISTENCE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.no)}
                            dbValue={appTranslationKeys.no}
                            filterLabel={FilterColumn.PERZISTENCE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.recurrence)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.yes)}
                            dbValue={appTranslationKeys.yes}
                            filterLabel={FilterColumn.RECIDIVA}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.no)}
                            dbValue={appTranslationKeys.no}
                            filterLabel={FilterColumn.RECIDIVA}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.status)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.alive)}
                            dbValue={formTranslationKeys.alive}
                            filterLabel={FilterColumn.STAV}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.deceased)}
                            dbValue={formTranslationKeys.deceased}
                            filterLabel={FilterColumn.STAV}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t(formTranslationKeys.histopathology)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.acinicCellCarcinoma)}
                            dbValue={appTranslationKeys.acinicCellCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.pleomorphicAdenoma)}
                            dbValue={formTranslationKeys.pleomorphicAdenoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                formTranslationKeys.papillaryCystadenolymphomaWarthin
                            )}
                            dbValue={formTranslationKeys.warthinTumor}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.basalCellAdenoma)}
                            dbValue={formTranslationKeys.basalCellAdenoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.myoepithelioma)}
                            dbValue={formTranslationKeys.myoepithelioma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.oncocytoma)}
                            dbValue={formTranslationKeys.oncocytoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.canalicularAdenoma)}
                            dbValue={formTranslationKeys.canalicularAdenoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.sebaceousAdenoma)}
                            dbValue={formTranslationKeys.sebaceousAdenoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.ductalPapilloma)}
                            dbValue={formTranslationKeys.ductalPapilloma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.sebaceousLymphadenoma)}
                            dbValue={formTranslationKeys.sebaceousLymphadenoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.keratocystoma)}
                            dbValue={formTranslationKeys.keratocystoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.other)}
                            dbValue={appTranslationKeys.other}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
        </>
    )
}

export default FiltrationBenign
