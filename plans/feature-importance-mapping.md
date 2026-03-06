# Feature Importance Mapping Plan

This plan outlines the changes required to map the ML engine's internal feature names (e.g., `n_stage_8`) back to human-readable clinical codes or translated feature names for display in the frontend.

## 1. Python ML Engine Changes

### 1.1. Type System Updates
Update `python-ml-engine/ml_types/model_types.py` to make `value` a mandatory field in the `RiskFactor` definition.

```python
class RiskFactor(TypedDict):
    feature: str
    value: str  # Mandatory: Clinical code (e.g., "N1", "M0") or "numeric" for continuous fields
    importance: float
```

### 1.2. Feature Extractor Enhancement
Add a `decode_feature_name(model_feature_name)` method to `FeatureExtractor` in `python-ml-engine/feature_extractor.py`.
- **Logic**:
    - **TNM Mapping**: If the name starts with `n_stage_`, `m_stage_`, etc., strip the prefix and map the resulting ID to its clinical code (e.g., `8` -> `"N1"`, `14` -> `"M0"`).
    - **Other Categorical**: For fields like `therapy_type_surgery`, return the raw categorical value (`"surgery"`).
    - **Numeric**: For numeric fields like `age_at_diagnosis`, return `"numeric"` as the value.
    - **Field Aliasing**: Ensure `n_stage` and `m_stage` are mapped to their frontend-compatible keys if necessary.

### 1.3. Handler Logic
Update `handle_predict` in `python-ml-engine/ml_engine.py` to iterate through the importance pairs and apply the `decode_feature_name` logic to each.

## 2. IPC and Frontend Changes

### 2.1. DTO Update
Update `src/ipc/dtos/MLPredictionResultDto.ts` to include the mandatory `value` field in `top_risk_factors`.

### 2.2. Patient Risk Card UI Integration
Update the rendering logic in `src/frontend/components/patient-risk-card.tsx` for each risk factor:
- **Case A: Numeric Feature** (value is `"numeric"`):
    - Display the translated feature name: `{t(factor.feature)}` (e.g., "Věk při diagnóze").
- **Case B: Categorical Feature** (value is a specific code/string):
    - **TNM**: If the value is a TNM code (N1, M0, etc.), display it raw: `{factor.value}`.
    - **Others**: If it's a general categorical value (e.g., "surgery"), display the translated value: `{t(factor.value)}`.

## 3. Validation
1.  **Backend**: Verify `cat predict_input.json | python3 ml_engine.py` returns `{"feature": "n_stage", "value": "N1", ...}`.
2.  **Frontend**: Verify the `PatientRiskCard` displays "Věk při diagnóze" instead of `age_at_diagnosis` and "N1" instead of `n_stage_8`.
