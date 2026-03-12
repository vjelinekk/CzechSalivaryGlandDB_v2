# Adding or Changing ML Features Plan

This guide outlines the steps required to introduce new clinical features into the Machine Learning risk scoring model or modify existing ones.

## 1. Python ML Engine Updates

### 1.1. Update Patient Type Definition
Add the new field to the `Patient` TypedDict in `python-ml-engine/ml_types/patient.py`. This ensures type safety throughout the Python pipeline.

```python
class Patient(TypedDict):
    # ... existing fields
    new_clinical_feature: NotRequired[str | int | float]
```

### 1.2. Update Feature Definitions
In `python-ml-engine/feature_extractor.py`, register the new field in the `_define_features` method.

- **Numeric features**: Add to `self.numeric_features`. These will be median-imputed and z-score standardized.
- **Categorical features**: Add to `self.categorical_features`. These will be mode-imputed and one-hot encoded.

### 1.3. Implement Custom Extraction (Optional)
If the feature requires logic before being used (e.g., combining two fields or a fallback), implement it in:
- `_extract_numeric` for continuous data.
- `_extract_categorical` for discrete data.

### 1.4. Update Feature Decoding
Update the `decode_feature_name` method in `feature_extractor.py`.
- If it's a **categorical** feature, ensure the stripping of the prefix works.
- If it's a **TNM-style ID**, add the ID-to-Code mapping to the `tnm_map` dictionary so the frontend shows "M1" instead of "15".

## 2. Backend (TypeScript) Updates

### 2.1. Patient Mapper
The most critical step is ensuring the data actually reaches the Python engine. Update `src/backend/mappers/PatientMapper.ts` to include the new database field in the object passed to the `mlService`.

### 2.2. DTO and Entity Types
Ensure the field is defined in:
- `src/backend/db-entities/PatientEntity.ts` (or the specific sub-entity).
- `src/ipc/dtos/BasePatientDto.ts`.

## 3. Frontend Updates

### 3.1. Translations
Add the translation for the feature name to `public/locales/*.json`. The `PatientRiskCard` uses `t(factor.feature)` to display the label.

### 3.2. Mapping Logic (if needed)
If the new feature is a clinical code that shouldn't be translated (like TNM), add it to the exclusion list in `src/frontend/components/patient-risk-card.tsx` inside the `isTNM` or a similar check.

## 4. Considerations & Best Practices

- **Overfitting**: Do not add too many features if the dataset is small (~50 patients). Aim for high-impact clinical variables.
- **Missing Data**: Check the "Completeness" of the data in the database. If a feature is 90% empty, it will default to the median/mode and provide little value to the model.
- **Retraining**: After adding a feature, you **must** retrain the model via the "Statistics -> ML Risk Scoring" tab for the changes to take effect in predictions.
