import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@/src/context/theme-context";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { ABeeZee_400Regular } from "@expo-google-fonts/abeezee";
import { getStoredToken } from "@/src/services/token.service";

const SplashScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          ABeeZee_400Regular,
        });
        setIsFontLoaded(true);
      } catch (e) {
        console.log("Erro ao carregar fontes:", e);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (isFontLoaded && animationFinished) {
      verifyTokens();
    }
  }, [isFontLoaded, animationFinished]);

  const verifyTokens = () => {
    getStoredToken().then((token) => {
      if (!token) {
        router.replace("/register");
        return;
      }
      router.replace("/(tabs)/home");
    });
  };

  return (
    <View style={styles(theme).container}>
      <LottieView
        source={require("../../assets/animations/splash.json")}
        autoPlay={true}
        loop={false}
        style={{ height: 200, width: 300, marginEnd: -70 }}
        onAnimationFinish={() => setAnimationFinished(true)}
      />
    </View>
  );
};

export const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
  });

export default SplashScreen;
