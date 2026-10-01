import { Colors } from "@/constants/theme";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Sidbar from "./sidbar";
import { useAppSelector } from "@/store/reduxHooks";
import { usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

const NavBar = () => {
  const { theme, isDark } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const isDetails = pathName.includes(`newsDetails`);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: theme.background,
            justifyContent: isDetails ? 'flex-start' : 'space-between',
          },
        ]}
      >
        {/* زر القائمة الجانبية */}
        <Pressable onPress={() => setIsSidebarOpen(!isSidebarOpen)}>
          <SymbolView
            name={{
              ios: "list.bullet",
              android: "menu",
              web: "menu",
            }}
            size={24}
            tintColor={theme.text}
          />
        </Pressable>

        {isDetails && (
          <Pressable>
            <Text style={{ color: theme.text }}>MBC</Text>
          </Pressable>
        )}

        {isSidebarOpen && <Sidbar onCloseSidebar={setIsSidebarOpen} />}

        {!isDetails && (
          <Pressable onPress={() => router.push("/")}>
            <Text style={[{ color: theme.text }]}>Home</Text>
          </Pressable>
        )}

        {/* أيقونة البحث تظهر في الهيدر وتنقل المستخدم لصفحة السيرش بضغطة واحدة */}
        {!isDetails && (
          <Pressable
            onPress={() => {
              router.push("/search");
            }}
          >
            <SymbolView
              name={{
                ios: "magnifyingglass",
                android: "search",
                web: "search",
              }}
              size={24}
              tintColor={theme.text}
            />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingHorizontal: 16,
  },
  innerContainer: {
    height: 72,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter-Medium",
    fontSize: 20,
    lineHeight: 30,
  },
});

export default NavBar;