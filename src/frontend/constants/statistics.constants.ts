import { InferenceChiSquareCategories } from '../enums/statistics.enums'

export const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#9c27b0',
    '#e91e63',
    '#3f51b5',
]

export const CATEGORY_TITLES: Record<InferenceChiSquareCategories, string> = {
    [InferenceChiSquareCategories.histologicalTypes]:
        'Histologický typ nádoru - možnosti k výběru',
    [InferenceChiSquareCategories.tClassification]:
        'T klasifikace - možnosti k výběru',
    [InferenceChiSquareCategories.nClassification]:
        'N klasifikace - možnosti k výběru',
    [InferenceChiSquareCategories.mClassification]:
        'M klasifikace - možnosti k výběru',
    [InferenceChiSquareCategories.persistence]:
        'Perzistence - možnosti k výběru',
    [InferenceChiSquareCategories.recurrence]: 'Recidiva - možnosti k výběru',
    [InferenceChiSquareCategories.state]: 'Stav pacienta - možnosti k výběru',
}

export const TAB_TITLES: Record<InferenceChiSquareCategories, string> = {
    [InferenceChiSquareCategories.histologicalTypes]: 'Histologický typ',
    [InferenceChiSquareCategories.tClassification]: 'T klasifikace',
    [InferenceChiSquareCategories.nClassification]: 'N klasifikace',
    [InferenceChiSquareCategories.mClassification]: 'M klasifikace',
    [InferenceChiSquareCategories.persistence]: 'Perzistence',
    [InferenceChiSquareCategories.recurrence]: 'Recidiva',
    [InferenceChiSquareCategories.state]: 'Stav pacienta',
}
