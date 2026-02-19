"""
Input data type definitions for ML engine with discriminated union
"""

from typing import TypedDict, Union, Literal, Any

from ml_types import ModelTypeEnum, AlgorithmTypeEnum
from .patient import Patient


# Data payload types for each mode
class TrainDataPayload(TypedDict):
    """Data payload for train mode"""
    patients: list[Patient]


class PredictDataPayload(TypedDict):
    """Data payload for predict mode"""
    patient: Patient


# Input types for each mode (discriminated by 'mode' field)
class TrainInputData(TypedDict):
    """Input structure for train mode"""
    mode: Literal['train']
    model_type: ModelTypeEnum
    algorithm: AlgorithmTypeEnum
    model_path: str
    data: TrainDataPayload


class PredictInputData(TypedDict):
    """Input structure for predict mode"""
    mode: Literal['predict']
    model_path: str
    data: PredictDataPayload


class InfoInputData(TypedDict):
    """Input structure for info mode"""
    mode: Literal['info']
    model_path: str


# Union of all input types (discriminated by 'mode')
InputData = Union[TrainInputData, PredictInputData, InfoInputData]
