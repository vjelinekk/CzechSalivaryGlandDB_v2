export interface MLPredictionResultDto {
    risk_score: number
    top_risk_factors: Array<{ feature: string; importance: number }>
    calculation_date?: string
    is_stale?: boolean // True if prediction was made with a model that is no longer active
    // Survival specific
    survival_probability_1year?: number
    survival_probability_3year?: number
    survival_probability_5year?: number
    // Recurrence specific
    recurrence_probability_1year?: number
    recurrence_probability_3year?: number
    recurrence_probability_5year?: number
    recurrence_free_probability_1year?: number
    recurrence_free_probability_3year?: number
    recurrence_free_probability_5year?: number
}
