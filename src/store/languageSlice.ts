import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
import i18n from "@/i18n";

const LANGUAGE_STORAGE_KEY = "app_language";

export type languageType = "en" | "ar";

interface langState {
  language: languageType;
  isRTL: boolean;
  isLoading: boolean;
}

const initialState: langState = {
  language: "en",
  isRTL: false,
  isLoading: true,
};

export const LoadSavedLanguage = createAsyncThunk(
  "language/loadSavedLanguage",
  async () => {
    const savedLanguage = (await AsyncStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    )) as languageType | null;

    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
      return savedLanguage;
    }

    const deviceLanguage = getLocales()[0]?.languageCode === "ar" ? "ar" : "en";
    await i18n.changeLanguage(deviceLanguage);
    return deviceLanguage;
  },
);

export const setLanguage = createAsyncThunk(
  "language/setLanguage",
  async (newLanguage: languageType) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    await i18n.changeLanguage(newLanguage);

    const isRTL = newLanguage === "ar";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      await Updates.reloadAsync();
    }

    return newLanguage;
  },
);

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // السطرين دول هيحدثوا الريدكس والواجهة فوراً في نفس اللحظة
    setLanguageImmediate: (state, action: PayloadAction<languageType>) => {
      state.language = action.payload;
      state.isRTL = action.payload === "ar";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        LoadSavedLanguage.fulfilled,
        (state, action: PayloadAction<languageType>) => {
          state.language = action.payload;
          state.isRTL = action.payload === "ar";
          state.isLoading = false;
        },
      )
      .addCase(LoadSavedLanguage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        setLanguage.fulfilled,
        (state, action: PayloadAction<languageType>) => {
          state.language = action.payload;
          state.isRTL = action.payload === "ar";
        },
      );
  },
});

export const { setLanguageImmediate } = languageSlice.actions;
export default languageSlice.reducer;