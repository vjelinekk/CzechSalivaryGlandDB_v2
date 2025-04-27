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

const HistopathologyMalignant: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    return (
        <div className="sectionDiv">
            <h1>{t('histopathology')}</h1>
            <h2>{t('histological-type')}</h2>
            <ConditionalCheckboxes
                dbLabel={dbLabels.histopatologie_vysledek}
                data={formData}
                setFormData={setFormData}
                enableSingleSelect={true}
            >
                <ConditionalCheckboxOption label={t('acinic-cell-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('secretory-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('mucoepidermoid-carcinoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.mukoepidermoidni_karcinom_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('low-grade'), t('intermediate-grade'), t('high-grade'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('adenoid-cystic-carcinoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.adenoidne_cysticky_karcinom_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('tubular-cribriform-dominant'), t('more-than-30-solid-component'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('polymorphous-adenocarcinoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.polymorfni_adenokarcinom_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('classic'), t('cribriform'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('epithelial-myoepithelial-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('hyalinizing-clear-cell-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('basal-cell-adenocarcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('sebaceous-adenocarcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('intraductal-carcinoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.intraduktalni_karcinom_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('intercalated-duct-like'), t('apocrine'), t('oncocytic'), t('mixed'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('salivary-carcinoma-nos')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.salivarni_karcinom_nos_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('oncocytic-adenocarcinoma'), t('intestinal-type-adenocarcinoma'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('salivary-duct-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('myoepithelial-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('carcinoma-ex-pleomorphic-adenoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.karcinom_z_pleomorfniho_adenomu_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('intracapsular'), t('minimally-invasive'), t('invasive'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('carcinosarcoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('poorly-differentiated-carcinoma')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.spatne_diferencovany_karcinom_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('undifferentiated-carcinoma'), t('large-cell-neuroendocrine-carcinoma'), t('small-cell-neuroendocrine-carcinoma'), t('subtype-not-specified')]} disabled={disabled} />
                </ConditionalCheckboxOption>
                <ConditionalCheckboxOption label={t('lymphoepithelial-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('squamous-cell-carcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('microsecretory-adenocarcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('sclerosing-microcystic-adenocarcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('mucinous-adenocarcinoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('asialoblastoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('malt-lymphoma')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('other')} disabled={disabled} setFormData={setFormData} />
            </ConditionalCheckboxes>

            <h2>{t('histological-type-specification')}</h2>

            <NumberInput label={t('tumor-size-largest-dimension')} dbLabel={dbLabels.velikost_nadoru_histopatologie} data={getDataFromPatientInterface(formData, dbLabels.velikost_nadoru_histopatologie)} setFormData={setFormData} disabled={disabled} />

            <TextInput label={t('tumor-size-not-determined-explain')} dbLabel={dbLabels.velikost_nadoru_neurcena_histopatologie} data={getDataFromPatientInterface(formData, dbLabels.velikost_nadoru_neurcena_histopatologie)} setFormData={setFormData} disabled={disabled} />

            <SimpleCheckboxes title={t('resection-margin')} dbLabel={dbLabels.okraj_resekce_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('r0'), t('r1')]} disabled={disabled} />

            <SimpleCheckboxes title={t('lymphovascular-invasion')} dbLabel={dbLabels.lymfovaskularni_invaze_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('no'), t('yes')]} disabled={disabled} />

            <SimpleCheckboxes title={t('perineural-invasion')} dbLabel={dbLabels.perineuralni_invaze_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('no'), t('yes')]} disabled={disabled} />

            <NumberInput label={t('number-of-lymph-nodes-with-metastasis')} dbLabel={dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie} data={getDataFromPatientInterface(formData, dbLabels.pocet_lymfatickych_uzlin_s_metastazou_histopatologie)} setFormData={setFormData} disabled={disabled} />

            <ConditionalCheckboxes title={t('extranodal-spread-ene')} dbLabel={dbLabels.extranodalni_sireni_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true}>
                <ConditionalCheckboxOption label={t('no')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('yes')} disabled={disabled} setFormData={setFormData}>
                    <SimpleCheckboxes dbLabel={dbLabels.extranodalni_sireni_vysledek_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true} options={[t('ENEma-over-2mm'), t('ENEmi-2mm-or-less')]} disabled={disabled} />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>

            <ConditionalCheckboxes title={t('proven-distant-metastases')} dbLabel={dbLabels.prokazane_vzdalene_metastazy_histopatologie} data={formData} setFormData={setFormData} enableSingleSelect={true}>
                <ConditionalCheckboxOption label={t('no')} disabled={disabled} setFormData={setFormData} />
                <ConditionalCheckboxOption label={t('yes')} disabled={disabled} setFormData={setFormData}>
                    <TextInput label={t('specify-site-of-distant-metastasis')} dbLabel={dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie} data={getDataFromPatientInterface(formData, dbLabels.misto_vyskytu_vzdalene_metastazy_histopatologie)} setFormData={setFormData} disabled={disabled} />
                </ConditionalCheckboxOption>
            </ConditionalCheckboxes>
        </div>
    )
}

export default HistopathologyMalignant;
