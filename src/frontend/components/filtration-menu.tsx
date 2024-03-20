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
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import ListSubheader from '@mui/material/ListSubheader'
import { FilteredColumns } from '../types'
import FiltrationCheckbox from './filtration-checkbox'
import { FormType, StudyType } from '../constants'

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
    const initialFilter = useRef<FilteredColumns>(filteredColumns)

    useEffect(() => {
        initialFilter.current = filteredColumns
    }, [openFilterMenu])

    return (
        <Dialog open={openFilterMenu}>
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
                        Filtrační menu
                    </Typography>
                    <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                            setFilteredColumns({
                                form_type: [],
                                histopatologie_vysledek: [],
                                typ_terapie: [],
                            })
                            initialFilter.current = {
                                form_type: [],
                                histopatologie_vysledek: [],
                                typ_terapie: [],
                            }
                            setIsFiltered(false)
                        }}
                    >
                        Resetovat filtr
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
                        Uložit filtr
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                {(!studyType || studyType === StudyType.special) && (
                    <>
                        <ListSubheader disableSticky>
                            <Typography variant="h6" fontWeight="bold">
                                Typ žlázy
                            </Typography>
                        </ListSubheader>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormGroup sx={{ flexDirection: 'row' }}>
                                    <FiltrationCheckbox
                                        label="Podčelistní"
                                        dbValue={FormType.podcelistni}
                                        filterLabel="form_type"
                                        filteredColumns={filteredColumns}
                                        setFilteredColumns={setFilteredColumns}
                                    />
                                    <FiltrationCheckbox
                                        label="Podjazykové"
                                        dbValue={FormType.podjazykove}
                                        filterLabel="form_type"
                                        filteredColumns={filteredColumns}
                                        setFilteredColumns={setFilteredColumns}
                                    />
                                    <FiltrationCheckbox
                                        label="Příušní"
                                        dbValue={FormType.priusni}
                                        filterLabel="form_type"
                                        filteredColumns={filteredColumns}
                                        setFilteredColumns={setFilteredColumns}
                                    />
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                    </>
                )}
                <ListSubheader disableSticky>
                    <Typography variant="h6" fontWeight="bold">
                        Typ terapie
                    </Typography>
                </ListSubheader>
                <ListItem>
                    <FormControl component="fieldset">
                        <FormGroup sx={{ flexDirection: 'row' }}>
                            <FiltrationCheckbox
                                label="Chirurgická"
                                dbValue="Chirurgická"
                                filterLabel="typ_terapie"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="Nechirurgická"
                                dbValue="Nechirurgická"
                                filterLabel="typ_terapie"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="Nebyla indikována"
                                dbValue="Nebyla indikována"
                                filterLabel="typ_terapie"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                        </FormGroup>
                    </FormControl>
                </ListItem>
                <ListSubheader disableSticky>
                    <Typography variant="h6" fontWeight="bold">
                        Histopatologie
                    </Typography>
                </ListSubheader>
                <ListItem>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FiltrationCheckbox
                                label="acinocelulární karcinom"
                                dbValue="acinocelulární karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="sekretorický karcinom"
                                dbValue="sekretorický karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="mukoepidermoidní karcinom"
                                dbValue="mukoepidermoidní karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="adenoidně cystický karcinom"
                                dbValue="adenoidně cystický karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="polymorfní adenokarcinom"
                                dbValue="polymorfní adenokarcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="epiteliální myoepiteliální karcinom"
                                dbValue="epiteliální myoepiteliální karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="hyalinizující karcinom ze světlých buněk"
                                dbValue="hyalinizující karcinom ze světlých buněk"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="bazocelulární adenokarcinom"
                                dbValue="bazocelulární adenokarcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="sebaceózní adenokarcinom"
                                dbValue="sebaceózní adenokarcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="intraduktální karcinom"
                                dbValue="intraduktální karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="salivární karcinom NOS"
                                dbValue="salivární karcinom NOS"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="salivární duktální karcinom"
                                dbValue="salivární duktální karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="myoepiteliální karcinom"
                                dbValue="myoepiteliální karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="karcinom z pleomorfniho adenomu"
                                dbValue="karcinom z pleomorfniho adenomu"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="karcinosarkom"
                                dbValue="karcinosarkom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                                dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="lymfoepiteliální karcinom"
                                dbValue="lymfoepiteliální karcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="skvamocelulární karcinom"
                                dbValue="skvamocelulární karcinom"
                                filterLabel="histopatologie_vysledek"
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
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="sklerózující mikrocystický adenokarcinom"
                                dbValue="sklerózující mikrocystický adenokarcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="mucinózní adenokarcinom"
                                dbValue="mucinózní adenokarcinom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="asialoblastom"
                                dbValue="asialoblastom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="MALT-lymfom"
                                dbValue="MALT-lymfom"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                            <FiltrationCheckbox
                                label="jiné"
                                dbValue="jiné"
                                filterLabel="histopatologie_vysledek"
                                filteredColumns={filteredColumns}
                                setFilteredColumns={setFilteredColumns}
                            />
                        </FormGroup>
                    </FormControl>
                </ListItem>
            </List>
        </Dialog>
    )
}

export default FiltrationMenu
