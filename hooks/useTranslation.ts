import { useLanguage } from '../components/LanguageContext';

export const useTranslation = () => {
  const { t, language } = useLanguage();
  return { t, language };
};