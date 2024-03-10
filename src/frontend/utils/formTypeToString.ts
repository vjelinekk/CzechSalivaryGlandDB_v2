import { FormType } from '../constants'

export const formTypeToString = (formType: FormType) => {
    switch (formType) {
        case FormType.priusni:
            return 'příušní'
        case FormType.podjazykove:
            return 'podjazyková'
        case FormType.podcelistni:
            return 'podčelistní'
    }
}
