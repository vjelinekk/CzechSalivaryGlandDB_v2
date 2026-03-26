import { PatientType } from '../../frontend/types'

// Maps Czech histology type strings (from old Excel exports) to translation keys
const czechHistologyTypeToKey: Record<string, string> = {
    'acinocelulární karcinom': 'acinic-cell-carcinoma',
    'sekretorický karcinom': 'secretory-carcinoma',
    'mukoepidermoidní karcinom': 'mucoepidermoid-carcinoma',
    'adenoidně cystický karcinom': 'adenoid-cystic-carcinoma',
    'polymorfní adenokarcinom': 'polymorphous-adenocarcinoma',
    'epiteliální myoepiteliální karcinom': 'epithelial-myoepithelial-carcinoma',
    'hyalinizující karcinom ze světlých buněk': 'hyalinizing-clear-cell-carcinoma',
    'bazocelulární adenokarcinom': 'basal-cell-adenocarcinoma',
    'sebaceózní adenokarcinom': 'sebaceous-adenocarcinoma',
    'intraduktální karcinom': 'intraductal-carcinoma',
    'salivární karcinom NOS': 'salivary-carcinoma-nos',
    'salivární duktální karcinom': 'salivary-duct-carcinoma',
    'myoepiteliální karcinom': 'myoepithelial-carcinoma',
    'karcinom z pleomorfního adenomu': 'carcinoma-ex-pleomorphic-adenoma',
    'karcinom z pleomorfniho adenomu': 'carcinoma-ex-pleomorphic-adenoma',
    karcinosarkom: 'carcinosarcoma',
    'špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní':
        'poorly-differentiated-carcinoma',
    'lymfoepiteliální karcinom': 'lymphoepithelial-carcinoma',
    'skvamocelulární karcinom': 'squamous-cell-carcinoma',
    'mikrosekretorický adenokarcinom': 'microsecretory-adenocarcinoma',
    'sklerózující mikrocystický adenokarcinom':
        'sclerosing-microcystic-adenocarcinoma',
    'mucinózní adenokarcinom': 'mucinous-adenocarcinoma',
    sialoblastom: 'asialoblastoma',
    'MALT-lymfom': 'malt-lymphoma',
    jiné: 'other',
    other: 'other',
}

