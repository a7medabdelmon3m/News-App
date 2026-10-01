import { Colors } from "@/constants/theme";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Appearance,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Select from "./select";
import { useColorScheme } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { setTheme } from "@/store/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/hooks/use-theme";
import { useAppLanguage } from "@/hooks/useAppLanguage";

const langs = [
  { label: "العربية", value: "ar" },
  { label: "English", value: "en" },
];
type sidbarType = {
  onCloseSidebar(val: boolean): void;
};
export default function Sidbar({ onCloseSidebar }: sidbarType) {
  const { language, changeLang , t } = useAppLanguage();
  // const [langValue, setLangValue] = useState("en");
  const dispatch = useAppDispatch();
  const { theme, themeMode } = useTheme();
  // const insets = useSafeAreaInsets();

  const modes = [
  { label: t("sidebar.theme-list.light"), value:'light'  },
  { label: t("sidebar.theme-list.dark"), value:'dark'  },
];

  const handleThemeChange = async (val: string) => {
    const selectedMode = val as "light" | "dark";
    dispatch(setTheme(selectedMode));

    try {
      await AsyncStorage.setItem("systemTheme", selectedMode);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }
  };

  return (
    <Modal transparent={true} statusBarTranslucent={true} animationType="slide">
      <Pressable onPress={() => onCloseSidebar(false)} style={[styles.overlay]}>
        <Pressable
          style={[styles.sidbar, { backgroundColor: theme.background }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[styles.topPart]}>
            <Text style={[styles.header]}>News App</Text>
          </View>
          <View style={[styles.setting]}>
            <View style={[styles.home]}>
              <SymbolView
                name={{
                  ios: "homekit",
                  android: "home",
                  web: "home",
                }}
                size={24}
                tintColor={theme.text}
              />
              <Text
                style={[styles.header, { color: theme.text, fontSize: 20 }]}
              >
                {t("sidebar.to-home")}
              </Text>
            </View>
            <View style={[styles.line, { borderColor: theme.text }]}></View>
            <View style={[styles.settingItem, styles.lang]}>
              <View style={[styles.home]}>
                <SymbolView
                  name={{
                    ios: "paintbrush",
                    android: "format_paint",
                    web: "format_paint",
                  }}
                  size={24}
                  tintColor={theme.text}
                ></SymbolView>
                <Text style={[{ color: theme.text }, styles.header]}>
                  {t("sidebar.theme")}
                </Text>
              </View>
              <Select
                data={modes}
                selectedValue={themeMode}
                onSelect={handleThemeChange}
                placeholder="Select Mode"
                theme={theme}
              />
            </View>
            <View style={[styles.line, { borderColor: theme.text }]}></View>
            <View style={[styles.settingItem]}>
              <View style={[styles.home]}>
                <SymbolView
                  name={{
                    ios: "globe",
                    android: "language",
                    web: "language",
                  }}
                  size={24}
                  tintColor={theme.text}
                ></SymbolView>
                <Text style={[{ color: theme.text }, styles.header]}>
                  {t("sidebar.lang")}
                </Text>
              </View>
              <Select
                data={langs}
                selectedValue={language} 
                onSelect={(val) => {
                  changeLang(val as "ar" | "en"); 
                }}
                placeholder="Select Language"
                theme={theme}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sidbar: {
    position: "fixed",
    minWidth: 270,
    width: 270,
    height: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "flex-start",
  },
  overlay: {
    backgroundColor: "#1212128F",
    flex: 1,
    flexDirection: "row",
  },
  topPart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 40,
    backgroundColor: "white",
    height: 166,
  },
  header: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    lineHeight: 30,
  },
  setting: {
    display: "flex",
    gap: 24,
    padding: 16,
  },
  home: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  line: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  settingItem: {
    display: "flex",
    gap: 8,
    zIndex: 10,
    position: "relative",
  },
  lang: {
    zIndex: 100,
  },
});
