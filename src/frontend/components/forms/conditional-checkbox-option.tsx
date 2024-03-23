import React, {
    ChangeEvent,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react'
import { PatientType } from '../../types'
import { CommonFormComponentProps } from '../../props'

export interface ConditionalCheckboxOptionProps {
    label: string
    children?:
        | React.ReactElement<CommonFormComponentProps>
        | React.ReactElement<CommonFormComponentProps>[]
    selected?: boolean
    onSelect?: () => void
    disabled: boolean
    setFormData: Dispatch<SetStateAction<PatientType | null>>
}

const ConditionalCheckboxOption: React.FC<ConditionalCheckboxOptionProps> = ({
    label,
    children,
    selected,
    onSelect,
    disabled,
    setFormData,
}) => {
    const [showChildren, setShowChildren] = useState(selected)

    useEffect(() => {
        if (selected == undefined) {
            return
        }
        if (!selected) {
            unsetChildren()
            setShowChildren(false)
        }
    }, [selected])

    const unsetChildrenRecursive = (
        child: React.ReactElement<CommonFormComponentProps>
    ) => {
        if (child.props.children) {
            if (Array.isArray(child.props.children)) {
                child.props.children.forEach((child) => {
                    unsetChildrenRecursive(
                        child as React.ReactElement<CommonFormComponentProps>
                    )
                })
            } else {
                unsetChildrenRecursive(
                    child.props.children as React.ReactElement
                )
            }
        }
        if (child.props.dbLabel !== undefined) {
            setFormData((prev) => {
                if (prev) {
                    prev[child.props.dbLabel] = null
                    return { ...prev }
                }
                return prev
            })
        }
    }

    const unsetChildren = () => {
        if (children) {
            if (Array.isArray(children)) {
                children.forEach((child) => {
                    unsetChildrenRecursive(child)
                })
            } else {
                const child =
                    children as React.ReactElement<CommonFormComponentProps>
                unsetChildrenRecursive(child)
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.checked

        if (selected && children) {
            setShowChildren(true)
        } else {
            setShowChildren(false)
        }

        if (onSelect) {
            onSelect()
        }
    }

    return (
        <>
            <div className="optionalCheckboxOptionDiv">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={handleChange}
                    disabled={disabled}
                />
                <p className="conditionalOptionLabel">{label}</p>
            </div>
            {showChildren && <div className="nestedDiv">{children}</div>}
        </>
    )
}

export default ConditionalCheckboxOption
