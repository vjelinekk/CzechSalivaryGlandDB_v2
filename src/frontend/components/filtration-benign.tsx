import React from 'react'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import ListSubheader from '@mui/material/ListSubheader'
import { FilterColumn, FilteredColumns } from '../types'
import FiltrationCheckbox from './filtration-checkbox'

interface FiltrationBenignProps {
    filteredColumns: FilteredColumns
    setFilteredColumns: React.Dispatch<React.SetStateAction<FilteredColumns>>
}

const FiltrationBenign: React.FC<FiltrationBenignProps> = ({
    filteredColumns,
    setFilteredColumns,
}) => {
    return (
        <>
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
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="Nechirurgická-sledování"
                            dbValue="Nechirurgická-sledování"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="Nebyla indikována"
                            dbValue="Nebyla indikována"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                    </FormGroup>
                </FormControl>
            </ListItem>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    Pohlaví
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label="Muž"
                            dbValue="Muž"
                            filterLabel={FilterColumn.POHLAVI}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label="Žena"
                            dbValue="Žena"
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
                    Perzistence
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label="Ano"
                            dbValue="Ano"
                            filterLabel={FilterColumn.PERZISTENCE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label="Ne"
                            dbValue="Ne"
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
                    Recidiva
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label="Ano"
                            dbValue="Ano"
                            filterLabel={FilterColumn.RECIDIVA}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label="Ne"
                            dbValue="Ne"
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
                    Stav
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label="Žije"
                            dbValue="Žije"
                            filterLabel={FilterColumn.STAV}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label="Zemřel"
                            dbValue="Zemřel"
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
                    Histopatologie
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FiltrationCheckbox
                            label="acinocelulární karcinom"
                            dbValue="acinocelulární karcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="pleomorfní adenom"
                            dbValue="pleomorfní adenom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="papilární cystadenolymfom (Warthinův tumor)"
                            dbValue="papilární cystadenolymfom (Warthinův tumor)"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="bazocelulární adenom"
                            dbValue="bazocelulární adenom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="myoepiteliom"
                            dbValue="myoepiteliom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="onkocytom"
                            dbValue="onkocytom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="kanalikulární adenom"
                            dbValue="kanalikulární adenom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="sebaceózní adenom"
                            dbValue="sebaceózní adenom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="duktální papilom"
                            dbValue="duktální papilom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="debaceózní lymfadenom"
                            dbValue="debaceózní lymfadenom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label="keratocystom"
                            dbValue="keratocystom"
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
                </FormControl>
            </ListItem>
        </>
    )
}

export default FiltrationBenign
