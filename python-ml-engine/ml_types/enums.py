"""
Enums for ML Engine
"""

from enum import StrEnum

class ModelModeEnum(StrEnum):
    """
    Modes of operation for ML engine
    """
    TRAIN = "train"
    PREDICT = "predict"
    INFO = "info"

class ModelTypeEnum(StrEnum):
    """
    Types of models supported
    """
    OVERALL_SURVIVAL = "overall_survival"
    RECURRENCE = "recurrence"

class AlgorithmTypeEnum(StrEnum):
    """
    Algorithms supported for survival analysis
    """
    RSF = "rsf"       # Random Survival Forest
    COXPH = "coxph"   # Cox Proportional Hazards
