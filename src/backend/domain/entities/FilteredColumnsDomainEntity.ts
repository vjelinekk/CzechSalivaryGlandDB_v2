import { FormType } from '../../constants'
import { TumorTypeDomainEnum } from '../enums/TumorTypeDomainEnum'
import { FilterColumnDomainEnum } from '../enums/FilterColumnDomainEnum'

export interface FilteredColumnsDomainEntity {
    [key: string]: string | string[] | FormType[] | TumorTypeDomainEnum
    [FilterColumnDomainEnum.FORM_TYPE]: FormType[]
    [FilterColumnDomainEnum.TYP_NADORU]: TumorTypeDomainEnum
    [FilterColumnDomainEnum.TYP_TERAPIE]: string[]
    [FilterColumnDomainEnum.HISTOPATOLOGIE_VYSLEDEK]: string[]
    [FilterColumnDomainEnum.PERZISTENCE]: string
    [FilterColumnDomainEnum.RECIDIVA]: string
    [FilterColumnDomainEnum.STAV]: string
    [FilterColumnDomainEnum.POHLAVI]: string
}
