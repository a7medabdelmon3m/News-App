import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/reduxHooks";
import { useGlobalSearchParams, usePathname, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export type SearchFieldProps = {
  onClose?: (val: boolean) => void; // خليناها اختياري عشان متعملش إيرور لو مستخدمتهاش
};

export default function SearchField({ onClose }: SearchFieldProps) {
  const { theme, isDark } = useTheme();

  const { q } = useGlobalSearchParams<{ q?: string }>();
  const [text, setText] = useState<string>(typeof q === "string" ? q : "");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof q === "string") {
      setText(q);
    } else if (!q) {
      setText("");
    }
  }, [q]);

  const handleClearOrClose = () => {
    if (text.length > 0) {
      setText("");
      if (pathName.includes("/search")) {
        router.setParams({ q: "" });
      }
    } else {
      if (onClose) onClose(false);
    }
  };

  const handleSearch = () => {
    const isSearch = pathName.includes("/search");
    const query = text.trim();
    
    if (query.length > 0) {
      if (!isSearch) {
        router.push({
          pathname: "/search",
          params: { q: query },
        });
      } else {
        router.setParams({ q: query });
      }
    } else {
      // تعديل الـ Logic لو البحث فاضي
      if (!isSearch) {
        router.push(`/search`);
      } else {
        router.setParams({ q: "" });
      }
    }
  };

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      {/* أيقونة البحث العادية على الشمال بدون absolute */}
      <SymbolView
        name={{
          ios: "magnifyingglass",
          android: "search",
          web: "search",
        }}
        size={20}
        tintColor={theme.subText}
      />

      {/* الـ TextInput مع استخدام الـ placeholder الجاهز */}
      <TextInput
        onChangeText={setText}
        value={text}
        style={[styles.input, { color: theme.text }]}
        placeholder="Search..."
        placeholderTextColor={theme.subText}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />

      <Pressable onPress={handleClearOrClose} style={styles.closeButton}>
        <SymbolView
          name={{
            ios: text.length > 0 ? "xmark.circle.fill" : "xmark",
            android: "close",
            web: "close",
          }}
          size={20}
          tintColor={theme.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 54, // تحديد الارتفاع للكونتينر نفسه
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10, // مسافة بين الأيقونة والـ input
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 18,
    fontFamily: "Inter-Medium",
  },
  closeButton: {
    padding: 4,
  },
});