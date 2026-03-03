
## Goal
Ensure the application correctly handles patients classified under different TNM editions (e.g., TNM8 vs. TNM9). New patients should use the current active edition, while existing patients must retain and display the edition they were originally classified with.

## Current Issues
1.  **DTO Incompleteness:** The `PatientDto` (backend) and `PatientData` (frontend) do not include the `id_edition` field.
2.  **Mapping Loss:** `PatientMapper.toDto` discards the `id_edition` during database-to-UI conversion.
3.  **Defaulting on Update:** `PatientMapper.toPersistence` (used during updates) always fetches the *active* edition instead of respecting the patient's original edition.
4.  **UI Hook Limitation:** The `useTnmData` hook always fetches the active edition, causing classification dropdowns to show incorrect options for older patients.

## Implementation Steps

### 1. Data Model Updates
- **Backend:** Update `BasePatientDto.ts` to include `id_edition?: number`.
- **Frontend:** Update `PatientData` interface in `src/frontend/types.ts` to include `id_edition?: number`.
- **Constants:** Add `id_edition` to the `dbLabels` enum in `src/frontend/constants.ts`.

### 2. Backend Logic (Mappers & Repositories)
- **Mapping to DTO:** Update `PatientMapper.toDto` and `mapStagingToDto` to include `staging.id_edition` in the resulting DTO.
- **Mapping to Persistence:** Modify `PatientMapper.toPersistence` to accept `id_edition` as an optional override from the DTO.
- **Repository Update:** In `patientRepository.ts`, update `insertPatient` and `updatePatient` to:
    1. Check if the incoming DTO has an `id_edition`.
    2. Use the DTO's `id_edition` if present; otherwise, fall back to the active edition.

### 3. Frontend Logic (Hooks & Components)
- **`useTnmData` Hook:** 
    - Modify the hook to accept an optional `initialEditionId`.
    - If `initialEditionId` is provided, fetch that specific edition and its values.
    - If not, fetch the active edition as it does now.
- **`TNMClassificationCalculator` Component:**
    - Extract `id_edition` from `formData`.
    - Pass this `id_edition` to the `useTnmData` hook.
    - This ensures that if a patient was saved with Edition ID 1 (TNM8), the calculator loads TNM8 options even if TNM9 is now active.

## Verification Strategy
1.  **Manual Database Check:** Manually set a patient's `id_edition` to a non-active version in `db.sqlite`.
2.  **View/Edit Test:** Open that patient in the app and verify the TNM options match the older edition.
3.  **Persistence Test:** Save the patient and verify the `id_edition` remains unchanged in the database.
4.  **New Patient Test:** Create a new patient and verify they receive the current active `id_edition`.
