import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@/src/context/theme-context";
import {
  getStoredAccessToken,
  getStoredExpiresIn,
  getStoredRefreshToken,
  refreshToken,
} from "@/src/services/auth.service";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";

const SplashScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          PlayfairDisplay_400Regular,
          PlayfairDisplay_800ExtraBold,
        });
        setIsFontLoaded(true);
      } catch (e) {
        console.log("Erro ao carregar fontes:", e);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getStoredAccessToken();
      if (!token) {
        router.replace("/register");
        return;
      }
      const expiresIn = await getStoredExpiresIn();
      if (!expiresIn) {
        router.replace("/register");
        return;
      }
      const expirationDate = new Date(expiresIn);
      if (expirationDate < new Date()) {
        await getNewTokenWithRefreshToken();
        return;
      }
      router.replace("/(tabs)/home");
    };

    if (isFontLoaded && animationFinished) {
      checkToken();
    }
  }, [isFontLoaded, animationFinished]);

  const getNewTokenWithRefreshToken = async () => {
    const refresh_token = await getStoredRefreshToken();
    if (!refresh_token) {
      router.replace("/register");
      return;
    }
    const accessToken = await refreshToken(refresh_token).catch(() => {
      router.replace("/register");
    });
    if (!accessToken) {
      router.replace("/register");
      return;
    }
    router.replace("/(tabs)/home");
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
