import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image, Text } from "react-native";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/store/reduxHooks";
import { useTheme } from "@/hooks/use-theme";

export default function SplashScreenView({
  onFinish,
}: {
  onFinish: () => void;
}) {
 const { theme, isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require("@/assets/images/splash.png")}
        />
      </View>
      <Text style={[styles.text , {color:theme.text}]}>News App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center", 
    zIndex: 99999,
  },
  imageWrapper: {
    width: 250, 
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", 
    height: "100%",
    resizeMode: "contain", 
  },
  text:{
    fontFamily:'Inter-Black',
    fontSize:32
  }
});