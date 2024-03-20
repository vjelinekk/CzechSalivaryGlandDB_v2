import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FilteredColumns } from '../types'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FormType } from '../constants'

interface FiltrationCheckboxProps {
    label: string
    dbValue: string | FormType
    filterLabel: string
    filteredColumns: FilteredColumns
    setFilteredColumns: Dispatch<SetStateAction<FilteredColumns>>
}

const FiltrationCheckbox: React.FC<FiltrationCheckboxProps> = ({
    label,
    dbValue,
    filterLabel,
    filteredColumns,
    setFilteredColumns,
}) => {
    const setDefaultChecked = () => {
        if (filterLabel === 'form_type') {
            return (filteredColumns[filterLabel] as FormType[]).includes(
                dbValue as FormType
            )
        } else {
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
        if (currChecked) {
            setFilteredColumns((prev) => {
                if (filterLabel === 'form_type') {
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
                if (filterLabel === 'form_type') {
                    return {
                        ...prev,
                        [filterLabel]: (prev[filterLabel] as FormType[]).filter(
                            (item) => item !== dbValue
                        ),
                    }
                } else {
                    return {
                        ...prev,
                        [filterLabel]: (prev[filterLabel] as string[]).filter(
                            (item) => item !== dbValue
                        ),
                    }
                }
            })
            setChecked(false)
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
