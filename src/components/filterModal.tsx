import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { NewsLanguage, NewsSortBy, SearchInField } from "@/services/searchService";
import { useAppSelector } from "@/store/reduxHooks";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: any;
  onApply: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, currentFilters, onApply }: FilterModalProps) {
  const { theme, isDark } = useTheme();

  // الحفاظ على حالة الفلاتر محلياً داخل المودال
  const [language, setLanguage] = useState<NewsLanguage | "">(currentFilters.language || "");
  const [sortBy, setSortBy] = useState<NewsSortBy | "">(currentFilters.sortBy || "");
  const [searchIn, setSearchIn] = useState<SearchInField | "">(currentFilters.searchIn || "");
  const [domains, setDomains] = useState(currentFilters.domains || "");

  // تحديث الحالة المحلية لما المودال يفتح
  useEffect(() => {
    if (visible) {
      setLanguage(currentFilters.language || "");
      setSortBy(currentFilters.sortBy || "");
      setSearchIn(currentFilters.searchIn || "");
      setDomains(currentFilters.domains || "");
    }
  }, [visible, currentFilters]);

  const handleApply = () => {
    onApply({
      language: language || undefined,
      sortBy: sortBy || undefined,
      searchIn: searchIn || undefined,
      domains: domains || undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setLanguage("");
    setSortBy("");
    setSearchIn("");
    setDomains("");
  };

  // دالة مساعدة لعمل أزرار الاختيارات (Chips)
  const FilterChip = ({ label, value, selectedValue, onSelect }: any) => {
    const isSelected = selectedValue === value;
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: isSelected ? theme.primary : isDark ? "#333" : "#f0f0f0",
            borderColor: isSelected ? theme.primary : isDark ? "#444" : "#ddd",
          },
        ]}
        onPress={() => onSelect(isSelected ? "" : value)}
      >
        <Text style={{ color: isSelected ? "#fff" : theme.text, fontFamily: "Inter-Medium" }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} statusBarTranslucent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          {/* رأس المودال */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Advanced Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <SymbolView name="xmark" size={24} tintColor={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
            {/* فلتر الترتيب */}
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Sort By</Text>
              <View style={styles.chipContainer}>
                <FilterChip label="Latest" value="publishedAt" selectedValue={sortBy} onSelect={setSortBy} />
                <FilterChip label="Relevancy" value="relevancy" selectedValue={sortBy} onSelect={setSortBy} />
                <FilterChip label="Popularity" value="popularity" selectedValue={sortBy} onSelect={setSortBy} />
              </View>
            </View>

            {/* فلتر اللغة */}
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Language</Text>
              <View style={styles.chipContainer}>
                <FilterChip label="English" value="en" selectedValue={language} onSelect={setLanguage} />
                <FilterChip label="Arabic" value="ar" selectedValue={language} onSelect={setLanguage} />
                <FilterChip label="French" value="fr" selectedValue={language} onSelect={setLanguage} />
              </View>
            </View>

            {/* فلتر نطاق البحث */}
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Search In</Text>
              <View style={styles.chipContainer}>
                <FilterChip label="Title" value="title" selectedValue={searchIn} onSelect={setSearchIn} />
                <FilterChip label="Description" value="description" selectedValue={searchIn} onSelect={setSearchIn} />
                <FilterChip label="Content" value="content" selectedValue={searchIn} onSelect={setSearchIn} />
              </View>
            </View>

            {/* فلتر النطاقات (Domains) */}
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Specific Domains (e.g. bbc.com)</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { color: theme.text, borderColor: isDark ? "#444" : "#ddd", backgroundColor: isDark ? "#222" : "#fafafa" },
                ]}
                placeholder="techcrunch.com, engadget.com"
                placeholderTextColor={theme.subText}
                value={domains}
                onChangeText={setDomains}
              />
            </View>
          </ScrollView>

          {/* أزرار التحكم */}
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.btn, styles.clearBtn, { borderColor: theme.subText }]} onPress={handleClear}>
              <Text style={{ color: theme.text, fontFamily: "Inter-Medium" }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.applyBtn, { backgroundColor: theme.primary }]} onPress={handleApply}>
              <Text style={{ color: "#fff", fontFamily: "Inter-Bold" }}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontFamily: "Inter-Medium",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    paddingBottom: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  clearBtn: {
    borderWidth: 1,
  },
  applyBtn: {},
});