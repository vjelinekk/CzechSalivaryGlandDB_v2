import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormType } from '../../constants'
import { Study } from '../../types'

interface AvailableStudiesProps {
    formType: FormType
    selectedStudies: Study[]
    setStudiesChanged: Dispatch<SetStateAction<boolean>>
    setSelectedStudies: Dispatch<SetStateAction<Study[]>>
    disabled: boolean
}

const AvailableStudies: React.FC<AvailableStudiesProps> = ({
    formType,
    selectedStudies,
    setStudiesChanged,
    setSelectedStudies,
    disabled,
}) => {
    const [studies, setStudies] = useState<Study[]>([])

    useEffect(() => {
        const getStudies = async () => {
            const studies = await window.api.getStudiesByFormType(formType)
            setStudies(studies)
        }

        getStudies()
    }, [])

    const handleCheckboxChange = (study: Study) => {
        if (
            selectedStudies.some(
                (selectedStudy) => selectedStudy.id === study.id
            )
        ) {
            setSelectedStudies(
                selectedStudies.filter(
                    (selectedStudy) => selectedStudy.id !== study.id
                )
            )
        } else {
            setSelectedStudies([...selectedStudies, study])
        }

        if (setStudiesChanged) {
            setStudiesChanged(true)
        }
    }

    return (
        <div className="sectionDiv">
            <h1>Studie</h1>
            <div className="wrapper">
                <table id="patient-table">
                    <tbody id="patients-tbody">
                        {studies.map((study, index) => (
                            <tr key={index}>
                                <td style={{ display: 'flex', margin: '10px' }}>
                                    <input
                                        key={study.id}
                                        type="checkbox"
                                        disabled={disabled}
                                        checked={selectedStudies.some(
                                            (selectedStudy) =>
                                                selectedStudy.id === study.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(study)
                                        }
                                    />
                                    <p>{study.nazev_studie}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AvailableStudies
