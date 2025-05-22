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
import { appTranslationKeys, formTranslationKeys } from '../translations'

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
                    {t(formTranslationKeys.terapyType)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.chirurgical)}
                            dbValue="Chirurgická"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.nonSurgical)}
                            dbValue="Nechirurgická"
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.notIndicated)}
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
                    {t(formTranslationKeys.gender)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.male)}
                            dbValue="Muž"
                            filterLabel={FilterColumn.POHLAVI}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.female)}
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
                    {t(formTranslationKeys.persistence)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.yes)}
                            dbValue="Ano"
                            filterLabel={FilterColumn.PERZISTENCE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.no)}
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
                    {t(formTranslationKeys.recurrence)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.yes)}
                            dbValue="Ano"
                            filterLabel={FilterColumn.RECIDIVA}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.no)}
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
                    {t(formTranslationKeys.status)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
                    <FormGroup sx={{ flexDirection: 'row' }}>
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.alive)}
                            dbValue="Žije"
                            filterLabel={FilterColumn.STAV}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                            isSingleCheckGroup={true}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.deceased)}
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
                    {t(formTranslationKeys.histopathologyLowerCase)}
                </Typography>
            </ListSubheader>
            <ListItem>
                <FormControl component="fieldset">
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
                            label={t(
                                appTranslationKeys.mucoepidermoidCarcinoma
                            )}
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
                            label={t(
                                appTranslationKeys.polymorphousAdenocarcinoma
                            )}
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
                            label={t(
                                formTranslationKeys.hyalinizingCarcinomaOfClearCells
                            )}
                            dbValue="hyalinizující karcinom ze světlých buněk"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.basalCellAdenocarcinoma
                            )}
                            dbValue="bazocelulární adenokarcinom"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.sebaceousAdenocarcinoma
                            )}
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
                            label={t(formTranslationKeys.salivaryCarcinomaNos)}
                            dbValue="salivární karcinom NOS"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.salivaryDuctalCarcinoma
                            )}
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
                            label={t(
                                appTranslationKeys.poorlyDifferentiatedCarcinoma
                            )}
                            dbValue="špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní"
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.lymphoepithelialCarcinoma
                            )}
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
                            label={t(
                                appTranslationKeys.microsecretoryAdenocarcinoma
                            )}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={t(
                                appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                            )}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.microsecretoryAdenocarcinoma
                            )}
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
                </FormControl>
            </ListItem>
        </>
    )
}

export default FiltrationMalignant
