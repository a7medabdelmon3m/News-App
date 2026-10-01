import ClickedCard from "@/components/clickedCard";
import EmptyState from "@/components/emptyState";
import NewsCard from "@/components/newsCard";
import SourcesTabs from "@/components/sourcesTabs";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { getHeadLines, ArticleType } from "@/services/newServices";
import { useAppSelector } from "@/store/reduxHooks";
import { useGlobalSearchParams, usePathname } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewCategory() {
  const { theme, isDark } = useTheme();

  const pathName = usePathname();
  const [headerLines, setheaderLines] = useState<ArticleType[] | null>(null);
  const [isSelectedCardOpen, setisSelectedCardOpen] = useState<boolean>(false);
  const [SelectedCardData, setSelectedCardData] = useState<ArticleType | null>(
    null,
  );
  const [isArticlesLoaded, setisArticlesLoaded] = useState(true);

  const { source, category, country, q } = useGlobalSearchParams<{
    source?: string;
    country?: string;
    category?: string;
    q?: string;
  }>();

  useEffect(() => {
    const fetchHeaderLines = async () => {
      try {
        setisArticlesLoaded(true);
        const params = source
          ? { source, q }
          : { category: category || "general", country, q };
        const data = await getHeadLines(params);
        setheaderLines(data.articles || []);
      } catch (error) {
        console.error(error);
        setheaderLines([]);
      } finally {
        setisArticlesLoaded(false);
      }
    };
    fetchHeaderLines();
  }, [source, category, q]);

  const isEmpty = !isArticlesLoaded && headerLines?.length === 0;

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <SourcesTabs />

      {isArticlesLoaded ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : isEmpty ? (
        <EmptyState
          title={"No Articles Found"}
          subtitle={`We couldn't find any results for "${q}". Try searching for something else.`}
        />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {headerLines?.map((item, idx) => (
              <NewsCard
                cardDetails={item}
                key={idx}
                handleOpenSelectedCard={setisSelectedCardOpen}
                setSelectedCardData={setSelectedCardData}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {isSelectedCardOpen && (
        <ClickedCard
          handleCloseSelectedCard={setisSelectedCardOpen}
          selctedCardData={SelectedCardData as ArticleType}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