// Maps Czech subtype strings to translation keys, keyed by the Czech subtype field name
const czechSubtypeToKey: Record<string, Record<string, string>> = {
    mukoepidermoidni_karcinom: {
        'low grade': 'low-grade',
        'intermediate grade': 'intermediate-grade',
        'high grade': 'high-grade',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    adenoidne_cysticky_karcinom: {
        's převahou tubulární/kribriformní složky': 'tubular-cribriform-dominant',
        '>30% solidní složky': 'more-than-30-solid-component',
        'high grade': 'subtype-not-specified',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    polymorfni_adenokarcinom: {
        klasický: 'classic',
        kribriformní: 'cribriform',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    intraduktalni_karcinom: {
        'podobný vmezeřenému vývodu': 'intercalated-duct-like',
        apokrinní: 'apocrine',
        onkocytární: 'oncocytic',
        smíšený: 'mixed',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    salivarni_karcinom_nos: {
        'onkocytární adenokarcinom': 'oncocytic-adenocarcinoma',
        'adenokarcinom intestinálního typu': 'intestinal-type-adenocarcinoma',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    karcinom_z_pleomorfniho_adenomu: {
        intrakapsulární: 'intracapsular',
        'minimálně invazivní': 'minimally-invasive',
        invazivní: 'invasive',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
    spatne_diferencovany_karcinom: {
        'nediferencovaný karcinom': 'undifferentiated-carcinoma',
        'velkobuněčný neuroendokrinní karcinom':
            'large-cell-neuroendocrine-carcinoma',
        'malobuněčný neuroendokrinní karcinom':
            'small-cell-neuroendocrine-carcinoma',
        'subtyp nebyl určen': 'subtype-not-specified',
    },
}

// The suffixes used for each subtype field group
const subtypeFieldSuffixes = ['_histopatologie', '_core', '_otevrena']

// Maps TNM8 string codes to tnm_value_definition IDs (edition_id=1)
const tnm8TToId: Record<string, number> = {
    TX: 1,
    T1: 2,
    T2: 3,
    T3: 4,
    T4a: 5,
    T4b: 6,
}

const tnm8NToId: Record<string, number> = {
    N0: 7,
    N1: 8,
    N2a: 9,
    N2b: 10,
    N2c: 11,
    N3a: 12,
    N3b: 13,
}

const tnm8MToId: Record<string, number> = {
    M0: 14,
    M1: 15,
}

const tnm8StageToId: Record<string, number> = {
    'Stage I': 16,
    'Stage II': 17,
    'Stage III': 18,
    'Stage IVA': 19,
    'Stage IVB': 20,
    'Stage IVC': 21,
}

function mapHistologyField(
    patient: PatientType,
    fieldName: string
): void {
    const value = patient[fieldName] as string | undefined
    if (!value) return
    const key = czechHistologyTypeToKey[value]
    if (key) {
        patient[fieldName] = key
    }
}

function mapSubtypeFields(patient: PatientType): void {
    for (const [baseKey, mapping] of Object.entries(czechSubtypeToKey)) {
        for (const suffix of subtypeFieldSuffixes) {
            const fieldName = `${baseKey}${suffix}`
            const value = patient[fieldName] as string | undefined
            if (!value) continue
            const key = mapping[value]
            if (key) {
                patient[fieldName] = key
            }
        }
    }
}

function mapTnmFields(patient: PatientType): void {
    const p = patient as Record<string, unknown>

    const clinicalT = p['t_klasifikace_klinicka'] as string | undefined
    const clinicalN = p['n_klasifikace_klinicka'] as string | undefined
    const clinicalM = p['m_klasifikace_klinicka'] as string | undefined
    const clinicalStage = p['tnm_klasifikace_klinicka'] as string | undefined

    const pathologicalT = p['t_klasifikace_patologicka'] as string | undefined
    const pathologicalN = p['n_klasifikace_patologicka'] as string | undefined
    const pathologicalM = p['m_klasifikace_patologicka'] as string | undefined
    const pathologicalStage = p['tnm_klasifikace_patologicka'] as
        | string
        | undefined

    if (clinicalT) p['t_klasifikace_klinicka_id'] = tnm8TToId[clinicalT]
    if (clinicalN) p['n_klasifikace_klinicka_id'] = tnm8NToId[clinicalN]
    if (clinicalM) p['m_klasifikace_klinicka_id'] = tnm8MToId[clinicalM]
    if (clinicalStage)
        p['tnm_klasifikace_klinicka_id'] = tnm8StageToId[clinicalStage]

    if (pathologicalT)
        p['t_klasifikace_patologicka_id'] = tnm8TToId[pathologicalT]
    if (pathologicalN)
        p['n_klasifikace_patologicka_id'] = tnm8NToId[pathologicalN]
    if (pathologicalM)
        p['m_klasifikace_patologicka_id'] = tnm8MToId[pathologicalM]
    if (pathologicalStage)
        p['tnm_klasifikace_patologicka_id'] = tnm8StageToId[pathologicalStage]

    p['id_edition'] = 1
}

/**
 * Transforms a patient object read from a legacy Excel export (without id_edition)
 * into the format expected by the current PatientMapper/PatientRepository pipeline:
 * - Maps Czech histology type strings to English translation keys
 * - Maps Czech subtype strings to English translation keys
 * - Maps TNM string codes to TNM8 numeric IDs and sets id_edition=1
 */
export function transformLegacyPatient(patient: PatientType): PatientType {
    mapHistologyField(patient, 'histopatologie_vysledek')
    mapHistologyField(patient, 'core_vysledek')
    mapHistologyField(patient, 'otevrena_vysledek')
    mapSubtypeFields(patient)
    mapTnmFields(patient)
    return patient
}
