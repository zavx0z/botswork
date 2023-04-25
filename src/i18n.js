import i18next from "i18next"
import HttpBackend from "i18next-http-backend"
// import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"

const apiKey = "hn4lGB5OwtWbCmt-7Vi0YA"
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`

i18next
    .use(HttpBackend)
    // .use(LanguageDetector) todo
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",

        ns: ["авторизация", "меню", "network"],
        defaultNS: "меню",

        supportedLngs: ["ru", "en", "de"],

        backend: {
            loadPath: loadPath
        }
    })