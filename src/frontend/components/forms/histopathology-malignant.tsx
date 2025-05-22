import React from 'react'
import getDataFromPatientInterface from '../../utils/getDataFromPatientInterface'
import { dbLabels } from '../../constants'
import { GlandComponentProps } from '../../types'
import ConditionalCheckboxOption from './conditional-checkbox-option'
import ConditionalCheckboxes from './conditional-checkboxes'
import SimpleCheckboxes from './simple-checkboxes'
import TextInput from './text-input'
import NumberInput from './number-input'
import { useTranslation } from 'react-i18next'
import { formTranslationKeys } from '../../translations'

const HistopathologyMalignant: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t(formTranslationKeys.histopathology)}</h1>
            <h2>{t(formTranslationKeys.histologicalType)}</h2>
            <ConditionalCheckboxes
                dbLabel={dbLabels.histopatologie_vysledek}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.acinicCellCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.secretoryCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.mucoepidermoidCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.mukoepidermoidni_karcinom_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.lowGrade),
                            t(formTranslationKeys.intermediateGrade),
                            t(formTranslationKeys.highGrade),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.adenoidCysticCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.adenoidne_cysticky_karcinom_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.tubularCribriformDominant),
                            t(formTranslationKeys.moreThan30SolidComponent),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.polymorphousAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.polymorfni_adenokarcinom_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.classic),
                            t(formTranslationKeys.cribriform),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.epithelialMyoepithelialCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.hyalinizingClearCellCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.basalCellAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.sebaceousAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.intraductalCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={dbLabels.intraduktalni_karcinom_histopatologie}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.intercalatedDuctLike),
                            t(formTranslationKeys.apocrine),
                            t(formTranslationKeys.oncocytic),
                            t(formTranslationKeys.mixed),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.salivaryCarcinomaNos)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={dbLabels.salivarni_karcinom_nos_histopatologie}
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.oncocyticAdenocarcinoma),
                            t(formTranslationKeys.intestinalTypeAdenocarcinoma),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.salivaryDuctCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.myoepithelialCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.carcinomaExPleomorphicAdenoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.karcinom_z_pleomorfniho_adenomu_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.intracapsular),
                            t(formTranslationKeys.minimallyInvasive),
                            t(formTranslationKeys.invasive),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.carcinosarcoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.poorlyDifferentiatedCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.spatne_diferencovany_karcinom_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[
                            t(formTranslationKeys.undifferentiatedCarcinoma),
                            t(formTranslationKeys.largeCellNeuroendocrineCarcinoma),
                            t(formTranslationKeys.smallCellNeuroendocrineCarcinoma),
                            t(formTranslationKeys.subtypeNotSpecified),
                        ]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.lymphoepithelialCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.squamousCellCarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.microsecretoryAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.sclerosingMicrocysticAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.mucinousAdenocarcinoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.asialoblastoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.maltLymphoma)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.other)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
            </ConditionalCheckboxes>

            <h2>{t(formTranslationKeys.histologicalTypeSpecification)}</h2>

            <NumberInput
                label={t(formTranslationKeys.tumorSizeLargestDimension)}
                dbLabel={dbLabels.velikost_nadoru_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />


            <TextInput
                label={t(formTranslationKeys.tumorSizeNotDeterminedExplain)}
                dbLabel={dbLabels.velikost_nadoru_neurcena_histopatologie}
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.velikost_nadoru_neurcena_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />


            <SimpleCheckboxes
                title={t(formTranslationKeys.resectionMargin)}
                dbLabel={dbLabels.okraj_resekce_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={[t(formTranslationKeys.r0), t(formTranslationKeys.r1)]}
                disabled={disabled}
            />


            <SimpleCheckboxes
                title={t(formTranslationKeys.lymphovascularInvasion)}
                dbLabel={dbLabels.lymfovaskularni_invaze_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={[t(formTranslationKeys.no), t(formTranslationKeys.yes)]}
                disabled={disabled}
            />


            <SimpleCheckboxes
                title={t(formTranslationKeys.perineuralInvasion)}
                dbLabel={dbLabels.perineuralni_invaze_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
                options={[t(formTranslationKeys.no), t(formTranslationKeys.yes)]}
                disabled={disabled}
            />


            <NumberInput
                label={t(formTranslationKeys.numberOfLymphNodesWithMetastasis)}
                dbLabel={
                    dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie
                }
                data={getDataFromPatientInterface(
                    formData,
                    dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie
                )}
                setFormData={setFormData}
                disabled={disabled}
            />


            <ConditionalCheckboxes
                title={t(formTranslationKeys.extranodalSpreadEne)}
                dbLabel={dbLabels.extranodalni_sireni_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.no)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.yes)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <SimpleCheckboxes
                        dbLabel={
                            dbLabels.extranodalni_sireni_vysledek_histopatologie
                        }
                        data={formData}
                        setFormData={setFormData}
                        enableSingleSelect={true}
                        options={[t(formTranslationKeys.ENEmaOver2mm), t(formTranslationKeys.ENEmi2mmOrLess)]}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>


            <ConditionalCheckboxes
                title={t(formTranslationKeys.provenDistantMetastases)}
                dbLabel={dbLabels.prokazane_vzdalene_metastazy_histopatologie}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.no)}
                    disabled={disabled}
                    setFormData={setFormData}
                />
                />
                <ConditionalCheckboxOption
                    label={t(formTranslationKeys.yes)}
                    disabled={disabled}
                    setFormData={setFormData}
                >
                    <TextInput
                        label={t(formTranslationKeys.specifySiteOfDistantMetastasis)}
                        dbLabel={
                            dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie
                        }
                        data={getDataFromPatientInterface(
                            formData,
                            dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie
                        )}
                        setFormData={setFormData}
                        disabled={disabled}
                    />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>
        </div>
    )
}

export default HistopathologyMalignant
