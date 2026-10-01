
import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/reduxHooks";
import { useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function NewsDetails() {
  const { theme, isDark } = useTheme();

  const [showWebView, setShowWebView] = useState(false);

  const params = useLocalSearchParams<{
    title?: string;
    author?: string;
    publishedAt?: string;
    urlToImage?: string;
    description?: string;
    content?: string;
    url?: string;
  }>();

  const cleanContent =
    params.content?.replace(/\[\+\d+\s*chars\]/, "") ||
    params.description ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptas, doloremque natus dicta incidunt molestias.";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={[styles.textTitle, { color: theme.text }]}>
            {params.title ||
              "40-year-old man falls 200 feet to his death while canyoneering at national park"}
          </Text>

          {params.description ? (
            <Text style={[styles.subText, { color: theme.subText }]}>
              {params.description}
            </Text>
          ) : null}

          <View>
            <Text style={[styles.author, { color: theme.subText }]}>
              by{" "}
              <Text
                style={{
                  color: theme.primary,
                  textDecorationLine: "underline",
                }}
              >
                {params.author || "ahmed abdelmoneim"}
              </Text>
            </Text>
            <Text style={[styles.author, { color: theme.subText }]}>
              {params.publishedAt || "September, 8, 2024, 9:24 AM"}
            </Text>
          </View>

          <View style={styles.socialMedia}>
            <Pressable>
              <SymbolView
                name={{ ios: "book", android: "face", web: "face" }}
                tintColor={theme.text}
              />
            </Pressable>
            <Pressable>
              <SymbolView
                name={{ ios: "book", android: "face", web: "face" }}
                tintColor={theme.text}
              />
            </Pressable>
            <Pressable>
              <SymbolView
                name={{ ios: "book", android: "face", web: "face" }}
                tintColor={theme.text}
              />
            </Pressable>
          </View>

          
          <View style={[styles.line, { borderColor: theme.subText }]} />

          <View>
            <Text style={[styles.article, { color: theme.text }]}>
              {cleanContent}
            </Text>
          </View>

          {params.url ? (
            <View style={styles.webSection}>
              {!showWebView ? (
                <Pressable
                  onPress={() => setShowWebView(true)}
                  style={[
                    styles.openWebBtn,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Text style={styles.openWebBtnText}>
                    Load Original Article Inside App
                  </Text>
                  <SymbolView
                    name={{
                      ios: "safari",
                      android: "public",
                      web: "public",
                    }}
                    size={20}
                    tintColor="#FFFFFF"
                  />
                </Pressable>
              ) : (
                <View
                  style={[
                    styles.webViewContainer,
                    { borderColor: theme.border },
                  ]}
                >
                  <WebView
                    source={{ uri: params.url }}
                    nestedScrollEnabled={true}
                    startInLoadingState={true}
                    renderLoading={() => (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator
                          size="large"
                          color={theme.primary}
                        />
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  innerContainer: {
    paddingVertical: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  textTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    lineHeight: 28,
  },
  subText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 22,
  },
  author: {
    fontFamily: "Inter-Medium",
    lineHeight: 22,
  },
  socialMedia: {
    display: "flex",
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    borderWidth: 0.5,
    borderStyle: "solid",
  },
  article: {
    fontFamily: "Inter-Medium",
    lineHeight: 26,
    fontSize: 15,
  },
  webSection: {
    marginTop: 8,
    marginBottom: 32,
  },
  openWebBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  openWebBtnText: {
    color: "#FFFFFF",
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },
  webViewContainer: {
    height: 550,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
});