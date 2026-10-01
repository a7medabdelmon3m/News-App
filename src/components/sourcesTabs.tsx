import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { getSources, sourceType } from "@/services/sourcesServices";
import { useAppSelector } from "@/store/reduxHooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SourcesTabs() {
  const { theme, isDark } = useTheme();
  const [sources, setsources] = useState<sourceType[] | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>(
    {},
  );

  const router = useRouter();
  const { source , category , country , language } = useLocalSearchParams<{
    source?: string;
    category?: string;
    language?: string;
    country?: string;
  }>();
  const activeSource = source || "abc-news";

  const scrollToActiveTab = (id: string) => {
    const layout = tabLayouts.current[id];
    if (layout && scrollViewRef.current) {
      const offset = layout.x - SCREEN_WIDTH / 2 + layout.width / 2;
      scrollViewRef.current.scrollTo({
        x: Math.max(0, offset),
        animated: true,
      });
    }
  };

  function handleFilter(val: string) {
    router.setParams({ source: val });
    scrollToActiveTab(val);
  }

  useEffect(() => {
    const fetchSourceApi = async () => {
      try {
        const data = await getSources({category , country , language});
        setsources(data.sources);
      } catch (error) {
        console.error(error || "failed to get data");
      }
    };
    fetchSourceApi();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {sources?.map((s) => {
          const isSelected = activeSource === s.id;
          return (
            <Pressable
              key={s.id}
              onLayout={(e) => {
                tabLayouts.current[s.id] = e.nativeEvent.layout;

                if (isSelected) {
                  scrollToActiveTab(s.id);
                }
              }}
              onPress={() => handleFilter(s.id)}
              style={[
                styles.tab,
                {
                  borderColor: isSelected ? theme.text : "transparent",
                  borderBottomWidth: isSelected ? 2 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: theme.text,
                    opacity: isSelected ? 1 : 0.6,
                  },
                ]}
              >
                {s.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tab: {
    paddingBottom: 6,
  },
  text: {
    fontFamily: "Inter-bold",
    fontSize: 16,
    lineHeight: 24,
  },
});
