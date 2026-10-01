import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ArticleType } from "@/services/newServices";
import { useAppSelector } from "@/store/reduxHooks";
import { formatTimeAgo } from "@/utils/timeConvesion";
import { useRouter } from "expo-router";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export type newsCardType = {
  cardDetails: ArticleType;
  isSelectedCard?: boolean;
  handleOpenSelectedCard?: (val: boolean) => void;
  setSelectedCardData?: (data: ArticleType) => void;
};
export default function NewsCard({
  cardDetails,
  isSelectedCard = false,
  handleOpenSelectedCard,
  setSelectedCardData,
}: newsCardType) {
  const { theme, isDark } = useTheme();
  const reversedTheme = isDark ? Colors.light : Colors.dark;

  const router = useRouter();
  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation();
        if (handleOpenSelectedCard) handleOpenSelectedCard(true);
        if (setSelectedCardData) setSelectedCardData(cardDetails);
      }}
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.border },
      ]}
    >
      <View style={[styles.image]}>
        <Image
          style={[styles.imgItself]}
          // source={{ uri: cardDetails.urlToImage }}
          source={{ uri: cardDetails.urlToImage }}
        />
      </View>
      <Text style={[styles.text, { color: theme.text }]}>
        {cardDetails.content}
      </Text>
      {isSelectedCard ? (
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: reversedTheme.background,
              transform: [{ scale: pressed ? 1.05 : 1 }],
            },
          ]}
          onPress={() => {
            // router.push(`/newsDetails`);
            router.push({
              pathname: "/newsDetails",
              params: {
                title: cardDetails.title,
                author: cardDetails.author || "News Reporter",
                publishedAt: cardDetails.publishedAt,
                urlToImage: cardDetails.urlToImage,
                description: cardDetails.description,
                content: cardDetails.content,
                url: cardDetails.url,
              },
            });
          }}
        >
          <Text style={[styles.btnText, { color: reversedTheme.text }]}>
            View Full Articel
          </Text>
        </Pressable>
      ) : (
        <View style={[styles.footer]}>
          <Text style={[styles.subtext, { color: theme.subText }]}>
            By : {cardDetails.author}
          </Text>
          <Text style={[styles.subtext, { color: theme.subText }]}>
            {formatTimeAgo(cardDetails.publishedAt)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 8,
    display: "flex",
    gap: 10,
  },
  image: {
    borderRadius: 8,
    overflow: "hidden",
    height: 220,
  },
  imgItself: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    lineHeight: 30,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  subtext: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    lineHeight: 30,
  },
  btn: {
    padding: 16,
    borderRadius: 8,
    display: "flex",
    gap: 10,
  },
  btnText: {
    fontFamily: "Inter-bold",
    lineHeight: 30,
    fontSize: 16,
    textAlign: "center",
  },
});
