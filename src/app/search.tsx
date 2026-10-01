import ClickedCard from "@/components/clickedCard";
import EmptyState from "@/components/emptyState";
import FilterModal from "@/components/filterModal";
import NewsCard from "@/components/newsCard";
import SearchField from "@/components/searchFeild";
import { Colors } from "@/constants/theme";
import { ArticleType } from "@/services/newServices";
import { Ionicons } from "@expo/vector-icons";
import {
  getSearch,
  NewsLanguage,
  NewsSortBy,
  SearchInField,
} from "@/services/searchService";
import { useAppSelector } from "@/store/reduxHooks";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

export default function Search() {
  const { theme, isDark } = useTheme();

  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [isArticlesLoaded, setisArticlesLoaded] = useState(true);
  const [isSelectedCardOpen, setisSelectedCardOpen] = useState<boolean>(false);
  const [SelectedCardData, setSelectedCardData] = useState<ArticleType | null>(
    null,
  );

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const router = useRouter();

  const {
    q,
    searchIn,
    sources,
    domains,
    excludeDomains,
    from,
    to,
    language,
    sortBy,
    page,
    pageSize,
  } = useGlobalSearchParams() as {
    q?: string;
    searchIn?: SearchInField | string;
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?: NewsLanguage;
    sortBy?: NewsSortBy;
    pageSize?: string;
    page?: string;
  };

  useEffect(() => {
    const fetchSeachArticles = async () => {
      try {
        setisArticlesLoaded(true);

        const params = {
          q,
          searchIn,
          sources,
          domains,
          excludeDomains,
          from,
          to,
          language,
          sortBy,
          page: page ? Number(page) : undefined,
          pageSize: pageSize ? Number(pageSize) : undefined,
        };

        if (!q && !sources && !domains) {
          setArticles([]);
          setisArticlesLoaded(false);
          return;
        }

        const data = await getSearch(params);
        setArticles(data.articles || []);
      } catch (error) {
        console.error(error);
        setArticles([]);
      } finally {
        setisArticlesLoaded(false);
      }
    };
    fetchSeachArticles();
  }, [
    q,
    searchIn,
    sources,
    domains,
    excludeDomains,
    from,
    to,
    language,
    sortBy,
    page,
    pageSize,
  ]);

  const isEmpty = !isArticlesLoaded && articles?.length === 0;

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <SearchField />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
            },
          ]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="options-outline" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {isArticlesLoaded ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : isEmpty ? (
        <EmptyState
          title={!q ? "Search for News" : "No Articles Found"}
          subtitle={
            !q
              ? "Please type a keyword or select a trending topic below to start exploring articles."
              : `We couldn't find any results for "${q}". Try searching for something else.`
          }
          trendingTags={[
            "Technology",
            "Artificial Intelligence",
            "Bitcoin",
            "Sports",
            "Business",
          ]}
          onTagPress={(tag) => {
            router.setParams({ q: tag });
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {articles?.map((item, idx) => (
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

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        currentFilters={{ language, sortBy, searchIn, domains }}
        onApply={(newFilters) => {
          router.setParams({ ...newFilters });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
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
});
