import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const loadTranslations = async () => {
    console.log('Loading translations...')

    try {
        const enTranslation = await window.fs.loadJson(
            'public/locales/translation-en.json'
        )
        const csTranslation = await window.fs.loadJson(
            'public/locales/translation-cs.json'
        )
        const skTranslation = await window.fs.loadJson(
            'public/locales/translation-sk.json'
        )
        // const deTranslation = await window.fs.loadJson('public/locales/translation-de.json');
        // const esTranslation = await window.fs.loadJson('public/locales/translation-es.json');

        const csFormTranslation = await window.fs.loadJson(
            'public/locales/form-translation-cs.json'
        )
        const enFormTranslation = await window.fs.loadJson(
            'public/locales/form-translation-en.json'
        )
        const skFormTranslation = await window.fs.loadJson(
            'public/locales/form-translation-sk.json'
        )
        // const deFormTranslation = await window.fs.loadJson('public/locales/form-translation-de.json');
        // const esFormTranslation = await window.fs.loadJson('public/locales/form-translation-es.json');

        return {
            en: { translation: { ...enTranslation, ...enFormTranslation } },
            cs: { translation: { ...csTranslation, ...csFormTranslation } },
            sk: { translation: { ...skTranslation, ...skFormTranslation } },
            // de: { translation: { ...deTranslation, ...deFormTranslation} },
            // es: { translation: { ...esTranslation, ...esFormTranslation} },
        }
    } catch (error) {
        console.error('Error loading translations:', error.message)
        return {}
    }
}

export const initI18n = async () => {
    const resources = await loadTranslations()
    // eslint-disable-next-line import/no-named-as-default-member
    i18n.use(initReactI18next).init({
        resources,
        lng: 'cs',
        fallbackLng: 'en',
    })
}

export default i18n
