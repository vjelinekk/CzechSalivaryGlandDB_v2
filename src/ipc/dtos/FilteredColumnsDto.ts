import { TumorTypeEnum } from './enums/TumorTypeEnum'
import { FilterColumnEnum } from './enums/FilterColumnEnum'
import { FormTypeEnum } from './enums/FormTypeEnum'
export interface FilteredColumnsDto {
    [key: string]: string | string[] | FormTypeEnum[] | TumorTypeEnum
    [FilterColumnEnum.FORM_TYPE]: FormTypeEnum[]
    [FilterColumnEnum.TYP_NADORU]: TumorTypeEnum
    [FilterColumnEnum.TYP_TERAPIE]: string[]
    [FilterColumnEnum.HISTOPATOLOGIE_VYSLEDEK]: string[]
    [FilterColumnEnum.PERZISTENCE]: string
    [FilterColumnEnum.RECIDIVA]: string
    [FilterColumnEnum.STAV]: string
    [FilterColumnEnum.POHLAVI]: string
}
