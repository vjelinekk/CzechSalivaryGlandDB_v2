import React from 'react'
import { GlandComponentProps } from '../../types'
import Attachment from './attachment'
import { useTranslation } from 'react-i18next'

const Attachments: React.FC<GlandComponentProps> = ({
    formData,
    setFormData,
    disabled,
}) => {
    const { t } = useTranslation()

    const handleAddAttachments = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        const fileName = await window.fs.save()
        if (!fileName) return
        setFormData((prev) => {
            const prevAttachments = prev?.attachments || ''
            return {
                ...prev,
                attachments:
                    prevAttachments === ''
                        ? fileName
                        : `${prevAttachments},${fileName}`,
            }
        })
    }

    return (
        <div className="sectionDiv">
            <h1>{t('attachments-title')}</h1>
            <div className="attachments">
                {formData?.attachments
                    ?.split(',')
                    .map((path, index) => (
                        <Attachment
                            key={index}
                            filePath={path}
                            setFormData={setFormData}
                            disabled={disabled}
                        />
                    ))}
            </div>
            <button
                className="basicButton"
                disabled={disabled}
                onClick={handleAddAttachments}
            >
                {t('add-attachment')}
            </button>
        </div>
    )
}

export default Attachments
