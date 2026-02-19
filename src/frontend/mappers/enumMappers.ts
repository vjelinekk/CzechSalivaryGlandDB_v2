import { FormType, KaplanMeierType, StudyType } from '../constants'
import { InferenceChiSquareCategories } from '../enums/statistics.enums'
import { FilteredColumns, Study, TumorType } from '../types'
import { FormTypeEnum } from '../../ipc/dtos/enums/FormTypeEnum'
import { InferenceChiSquareCategoriesEnum } from '../../ipc/dtos/enums/InferenceChiSquareCategoriesEnum'
import { KaplanMeierTypeEnum } from '../../ipc/dtos/enums/KaplanMeierTypeEnum'
import { TumorTypeEnum } from '../../ipc/dtos/enums/TumorTypeEnum'
import { StudyTypeEnum } from '../../ipc/dtos/enums/StudyTypeEnum'
import { FilteredColumnsDto } from '../../ipc/dtos/FilteredColumnsDto'
import { StudyDto } from '../../ipc/dtos/StudyDto'

/**
 * Maps frontend FormType enum to IPC FormTypeEnum.
 * Type-safe: TypeScript will error if FormType gains a new value not mapped here.
 */
export const formTypeToDto: Record<FormType, FormTypeEnum> = {
    [FormType.submandibularMalignant]: FormTypeEnum.submandibularMalignant,
    [FormType.sublingualMalignant]: FormTypeEnum.sublingualMalignant,
    [FormType.parotidMalignant]: FormTypeEnum.parotidMalignant,
    [FormType.submandibularBenign]: FormTypeEnum.submandibularBenign,
    [FormType.parotidBenign]: FormTypeEnum.parotidBenign,
}

/**
 * Maps IPC FormTypeEnum back to frontend FormType.
 * Type-safe: TypeScript will error if FormTypeEnum gains a new value not mapped here.
 */
export const dtoToFormType: Record<FormTypeEnum, FormType> = {
    [FormTypeEnum.submandibularMalignant]: FormType.submandibularMalignant,
    [FormTypeEnum.sublingualMalignant]: FormType.sublingualMalignant,
    [FormTypeEnum.parotidMalignant]: FormType.parotidMalignant,
    [FormTypeEnum.submandibularBenign]: FormType.submandibularBenign,
    [FormTypeEnum.parotidBenign]: FormType.parotidBenign,
}

/**
 * Maps frontend InferenceChiSquareCategories enum to IPC InferenceChiSquareCategoriesEnum.
 * Type-safe: TypeScript will error if InferenceChiSquareCategories gains a new value not mapped here.
 */
export const chiSquareCategoriesToDto: Record<
    InferenceChiSquareCategories,
    InferenceChiSquareCategoriesEnum
> = {
    [InferenceChiSquareCategories.histologicalTypes]:
        InferenceChiSquareCategoriesEnum.histologicalTypes,
    [InferenceChiSquareCategories.tClassification]:
        InferenceChiSquareCategoriesEnum.tClassification,
    [InferenceChiSquareCategories.nClassification]:
        InferenceChiSquareCategoriesEnum.nClassification,
    [InferenceChiSquareCategories.mClassification]:
        InferenceChiSquareCategoriesEnum.mClassification,
    [InferenceChiSquareCategories.persistence]:
        InferenceChiSquareCategoriesEnum.persistence,
    [InferenceChiSquareCategories.recurrence]:
        InferenceChiSquareCategoriesEnum.recurrence,
    [InferenceChiSquareCategories.state]:
        InferenceChiSquareCategoriesEnum.state,
}

/**
 * Maps IPC InferenceChiSquareCategoriesEnum back to frontend InferenceChiSquareCategories.
 * Type-safe: TypeScript will error if InferenceChiSquareCategoriesEnum gains a new value not mapped here.
 */
export const dtoToChiSquareCategories: Record<
    InferenceChiSquareCategoriesEnum,
    InferenceChiSquareCategories
