import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FilterColumn, FilteredColumns, TumorType } from '../types'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FormType } from '../constants'

interface FiltrationCheckboxProps {
    label: string
    dbValue: string | FormType | TumorType
    filterLabel: FilterColumn
    filteredColumns: FilteredColumns
    setFilteredColumns: Dispatch<SetStateAction<FilteredColumns>>
    isSingleCheckGroup?: boolean
}

const FiltrationCheckbox: React.FC<FiltrationCheckboxProps> = ({
    label,
    dbValue,
    filterLabel,
    filteredColumns,
    setFilteredColumns,
    isSingleCheckGroup = false,
}) => {
    const setDefaultChecked = () => {
        if (isSingleCheckGroup) {
            if (filterLabel === FilterColumn.TYP_NADORU) {
                return (
                    (filteredColumns[filterLabel] as TumorType) ===
                    (dbValue as TumorType)
                )
            }

            return (
                (filteredColumns[filterLabel] as string) === (dbValue as string)
            )
        } else {
            if (filterLabel === FilterColumn.FORM_TYPE) {
                return (filteredColumns[filterLabel] as FormType[]).includes(
                    dbValue as FormType
                )
            }

            return (filteredColumns[filterLabel] as string[]).includes(
                dbValue as string
            )
        }
    }

    const [checked, setChecked] = useState(setDefaultChecked())

    useEffect(() => {
        setChecked(setDefaultChecked())
    }, [filteredColumns])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currChecked = event.target.checked
        if (isSingleCheckGroup) {
            if (currChecked) {
                setFilteredColumns((prev) => ({
                    ...prev,
                    [filterLabel]:
                        filterLabel === FilterColumn.TYP_NADORU
                            ? (dbValue as TumorType)
                            : (dbValue as string),
                }))
                setChecked(true)
            } else {
                setFilteredColumns((prev) => ({
                    ...prev,
                    [filterLabel]: null,
                }))
                setChecked(false)
            }
        } else {
            if (currChecked) {
                setFilteredColumns((prev) => {
                    if (filterLabel === FilterColumn.FORM_TYPE) {
                        return {
                            ...prev,
                            [filterLabel]: [
                                ...(prev[filterLabel] as FormType[]),
                                dbValue as FormType,
                            ],
                        }
                    } else {
                        return {
                            ...prev,
                            [filterLabel]: [
                                ...(prev[filterLabel] as string[]),
                                dbValue as string,
                            ],
                        }
                    }
                })
                setChecked(true)
            } else {
                setFilteredColumns((prev) => {
                    if (filterLabel === FilterColumn.FORM_TYPE) {
                        return {
                            ...prev,
                            [filterLabel]: (
                                prev[filterLabel] as FormType[]
                            ).filter((item) => item !== dbValue),
                        }
                    } else {
                        return {
                            ...prev,
                            [filterLabel]: (
                                prev[filterLabel] as string[]
                            ).filter((item) => item !== dbValue),
                        }
                    }
                })
                setChecked(false)
            }
        }
    }

    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={label}
        />
    )
}

export default FiltrationCheckbox
