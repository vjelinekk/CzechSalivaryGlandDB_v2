from typing import TypedDict, NotRequired

class Patient(TypedDict):
    """
    Structure of the patient data required for feature extraction
    """
    # Features
    age_at_diagnosis: NotRequired[int]
    therapy_type: NotRequired[str]
    id_histology_type: NotRequired[int]
    clinical_m_id: NotRequired[int | None]
    pathological_m_id: NotRequired[int | None]
    clinical_n_id: NotRequired[int | None]
    pathological_n_id: NotRequired[int | None]

    # Targets / Time calculation fields
    is_alive: NotRequired[bool]
    diagnosis_year: NotRequired[str]
    death_date: NotRequired[str | None]
    last_follow_up: NotRequired[str | None]
    recidive: NotRequired[bool]
    date_of_first_post_treatment_follow_up: NotRequired[str | None]
    date_of_recidive: NotRequired[str | None]
