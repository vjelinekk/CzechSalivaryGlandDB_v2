export interface TnmValueDefinitionEntity {
    id?: number
    edition_id: number
    category: 'T' | 'N' | 'M' | 'G'
    code: string
    description: string
    sort_order: number
}
