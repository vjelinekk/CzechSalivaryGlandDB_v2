import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { PatientType } from '../../types'

interface AttachmentProps {
    filePath: string
    setFormData: Dispatch<SetStateAction<PatientType>>
    disabled: boolean
}

const Attachment: React.FC<AttachmentProps> = ({
    filePath,
    setFormData,
    disabled,
}) => {
    const [fileIcon, setFileIcon] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        window.fs.open(fileName)
    }

    const handleDeleteAttachment = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        setFormData((prevFormData) => {
            const prevAttachments = prevFormData?.attachments || ''
            const newAttachments = prevAttachments
                .split(',')
                .filter((path) => path !== filePath)
                .join(',')
            return {
                ...prevFormData,
                attachments: newAttachments ? newAttachments : null,
            }
        })
    }

    useEffect(() => {
        const loadFileIcon = async () => {
            const fileIcon = await window.fs.getFileIcon(filePath)
            setFileIcon(fileIcon)
        }

        const loadFileName = async () => {
            const fileName = await window.fs.getFileName(filePath)
            setFileName(fileName)
        }

        loadFileIcon()
        loadFileName()
    }, [])

    return (
        <div className="attachment-container">
            <button className="attachment-button" onClick={handleButtonClick}>
                {fileIcon && (
                    <img
                        className="attachment-icon"
                        src={fileIcon}
                        alt="file icon"
                    />
                )}
                {fileName}
            </button>
            <button
                className="basicButton"
                data-testid="delete-attachment-button"
                style={{
                    height: '100%',
                    backgroundColor: disabled ? 'grey' : 'red',
                }}
                onClick={handleDeleteAttachment}
                disabled={disabled}
            >
                <CloseIcon />
            </button>
        </div>
    )
}

export default Attachment
