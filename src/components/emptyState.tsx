import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/reduxHooks";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  trendingTags?: string[];
  onTagPress?: (tag: string) => void;
}

export default function EmptyState({
  title,
  subtitle,
  trendingTags = [],
  onTagPress,
}: EmptyStateProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.centerContainer}>
      {/* أيقونة الحالة */}
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
          },
        ]}
      >
        <SymbolView
          name={{
            ios: "newspaper",
            android: "feed",
            web: "feed",
          }}
          size={48}
          tintColor={theme.primary}
        />
      </View>

      {/* العنوان والوصف */}
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.emptySubtitle, { color: theme.subText }]}>
        {subtitle}
      </Text>

      {/* قسم الـ Trending Tags المقترحة */}
      {trendingTags.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={[styles.tagsLabel, { color: theme.subText }]}>
            Trending Searches:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsScroll}
          >
            {trendingTags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tagBadge,
                  {
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.08)",
                  },
                ]}
                onPress={() => onTagPress && onTagPress(tag)}
              >
                <Text style={[styles.tagText, { color: theme.primary }]}>
                  #{tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 24,
  },
  tagsContainer: {
    width: "100%",
    marginTop: 8,
  },
  tagsLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  tagsScroll: {
    gap: 8,
    paddingHorizontal: 4,
    justifyContent: "center",
    width: "100%",
  },
  tagBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
  },
});