> = {
    [InferenceChiSquareCategoriesEnum.histologicalTypes]:
        InferenceChiSquareCategories.histologicalTypes,
    [InferenceChiSquareCategoriesEnum.tClassification]:
        InferenceChiSquareCategories.tClassification,
    [InferenceChiSquareCategoriesEnum.nClassification]:
        InferenceChiSquareCategories.nClassification,
    [InferenceChiSquareCategoriesEnum.mClassification]:
        InferenceChiSquareCategories.mClassification,
    [InferenceChiSquareCategoriesEnum.persistence]:
        InferenceChiSquareCategories.persistence,
    [InferenceChiSquareCategoriesEnum.recurrence]:
        InferenceChiSquareCategories.recurrence,
    [InferenceChiSquareCategoriesEnum.state]:
        InferenceChiSquareCategories.state,
}

export const kaplanMeierTypeToDto: Record<
    KaplanMeierType,
    KaplanMeierTypeEnum
> = {
    [KaplanMeierType.recidive]: KaplanMeierTypeEnum.recidive,
    [KaplanMeierType.survival]: KaplanMeierTypeEnum.survival,
}

/**
 * Maps frontend TumorType enum to IPC TumorTypeEnum.
 */
export const tumorTypeToDto: Record<TumorType, TumorTypeEnum> = {
    [TumorType.MALIGNANT]: TumorTypeEnum.MALIGNANT,
    [TumorType.BENIGN]: TumorTypeEnum.BENIGN,
}

/**
 * Converts frontend FilteredColumns to IPC FilteredColumnsDto.
 * Maps all enum fields to their DTO equivalents.
 */
export const filteredColumnsToDto = (
    filters: FilteredColumns
): FilteredColumnsDto => {
    return {
        ...filters,
        form_type: filters.form_type.map((ft) => formTypeToDto[ft]),
        typ_nadoru: filters.typ_nadoru
            ? tumorTypeToDto[filters.typ_nadoru]
            : null,
    } as FilteredColumnsDto
}

/**
 * Maps frontend StudyType enum to IPC StudyTypeEnum.
 */
export const studyTypeToDto: Record<StudyType, StudyTypeEnum> = {
    [StudyType.submandibular]: StudyTypeEnum.submandibular,
    [StudyType.sublingual]: StudyTypeEnum.sublingual,
    [StudyType.parotid]: StudyTypeEnum.parotid,
    [StudyType.special]: StudyTypeEnum.special,
}

/**
 * Maps IPC StudyTypeEnum back to frontend StudyType.
 */
export const dtoToStudyType: Record<StudyTypeEnum, StudyType> = {
    [StudyTypeEnum.submandibular]: StudyType.submandibular,
    [StudyTypeEnum.sublingual]: StudyType.sublingual,
    [StudyTypeEnum.parotid]: StudyType.parotid,
    [StudyTypeEnum.special]: StudyType.special,
}

/**
 * Converts frontend Study to IPC StudyDto.
 */
export const studyToDto = (study: Study): StudyDto => {
    return {
        ...study,
        typ_studie: study.typ_studie
            ? studyTypeToDto[study.typ_studie]
            : undefined,
    }
}

/**
 * Converts IPC StudyDto to frontend Study.
 */
export const dtoToStudy = (dto: StudyDto): Study => {
    return {
        ...dto,
        typ_studie: dto.typ_studie ? dtoToStudyType[dto.typ_studie] : undefined,
    }
}

/**
 * Converts array of frontend Study to array of IPC StudyDto.
 */
export const studyArrayToDto = (studies: Study[]): StudyDto[] => {
    return studies.map(studyToDto)
}

/**
 * Converts array of IPC StudyDto to array of frontend Study.
 */
export const dtoToStudyArray = (dtos: StudyDto[]): Study[] => {
    return dtos.map(dtoToStudy)
}
