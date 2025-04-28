import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import ListSubheader from '@mui/material/ListSubheader'
import { FilterColumn, FilteredColumns } from '../types'
import FiltrationCheckbox from './filtration-checkbox'
import { useTranslation } from 'react-i18next'

interface FiltrationMalignantProps {
    filteredColumns: FilteredColumns
    setFilteredColumns: React.Dispatch<React.SetStateAction<FilteredColumns>>
}

const FiltrationMalignant: React.FC<FiltrationMalignantProps> = ({
    filteredColumns,
    setFilteredColumns,
}) => {
    const { t } = useTranslation()
    return (
        <>
            <ListSubheader disableSticky>
                <Typography variant="h6" fontWeight="bold">
                    {t('terapy-type')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t('chirurgical')}
                            dbValue="Chirurgická"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('non-surgical')}
                            dbValue="Nechirurgická"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('not-indicated')}
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
                    {t('gender')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t('male')}
                            dbValue="Muž"
                            filterLabel={FilterColumn.POHLAVI}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t('female')}
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
                    {t('persistence')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t('yes')}
                            dbValue="Ano"
                            filterLabel={FilterColumn.PERZISTENCE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t('no')}
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
                    {t('recurrence')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t('yes')}
                            dbValue="Ano"
                            filterLabel={FilterColumn.RECIDIVA}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t('no')}
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
                    {t('status')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t('alive')}
                            dbValue="Žije"
                            filterLabel={FilterColumn.STAV}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t('deceased')}
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
                    {t('histopathology-lower-case')}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
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
                            label={t('hyalinizing-carcinoma-of-clear-cells')}
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
                            label={t('salivary-carcinoma-nos')}
                            dbValue="salivární karcinom NOS"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('salivary-ductal-carcinoma')}
                            dbValue="salivární duktální karcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('myoepithelial-carcinoma')}
                            dbValue="myoepiteliální karcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('carcinoma-from-pleomorphic-adenoma')}
                            dbValue="karcinom z pleomorfniho adenomu"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('carcinosarcoma')}
                            dbValue="karcinosarkom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('poorly-differentiated-carcinoma')}
                            dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('lymphoepithelial-carcinoma')}
                            dbValue="lymfoepiteliální karcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('squamous-cell-carcinoma')}
                            dbValue="skvamocelulární karcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={t('microsecretory-adenocarcinoma')}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={t('sclerosing-microcystic-adenocarcinoma')}
                        />
                        <FiltrationCheckbox
                            label={t('microsecretory-adenocarcinoma')}
                            dbValue="mikrosekretorický adenokarcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('sclerosing-microcystic-adenocarcinoma')}
                            dbValue="sklerózující mikrocystický adenokarcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('mucinous-adenocarcinoma')}
                            dbValue="mucinózní adenokarcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('asialoblastoma')}
                            dbValue="asialoblastom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('malt-lymphoma')}
                            dbValue="MALT-lymfom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t('other')}
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

export default FiltrationMalignant
