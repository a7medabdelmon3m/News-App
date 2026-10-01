import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  StatusBar,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import CatCard from "@/components/catCard";
import { newsCatList } from "@/constants/newsCategories";
import { useAppSelector } from "@/store/reduxHooks";
import { useTheme } from "@/hooks/use-theme";
import { useAppLanguage } from "@/hooks/useAppLanguage";

export default function HomeScreen() {
 const { theme, isDark } = useTheme();
 const { t, isArabic, toggleLanguage } = useAppLanguage();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView style={styles.container}>
        <Text style={[styles.textHeader ,{color:theme.text}]}>{t('message')}</Text>
        {newsCatList.map((item) => {
          const selectedImage = !isDark ? item.images.dark : item.images.light;
          return <CatCard image={selectedImage} param={item.id} key={item.id} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
  textHeader: {
    fontFamily:'Inter-Medium',
    fontSize: 24,
    lineHeight: 30,
    marginBottom:16
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
    
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
});
