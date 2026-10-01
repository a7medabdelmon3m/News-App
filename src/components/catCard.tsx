import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { useNavigation, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
export type newCardType = {
  image: ImageSourcePropType;
  type?: string;
  param:string
};
const CatCard = ({ image, type, param }: newCardType) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useAppDispatch();
 const { theme, isDark } = useTheme();
  const router = useRouter();
  return (
    <Pressable style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.textWrapper}>
        <Pressable
          onPress={() => {
            router.push(`/newCategory?category=${param}`);
          }}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          style={({ pressed }) => [
            styles.viewAll,
            { transform: [{ scale: isPressed ? 1.05 : 1 }] },
          ]}
        >
          <Text style={[styles.viewAllText, { color: theme.text }]}>
            View All
          </Text>
          <View style={[styles.arrow, { backgroundColor: theme.background }]}>
            <SymbolView
              name={{
                ios: "chevron.right",
                android: "chevron_right",
                web: "chevron_right",
              }}
              size={24}
              tintColor={theme.text}
            />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CatCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: 198,
    width: "100%",
    objectFit: "cover",
  },
  textWrapper: {
    position: "absolute",
    inset: 0,
    padding: 16,
    display: "flex",
    gap: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  viewAll: {
    borderRadius: 84,
    paddingLeft: 16,
    gap: 10,
    backgroundColor: "#808080",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "Inter-Medium",
  },
  arrow: {
    borderRadius: 1000,
    width: 54,
    height: 54,
    padding: 15,
    gap: 10,
  },
});
