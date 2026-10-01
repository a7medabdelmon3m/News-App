import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NavBar from "@/components/navBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import SplashScreenView from "@/components/splashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, StyleSheet, View, ActivityIndicator } from "react-native";
import { setTheme, themeMode } from "@/store/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { LoadSavedLanguage } from "@/store/languageSlice";

// 1. نوقف شاشة إكسبو السوداء لحد ما الفونتات تحمل
SplashScreen.preventAutoHideAsync();

// 2. الكومبوننت الداخلي اللي بيقرأ من الـ AsyncStorage وبيشغل التطبيق
function InnerApp() {
  const systemTheme = useColorScheme() as themeMode;
  const dispatch = useAppDispatch();
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const { isLoading } = useAppSelector((state) => state.language);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("systemTheme");
        if (savedTheme === "dark" || savedTheme === "light") {
          dispatch(setTheme(savedTheme));
        } else if (systemTheme) {
          dispatch(setTheme(systemTheme));
        }
        // await AsyncStorage.removeItem("systemTheme")
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    };
    initializeTheme();
    dispatch(LoadSavedLanguage());
  }, [systemTheme, dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {/* الـ Stack لازم يُرسم دايماً عشان expo-router ميتلخبطش ويضرب Hooks Error */}
      <Stack screenOptions={{ header: () => <NavBar /> }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="newCategory" />
        <Stack.Screen name="search" />
        <Stack.Screen name="newsDetails" />
      </Stack>

      {/* شاشة السبلاش بتترسم "فوق" التطبيق كطبقة مطلقة لحد ما تخلص وبعدين تختفي */}
      {showCustomSplash && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 99999 }]}>
          <SplashScreenView onFinish={() => setShowCustomSplash(false)} />
        </View>
      )}
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Inter-Regular": require("@/assets/fonts/Inter/static/Inter_28pt-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter/static/Inter_18pt-Medium.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter/static/Inter_18pt-Bold.ttf"),
    "Inter-Black": require("@/assets/fonts/Inter/static/Inter_18pt-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}