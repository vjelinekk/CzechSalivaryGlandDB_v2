import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import ListSubheader from '@mui/material/ListSubheader'
import { useTranslation } from 'react-i18next'
import { FilterColumn, FilteredColumns, TumorType } from '../types'
import FiltrationCheckbox from './filtration-checkbox'
import { FormType, StudyType } from '../constants'
import FiltrationMalignant from './filtration-malignant'
import FiltrationBenign from './filtration-benign'
import { formTranslationKeys } from '../translations'

interface FiltrationMenuProps {
    openFilterMenu: boolean
    setOpenFilterMenu: Dispatch<SetStateAction<boolean>>
    filteredColumns: FilteredColumns
    setFilteredColumns: Dispatch<SetStateAction<FilteredColumns>>
    studyType: StudyType
    setIsFiltered: Dispatch<SetStateAction<boolean>>
}

const FiltrationMenu: React.FC<FiltrationMenuProps> = ({
    openFilterMenu,
    setOpenFilterMenu,
    filteredColumns,
    setFilteredColumns,
    studyType,
    setIsFiltered,
}) => {
    const { t } = useTranslation()
    const initialFilter = useRef<FilteredColumns>(filteredColumns)

    useEffect(() => {
        const currentTumorType = filteredColumns.typ_nadoru
        const initialTumorType = initialFilter.current.typ_nadoru

        if (
            currentTumorType !== null &&
            currentTumorType !== initialTumorType
        ) {
            setFilteredColumns({
                ...filteredColumns,
                [FilterColumn.FORM_TYPE]: [],
                [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
                [FilterColumn.TYP_TERAPIE]: [],
                [FilterColumn.PERZISTENCE]: null,
                [FilterColumn.RECIDIVA]: null,
                [FilterColumn.STAV]: null,
                [FilterColumn.POHLAVI]: null,
            })

            initialFilter.current = {
                ...filteredColumns,
                [FilterColumn.FORM_TYPE]: [],
                [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
                [FilterColumn.TYP_TERAPIE]: [],
                [FilterColumn.PERZISTENCE]: null,
                [FilterColumn.RECIDIVA]: null,
                [FilterColumn.STAV]: null,
                [FilterColumn.POHLAVI]: null,
            }
        }
    }, [filteredColumns.typ_nadoru])

    useEffect(() => {
        initialFilter.current = filteredColumns
    }, [openFilterMenu])

    return (
        <Dialog open={openFilterMenu} PaperProps={{ sx: { width: '50%' } }}>
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <IconButton
                        onClick={() => {
                            setOpenFilterMenu(false)
                            setFilteredColumns(initialFilter.current)
                        }}
                        edge="start"
                        color="inherit"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        {t(formTranslationKeys.filtrationMenu)}
                    </Typography>
                    <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                            setFilteredColumns({
                                [FilterColumn.FORM_TYPE]: [],
                                [FilterColumn.TYP_NADORU]: null,
                                [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
                                [FilterColumn.TYP_TERAPIE]: [],
                                [FilterColumn.PERZISTENCE]: null,
                                [FilterColumn.RECIDIVA]: null,
                                [FilterColumn.STAV]: null,
                                [FilterColumn.POHLAVI]: null,
                            })
                            initialFilter.current = {
                                [FilterColumn.FORM_TYPE]: [],
                                [FilterColumn.TYP_NADORU]: null,
                                [FilterColumn.HISTOPATOLOGIE_VYSLEDEK]: [],
                                [FilterColumn.TYP_TERAPIE]: [],
                                [FilterColumn.PERZISTENCE]: null,
                                [FilterColumn.RECIDIVA]: null,
                                [FilterColumn.STAV]: null,
                                [FilterColumn.POHLAVI]: null,
                            }
                            setIsFiltered(false)
                        }}
                    >
                        {t(formTranslationKeys.resetFilter)}
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenFilterMenu(false)
                            setIsFiltered(true)
                        }}
                        autoFocus
                        variant="contained"
                        color="success"
                    >
                        {t(formTranslationKeys.saveFilter)}
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                {(!studyType || studyType === StudyType.special) && (
                    <>
                        <ListSubheader disableSticky>
                            <Typography variant="h6" fontWeight="bold">
                                {t(formTranslationKeys.tumorType)}
                            </Typography>
                        </ListSubheader>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormGroup sx={{ flexDirection: 'row' }}>
                                    <FiltrationCheckbox
                                        label={t(formTranslationKeys.benign)}
                                        dbValue={TumorType.BENIGN}
                                        filterLabel={FilterColumn.TYP_NADORU}
                                        filteredColumns={filteredColumns}
                                        setFilteredColumns={setFilteredColumns}
                                        isSingleCheckGroup={true}
                                    />
                                    <FiltrationCheckbox
                                        label={t(formTranslationKeys.malignant)}
                                        dbValue={TumorType.MALIGNANT}
                                        filterLabel={FilterColumn.TYP_NADORU}
                                        filteredColumns={filteredColumns}
                                        setFilteredColumns={setFilteredColumns}
                                        isSingleCheckGroup={true}
                                    />
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        {filteredColumns.typ_nadoru !== null &&
                            filteredColumns.typ_nadoru ===
                                TumorType.MALIGNANT && (
                                <>
                                    <ListSubheader disableSticky>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {t(formTranslationKeys.glandType)}
                                        </Typography>
                                    </ListSubheader>
                                    <ListItem>
                                        <FormControl component="fieldset">
                                            <FormGroup
                                                sx={{ flexDirection: 'row' }}
                                            >
                                                <FiltrationCheckbox
                                                    label={t(formTranslationKeys.submandibular)}
                                                    dbValue={
                                                        FormType.submandibularMalignant
                                                    }
                                                    filterLabel={
                                                        FilterColumn.FORM_TYPE
                                                    }
                                                    filteredColumns={
                                                        filteredColumns
                                                    }
                                                    setFilteredColumns={
                                                        setFilteredColumns
                                                    }
                                                />
                                                <FiltrationCheckbox
                                                    label={t(formTranslationKeys.sublingual)}
                                                    dbValue={
                                                        FormType.sublingualMalignant
                                                    }
                                                    filterLabel={
                                                        FilterColumn.FORM_TYPE
                                                    }
                                                    filteredColumns={
                                                        filteredColumns
                                                    }
                                                    setFilteredColumns={
                                                        setFilteredColumns
                                                    }
                                                />
                                                <FiltrationCheckbox
                                                    label={t(formTranslationKeys.parotid)}
                                                    dbValue={
                                                        FormType.parotidMalignant
                                                    }
                                                    filterLabel={
                                                        FilterColumn.FORM_TYPE
                                                    }
                                                    filteredColumns={
                                                        filteredColumns
                                                    }
                                                    setFilteredColumns={
                                                        setFilteredColumns
                                                    }
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </ListItem>
                                </>
                            )}
                        {filteredColumns.typ_nadoru !== null &&
                            filteredColumns.typ_nadoru === TumorType.BENIGN && (
                                <>
                                    <ListSubheader disableSticky>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {t(formTranslationKeys.glandType)}
                                        </Typography>
                                    </ListSubheader>
                                    <ListItem>
                                        <FormControl component="fieldset">
                                            <FormGroup
                                                sx={{ flexDirection: 'row' }}
                                            >
                                                <FiltrationCheckbox
                                                    label={t(formTranslationKeys.submandibular)}
                                                    dbValue={
                                                        FormType.submandibularBenign
                                                    }
                                                    filterLabel={
                                                        FilterColumn.FORM_TYPE
                                                    }
                                                    filteredColumns={
                                                        filteredColumns
                                                    }
                                                    setFilteredColumns={
                                                        setFilteredColumns
                                                    }
                                                />
                                                <FiltrationCheckbox
                                                    label={t(formTranslationKeys.parotid)}
                                                    dbValue={
                                                        FormType.parotidBenign
                                                    }
                                                    filterLabel={
                                                        FilterColumn.FORM_TYPE
                                                    }
                                                    filteredColumns={
                                                        filteredColumns
                                                    }
                                                    setFilteredColumns={
                                                        setFilteredColumns
                                                    }
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </ListItem>
                                </>
                            )}
                    </>
                )}
                {filteredColumns.typ_nadoru === null && (
                    <ListItem>
                        <Typography variant="body1" color="text.secondary">
                            {t(formTranslationKeys.selectTumorTypeMessage)}
                        </Typography>
                    </ListItem>
                )}
                {filteredColumns.typ_nadoru !== null &&
                    filteredColumns.typ_nadoru === TumorType.MALIGNANT && (
                        <FiltrationMalignant
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                    )}
                {filteredColumns.typ_nadoru !== null &&
                    filteredColumns.typ_nadoru === TumorType.BENIGN && (
                        <FiltrationBenign
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                    )}
            </List>
        </Dialog>
    )
}

export default FiltrationMenu
