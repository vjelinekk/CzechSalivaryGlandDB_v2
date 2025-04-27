import { useTranslation } from 'react-i18next'

const SetLanguage = () => {
    const { t, i18n } = useTranslation()
    return (
        <div className="language-selector" style={{ margin: 'auto' }}>
            <label htmlFor="language-select">{t('select-language') + " "}</label>
            <select id="language-select" onChange={(e) => {
                const selectedLanguage = e.target.value;
                i18n.changeLanguage(selectedLanguage);
            }}>
                <option value="en">English</option>
                <option value="cs" selected>Čeština</option>
                <option value="sk">Slovenčina</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
            </select>
        </div>
        )
}



export default SetLanguage;