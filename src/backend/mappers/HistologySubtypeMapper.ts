export class HistologySubtypeMapper {
    static mapHistologyTypeToSubtypeKey(
        histologyTypeId: number
    ): string | undefined {
        const mapping: { [key: number]: string } = {
            3: 'mukoepidermoidni_karcinom_histopatologie',
            4: 'adenoidne_cysticky_karcinom_histopatologie',
            5: 'polymorfni_adenokarcinom_histopatologie',
            10: 'intraduktalni_karcinom_histopatologie',
            11: 'salivarni_karcinom_nos_histopatologie',
            14: 'karcinom_z_pleomorfniho_adenomu_histopatologie',
            16: 'spatne_diferencovany_karcinom_histopatologie',
        }

        return mapping[histologyTypeId] || undefined
    }

    static mapSubtypeKeyToHistologyType(
        histologyTypeId: number,
        subtypeKey: string
    ): number | null {
        const mapping: { [key: number]: { [key: string]: number } } = {
            3: {
                'low-grade': 1,
                'intermediate-grade': 2,
                'high-grade': 3,
                'subtype-not-specified': 4,
            },
            4: {
                'tubular-cribriform-dominant': 5,
                'more-than-30-solid-component': 6,
                'subtype-not-specified': 7,
            },
            5: {
                classic: 8,
                cribriform: 9,
                'subtype-not-specified': 10,
            },
            10: {
                'intercalated-duct-like': 11,
                apocrine: 12,
                oncocytic: 13,
                mixed: 14,
                'subtype-not-specified': 15,
            },
            11: {
                'oncocytic-adenocarcinoma': 16,
                'intestinal-type-adenocarcinoma': 17,
                'subtype-not-specified': 18,
            },
            14: {
                intracapsular: 19,
                'minimally-invasive': 20,
                invasive: 21,
                'subtype-not-specified': 22,
            },
            16: {
                'undifferentiated-carcinoma': 23,
                'large-cell-neuroendocrine-carcinoma': 24,
                'small-cell-neuroendocrine-carcinoma': 25,
                'subtype-not-specified': 26,
            },
        }

        return mapping[histologyTypeId]?.[subtypeKey] || null
    }
}
