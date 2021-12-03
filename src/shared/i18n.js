import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './language/en.json';
import hi from './language/hi.json';

export default i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: en,
        hi: hi,
    },
    react:{
        useSuspense: false
    }
});
