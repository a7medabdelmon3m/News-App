import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

type SelectProps = {
  data: DropdownItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  theme: any;
};



export default function Select({data , selectedValue , onSelect , placeholder, theme} : SelectProps) {
  
  const [isOpen, setIsOpen] = useState(false);
// console.log('');

  const selectedItem = data.find((item) => item.value === selectedValue);

  return (
    <View style={[styles.dropdown, { borderColor: theme.border }]}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={[styles.cotroller]}>
        <Text style={[{ color: theme.text }]}>
          {selectedItem ? selectedItem.label :placeholder}
        </Text>
        <SymbolView
          name={{
            ios: isOpen ? "chevron.up" : "chevron.down",
            android: isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down",
            web: isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down",
          }}
          size={20}
          tintColor={theme.text}
        />
      </Pressable>
      {isOpen && (
        <View style={[styles.list , { backgroundColor: theme.background, borderColor: theme.border } ]}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.listItem,
                    pressed && { backgroundColor: "#999999" },
                  ]}
                  key={index}
                >
                    <Text style={[{color:theme.text}]}> {item.label}</Text>
                  
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  { borderWidth: 1, borderStyle: "solid", borderColor: "#ddd" },
                ]}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "space-between",
    padding: 16,
    borderStyle: "solid",
    position: "relative",
    zIndex:100
  },
  list: {
    position: "absolute",
    width: "100%",
    top: "100%",
    left: 0,
    zIndex: 9999,
    borderRadius: 8,
    overflow: "hidden",
    // elevation: ,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight:200,
    // marginTop:5
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cotroller: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
