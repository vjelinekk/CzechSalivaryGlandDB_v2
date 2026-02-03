from typing import TypedDict, NotRequired

from ml_types import ModelModeEnum
from ml_types.model_types import TrainResultMetadata, SurvivalPredictionResult, RecurrencePredictionResult, \
    ModelInfoResult


class BaseOutputData(TypedDict):
    """
    Structure of output data from ML engine
    """
    success: bool

class SuccessOutputData(BaseOutputData):
    """
    Output structure for successful operations
    """
    mode: ModelModeEnum
    result: TrainResultMetadata | SurvivalPredictionResult | RecurrencePredictionResult | ModelInfoResult

class ErrorOutputData(BaseOutputData):
    """
    Output structure for failed operations
    """
    error: str