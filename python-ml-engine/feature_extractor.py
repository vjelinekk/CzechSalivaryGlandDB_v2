"""
Feature extraction and preprocessing for CSGDB patient data
Converts patient JSON records to ML-ready feature matrices
"""

from datetime import datetime
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

from ml_types import Patient, ModelTypeEnum


class FeatureExtractor:
    """Extracts and preprocesses clinical features from patient records"""

    def __init__(self):
        self.feature_names = []
        self.numeric_features = []
        self.categorical_features = []
        self.binary_features = []
        self.imputer_numeric = None
        self.imputer_categorical = None
        self.encoder = None
        self.scaler = None

    def fit_transform(self, patients: list[Patient], model_type: ModelTypeEnum = ModelTypeEnum.OVERALL_SURVIVAL):
        """
        Fit extractors on training data and transform to feature matrix

        Args:
            patients: List of patient dictionaries
            model_type: 'overall_survival' or 'recurrence'

        Returns:
            X: numpy array (n_patients, n_features)
            y_event: numpy array (n_patients,) - 1=event occurred, 0=censored
            y_time: numpy array (n_patients,) - time in days
            feature_names: list of feature names
        """
        # Convert to DataFrame
        df = pd.DataFrame(patients)

        # Define feature columns
        self._define_features()

        # Extract numeric features
        X_numeric = self._extract_numeric(df, fit=True)

        # Extract categorical features (one-hot encoded)
        X_categorical = self._extract_categorical(df, fit=True)

        # Combine features
        X = np.hstack([X_numeric, X_categorical])

        # Extract target variables (event, time)
        y_event, y_time = self._extract_targets(df, model_type)

        return X, y_event, y_time, self.feature_names

    def transform(self, patients: list[Patient]):
        """Transform new data using fitted extractors"""
        df = pd.DataFrame(patients)
        X_numeric = self._extract_numeric(df, fit=False)
        X_categorical = self._extract_categorical(df, fit=False)
        X = np.hstack([X_numeric, X_categorical])
        return X

    def _define_features(self):
        """Define which columns are numeric vs categorical

        SIMPLIFIED 5-FEATURE MODEL:
        1. age_at_diagnosis (numeric)
        2. therapy_type (categorical string)
        3. id_histology_type (categorical, IDs 1-24)
        4. m_stage (categorical, IDs 14-15) - uses pathological with fallback to clinical
        5. n_stage (categorical, IDs 7-13) - uses pathological with fallback to clinical
        """
        # 1 numeric feature
        self.numeric_features = ['age_at_diagnosis']

        # 4 categorical features
        self.categorical_features = [
            'therapy_type',         # treatment type (string)
            'id_histology_type',    # pathology type (ID)
            'm_stage',              # M stage with fallback (created by _apply_stage_fallback)
            'n_stage',              # N stage with fallback (created by _apply_stage_fallback)
        ]

        # No binary features in simplified model
        self.binary_features = []

    def _extract_numeric(self, df, fit=False):
        """Extract and preprocess numeric features"""
        # Get numeric columns (no binary features in simplified model)
        numeric_cols = self.numeric_features

        # Handle missing columns by filling with NaN
        for col in numeric_cols:
            if col not in df.columns:
                df[col] = np.nan

        X_numeric = df[numeric_cols].values.astype(float)

        # Handle missing values via median imputation
        if fit:
            self.imputer_numeric = SimpleImputer(strategy='median')
            X_numeric = self.imputer_numeric.fit_transform(X_numeric)

            # Standardize (z-score normalization)
            self.scaler = StandardScaler()
            X_numeric = self.scaler.fit_transform(X_numeric)
        else:
            X_numeric = self.imputer_numeric.transform(X_numeric)
            X_numeric = self.scaler.transform(X_numeric)

        return X_numeric

    def _extract_categorical(self, df, fit=False):
        """Extract and one-hot encode categorical features"""
        # Apply fallback logic for M and N stages before extraction
        df = self._apply_stage_fallback(df)

        # Handle missing columns
        for col in self.categorical_features:
            if col not in df.columns:
                df[col] = 'unknown'

        X_categorical = df[self.categorical_features].values

        # Handle missing values via most frequent
        if fit:
            self.imputer_categorical = SimpleImputer(strategy='most_frequent', fill_value='unknown')
            X_categorical = self.imputer_categorical.fit_transform(X_categorical)

            # One-hot encode
            self.encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
            X_categorical = self.encoder.fit_transform(X_categorical)

            # Build feature names
            self._build_feature_names()
        else:
            X_categorical = self.imputer_categorical.transform(X_categorical)
            X_categorical = self.encoder.transform(X_categorical)

        return X_categorical

    def _apply_stage_fallback(self, df):
        """Apply fallback from pathological to clinical stages

        Creates m_stage and n_stage columns with fallback logic:
        - m_stage: use pathological_m_id, fallback to clinical_m_id if missing
        - n_stage: use pathological_n_id, fallback to clinical_n_id if missing
        """
        df = df.copy()

        # M stage: pathological with fallback to clinical
        if 'pathological_m_id' in df.columns:
            df['m_stage'] = df['pathological_m_id'].fillna(
                df.get('clinical_m_id', pd.Series([None] * len(df)))
            )
        elif 'clinical_m_id' in df.columns:
            df['m_stage'] = df['clinical_m_id']
        else:
            df['m_stage'] = None

        # N stage: pathological with fallback to clinical
        if 'pathological_n_id' in df.columns:
            df['n_stage'] = df['pathological_n_id'].fillna(
                df.get('clinical_n_id', pd.Series([None] * len(df)))
            )
        elif 'clinical_n_id' in df.columns:
            df['n_stage'] = df['clinical_n_id']
        else:
            df['n_stage'] = None

        return df

    def _extract_targets(self, df, model_type):
        """
        Extract survival target variables

        For overall_survival:
            event: 1 if dead, 0 if alive
            time: days from diagnosis to death or last_follow_up

        For recurrence:
            event: 1 if recurred, 0 if no recurrence
            time: days from treatment to recurrence or last_follow_up
        """
        if model_type == 'overall_survival':
            # Event: death (1) or alive/censored (0)
            y_event = (~df['is_alive'].fillna(True).astype(bool)).astype(int).values

            # Time: Calculate days from diagnosis to death or last follow-up
            y_time = self._calculate_survival_time(df)

        elif model_type == 'recurrence':
            # Event: recurrence (1) or no recurrence (0)
            y_event = df['recidive'].fillna(False).astype(bool).astype(int).values

            # Time: Calculate days from treatment to recurrence or last follow-up
            y_time = self._calculate_recurrence_time(df)

        else:
            raise ValueError(f"Unknown model_type: {model_type}")

        # Ensure positive times (minimum 1 day)
        y_time = np.maximum(y_time, 1)

        return y_event, y_time

    def _calculate_survival_time(self, df):
        """Calculate time in days from diagnosis to death or last follow-up"""
        times = []

        for _, row in df.iterrows():
            # Get diagnosis date (year)
            diagnosis_year = row.get('diagnosis_year')

            if pd.isna(diagnosis_year):
                # If no diagnosis year, use a default time
                times.append(365)
                continue

            try:
                diagnosis_date = datetime(int(diagnosis_year), 1, 1)
            except (ValueError, TypeError):
                times.append(365)
                continue

            # If patient died, use death date
            if not row.get('is_alive', True):
                death_date_str = row.get('death_date')
                if death_date_str and not pd.isna(death_date_str):
                    try:
                        death_date = pd.to_datetime(death_date_str)
                        days = (death_date - diagnosis_date).days
                        times.append(max(days, 1))
                        continue
                    except:
                        pass

            # Otherwise use last follow-up
            last_followup_str = row.get('last_follow_up')
            if last_followup_str and not pd.isna(last_followup_str):
                try:
                    last_followup = pd.to_datetime(last_followup_str)
                    days = (last_followup - diagnosis_date).days
                    times.append(max(days, 1))
                    continue
                except:
                    pass

            # Default: 2 years
            times.append(730)

        return np.array(times, dtype=float)

    def _calculate_recurrence_time(self, df):
        """Calculate time in days from treatment to recurrence or last follow-up"""
        times = []

        for _, row in df.iterrows():
            # Get first post-treatment follow-up date
            treatment_date_str = row.get('date_of_first_post_treatment_follow_up')

            if pd.isna(treatment_date_str) or not treatment_date_str:
                # If no treatment date, use diagnosis year
                diagnosis_year = row.get('diagnosis_year', 2020)
                try:
                    treatment_date = datetime(int(diagnosis_year), 1, 1)
                except:
                    treatment_date = datetime(2020, 1, 1)
            else:
                try:
                    treatment_date = pd.to_datetime(treatment_date_str)
                except:
                    diagnosis_year = row.get('diagnosis_year', 2020)
                    try:
                        treatment_date = datetime(int(diagnosis_year), 1, 1)
                    except:
                        treatment_date = datetime(2020, 1, 1)

            # If recurrence occurred, use recurrence date
            if row.get('recidive', False):
                recurrence_date_str = row.get('date_of_recidive')
                if recurrence_date_str and not pd.isna(recurrence_date_str):
                    try:
                        recurrence_date = pd.to_datetime(recurrence_date_str)
                        days = (recurrence_date - treatment_date).days
                        times.append(max(days, 1))
                        continue
                    except:
                        pass

            # Otherwise use last follow-up
            last_followup_str = row.get('last_follow_up')
            if last_followup_str and not pd.isna(last_followup_str):
                try:
                    last_followup = pd.to_datetime(last_followup_str)
                    days = (last_followup - treatment_date).days
                    times.append(max(days, 1))
                    continue
                except:
                    pass

            # Default: 2 years
            times.append(730)

        return np.array(times, dtype=float)

    def _build_feature_names(self):
        """Build human-readable feature names"""
        numeric_names = self.numeric_features  # No binary features in simplified model
        categorical_names = self.encoder.get_feature_names_out(self.categorical_features)
        self.feature_names = list(numeric_names) + list(categorical_names)
