"""
Input validation functions for ML engine
"""

from typing import Any
from ml_types import InputData, ModelModeEnum


def validate_input(data: dict[str, Any]) -> InputData:
    """
    Validate input structure and return properly typed InputData

    Args:
        data: Raw dictionary loaded from JSON

    Returns:
        Validated and typed InputData

    Raises:
        ValueError: If input structure is invalid or missing required fields
    """
    mode = data.get('mode')

    if mode == ModelModeEnum.TRAIN:
        # Validate train mode required fields
        required = ['algorithm', 'model_type', 'model_path', 'data']
        missing = [f for f in required if f not in data]
        if missing:
            raise ValueError(f"Train mode missing required fields: {', '.join(missing)}")

        if 'patients' not in data.get('data', {}):
            raise ValueError("Train mode requires 'data.patients' field")

        return data  # Type narrowed to TrainInputData

    elif mode == ModelModeEnum.PREDICT:
        # Validate predict mode required fields
        if 'model_path' not in data:
            raise ValueError("Predict mode requires 'model_path' field")
        if 'data' not in data:
            raise ValueError("Predict mode requires 'data' field")
        if 'patient' not in data.get('data', {}):
            raise ValueError("Predict mode requires 'data.patient' field")

        return data  # Type narrowed to PredictInputData

    elif mode == ModelModeEnum.INFO:
        # Validate info mode required fields
        if 'model_path' not in data:
            raise ValueError("Info mode requires 'model_path' field")

        return data  # Type narrowed to InfoInputData

    else:
        valid_modes = [ModelModeEnum.TRAIN, ModelModeEnum.PREDICT, ModelModeEnum.INFO]
        raise ValueError(
            f"Invalid mode: '{mode}'. Must be one of: {', '.join(valid_modes)}"
        )
