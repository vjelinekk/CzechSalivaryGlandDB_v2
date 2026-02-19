export interface MLPredictionResultDto {
    risk_score: number
    top_risk_factors: Array<{ feature: string; importance: number }>
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
