import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { setLanguage, setLanguageImmediate, languageType } from "@/store/languageSlice";

export const useAppLanguage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { language, isRTL } = useAppSelector((state) => state.language);
  const isArabic = language === "ar";

  const changeLang = (lang: languageType) => {
    dispatch(setLanguageImmediate(lang));
    dispatch(setLanguage(lang));
  };

  const toggleLanguage = () => {
    const nextLang = isArabic ? "en" : "ar";
    changeLang(nextLang);
  };

  return {
    t,
    language,
    isArabic,
    isRTL,
    changeLang,
    toggleLanguage,
  };
};