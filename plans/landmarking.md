# Landmarking Implementation Plan (CSGDB)

This plan outlines the implementation of a **Landmarking** framework within the Python ML Engine. It enables high-precision risk scoring for survivors/recurrence-free patients at clinical milestones (specifically the 3-year mark).

## 1. Core Concept: The "Smart Switcher"
Instead of a single global model, the engine will manage a **Model Bundle**.
- **Baseline Model ($t=0$):** Standard risk assessment from the date of diagnosis/treatment.
- **Landmark Model ($t=3$):** Specialized model trained only on patients who reached the 3-year (1,095 days) milestone without an event.
- **Automatic Detection:** The engine detects if a patient has already survived > 3 years and automatically provides the landmark-optimized score, while still allowing a comparison with the baseline.

## 2. Technical Strategy

### Phase A: Model Bundle Persistence
Update the saved model structure to support multiple sub-models within a single `.joblib` file.
- **Structure:**
  - `base_model`: RSF/CoxPH object for $t=0$.
  - `landmark_model`: RSF/CoxPH object for $t=3$ (if data permits).
  - `metadata`: Separate C-index, sample size, and event counts for both.

### Phase B: Feature Extraction Logic
Enhance `FeatureExtractor` to handle the "Milestone Shift":
1. **Filtering:** Drop patients with `survival_time < 1095` days.
2. **Time Shifting:** `y_time = y_time - 1095`.
3. **Feature Correction:** Increment `age_at_diagnosis` by `1095 / 365 = 3`.
4. **Validation:** Ensure the subset meets the minimum requirements (50 patients, 30 events).

### Phase C: Dual-Mode Training
Update `handle_train` in `ml_engine.py`:
1. Train the **Baseline** model on the full dataset.
2. Check if a **Landmark** model is feasible (enough survivors/events).
3. If feasible, train the **Landmark** model on the shifted subset.
4. Calculate C-index for both and save the **Bundle**.

### Phase D: "Compare & Switch" Prediction
Update `handle_predict` in `ml_engine.py`:
1. Calculate the patient's current **Observed Time** (Days since diagnosis/treatment).
2. If `observed_time >= 1095` AND a landmark model exists:
   - Calculate risk using the **Landmark Model** (with age/time shifts).
   - Calculate risk using the **Baseline Model** (for comparison).
   - Return both scores, their respective C-indices, and a `default_to_landmark` flag.
3. Otherwise, return only the **Baseline** score.

## 3. Implementation Steps

1. **Types:** Update `ml_types/model_types.py` and `input_types.py`.
2. **Feature Logic:** Update `feature_extractor.py` with `get_landmark_subset()`.
3. **Model Logic:** Update `survival_model.py` to support multi-model fitting and saving.
4. **Orchestration:** Update `ml_engine.py` to bridge the logic.
5. **Testing:** Create a `test_landmarking.py` suite to verify the "Smart Switch" and shift logic.

## 4. Clinician UI Requirements (Electron)
- **Transparency:** The UI should display which model is being used.
- **Comparison:** Show both C-indices so the clinician can judge model reliability.
- **Manual Control:** Provide a toggle to switch between Landmark and Baseline views if both are available.
