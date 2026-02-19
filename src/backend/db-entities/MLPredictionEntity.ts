export interface MLPredictionEntity {
    id: number
    id_patient: number
    id_model: number
    model_type: string
    algorithm: string
    risk_score: number
    result_json: string
    calculation_date: string
}
