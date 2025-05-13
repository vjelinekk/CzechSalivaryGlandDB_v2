export enum DescriptiveStatisticsType {
    ALL = 'all',
    MALIGNANT = 'malignant',
    BENIGN = 'benign',
}

export enum InferenceChiSquareCategories {
    histologicalTypes = "histologicalTypes",
    tClassification = "tClassification",
    nClassification = "nClassification",
    mClassification = "mClassification",
    persistence = "persistence",
    recurrence = "recurrence",
    state = "state"
}

export enum InferenceChiSquareHistologicalTypes {
    ACIONNUCLEAR_CARCINOMA = "acinocelulární karcinom",
    SECRETORY_CARCINOMA = "sekretorický karcinom",
    MUCOEPIDERMOID_CARCINOMA = "mukoepidermoidní karcinom",
    ADENOID_CYSTIC_CARCINOMA = "adenoidně cystický karcinom",
    POLYMORPHIC_ADENOCARCINOMA = "polymorfní adenokarcinom",
    EPITHELIAL_MYOEPITHELIAL_CARCINOMA = "epiteliální myoepiteliální karcinom",
    HYALINIZING_CARCINOMA_OF_CLEAR_CELLS = "hyalinizující karcinom ze světlých buněk",
    BASAL_CELL_ADENOCARCINOMA = "bazocelulární adenokarcinom",
    SEBACEOUS_ADENOCARCINOMA = "sebaceózní adenokarcinom",
    INTRADUCTAL_CARCINOMA = "intraduktální karcinom",
    SALIVARY_CARCINOMA_NOS = "salivární karcinom NOS",
    SALIVARY_DUCT_CARCINOMA = "salivární duktální karcinom",
    MYOEPITHELIAL_CARCINOMA = "myoepiteliální karcinom",
    CARCINOMA_FROM_PLEOMORPHIC_ADENOMA = "karcinom z pleomorfního adenomu",
    CARCINOSARCOMA = "karcinosarkom",
    POORLY_DIFERENTIATED_CARCINOMA = "špatně diferencovaný karcinom: neuroendokrinní a nonneuroendokrinní",
    LYMPHOEPITHELIAL_CARCINOMA = "lymfoepiteliální karcinom",
    SQUAMOUS_CELL_CARCINOMA = "skvamocelulární karcinom",
    MICROSECRETORY_ADENOCARCINOMA = "mikrosekretorický adenokarcinom",
    SCLEROSING_MICROCYSTIC_ADENOCARCINOMA = "sklerózující mikrocystický adenokarcinom",
    MUCINOUS_ADENOCARCINOMA = "mucinózní adenokarcinom",
    SIALOBLASTOMA = "sialoblastom",
    MALT_LYMPHOMA = "MALT-lymfom"
}

export enum InferenceChiSquareTClassification {
    TX = "TX",
    T1 = "T1",
    T2 = "T2",
    T3 = "T3",
    T4a = "T4a",
    T4b = "T4b"
}

export enum InferenceChiSquareNClassification {
    N0 = "N0",
    N1 = "N1",
    N2a = "N2a",
    N2b = "N2b",
    N2 = "N2",
    N3 = "N3"
}

export enum InferenceChiSquareMClassification {
    MX = "MX",
    M0 = "M0",
    M1 = "M1"
}

export enum InferenceChiSquarePersistence {
    Ano = "Ano",
    Ne = "Ne"
}

export enum InferenceChiSquareRecurrence {
    Ano = "Ano",
    Ne = "Ne"
}

export enum InferenceChiSquareState {
    Žije = "Žije",
    Zemřel = "Zemřel"
}
