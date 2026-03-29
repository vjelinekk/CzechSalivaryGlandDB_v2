import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
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
                            dbValue={formTranslationKeys.chirurgical}
                            filterLabel={FilterColumn.TYP_TERAPIE}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.nonSurgical)}
                            dbValue={formTranslationKeys.nonSurgical}
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
                    {t(formTranslationKeys.histopathologyLowerCase)}
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
                            label={t(appTranslationKeys.secretoryCarcinoma)}
                            dbValue={appTranslationKeys.secretoryCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.mucoepidermoidCarcinoma
                            )}
                            dbValue={appTranslationKeys.mucoepidermoidCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.adenoidCysticCarcinoma)}
                            dbValue={appTranslationKeys.adenoidCysticCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.polymorphousAdenocarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.polymorphousAdenocarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.epithelialMyoepithelialCarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.epithelialMyoepithelialCarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                formTranslationKeys.hyalinizingClearCellCarcinoma
                            )}
                            dbValue={
                                formTranslationKeys.hyalinizingClearCellCarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.basalCellAdenocarcinoma
                            )}
                            dbValue={appTranslationKeys.basalCellAdenocarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.sebaceousAdenocarcinoma
                            )}
                            dbValue={appTranslationKeys.sebaceousAdenocarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.intraductalCarcinoma)}
                            dbValue={appTranslationKeys.intraductalCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.salivaryCarcinomaNos)}
                            dbValue={formTranslationKeys.salivaryCarcinomaNos}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.salivaryDuctCarcinoma)}
                            dbValue={formTranslationKeys.salivaryDuctCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.myoepithelialCarcinoma)}
                            dbValue={appTranslationKeys.myoepithelialCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                formTranslationKeys.carcinomaExPleomorphicAdenoma
                            )}
                            dbValue={
                                formTranslationKeys.carcinomaExPleomorphicAdenoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.carcinosarcoma)}
                            dbValue={appTranslationKeys.carcinosarcoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.poorlyDifferentiatedCarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.poorlyDifferentiatedCarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.lymphoepithelialCarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.lymphoepithelialCarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.squamousCellCarcinoma)}
                            dbValue={appTranslationKeys.squamousCellCarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.microsecretoryAdenocarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.microsecretoryAdenocarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(
                                appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                            )}
                            dbValue={
                                appTranslationKeys.sclerosingMicrocysticAdenocarcinoma
                            }
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.mucinousAdenocarcinoma)}
                            dbValue={appTranslationKeys.mucinousAdenocarcinoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(formTranslationKeys.asialoblastoma)}
                            dbValue={formTranslationKeys.asialoblastoma}
                            filterLabel={FilterColumn.HISTOPATOLOGIE_VYSLEDEK}
                            filteredColumns={filteredColumns}
                            setFilteredColumns={setFilteredColumns}
                        />
                        <FiltrationCheckbox
                            label={t(appTranslationKeys.maltLymphoma)}
                            dbValue={appTranslationKeys.maltLymphoma}
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

export default FiltrationMalignant
