import React, { useEffect, useState } from 'react'

interface AttachmentProps {
    fileName: string
}

const Attachment: React.FC<AttachmentProps> = ({ fileName }) => {
    const [fileIcon, setFileIcon] = useState<string>('')

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        window.fs.open(fileName)
    }

    useEffect(() => {
        const loadFileIcon = async () => {
            const fileIcon = await window.fs.getFileIcon(fileName)
            setFileIcon(fileIcon)
        }

        loadFileIcon()
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
                {fileName.split('/').pop()}
            </button>
        </div>
    )
}

export default Attachment
