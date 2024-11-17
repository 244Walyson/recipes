import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@/src/context/theme-context";
import {
  decodeAccessToken,
  getStoredAccessToken,
  getStoredRefreshToken,
  refreshToken,
} from "@/src/services/auth.service";
import { useRouter } from "expo-router";
import { storeUserID } from "@/src/services/user.service";

const SplashScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      console.log(await getStoredRefreshToken());
      const token = await getStoredAccessToken();
      if (!token) {
        setLoading(false);
        router.replace("/register");
        return;
      }

      const decodedToken = await decodeAccessToken(token);

      const expiresIn = decodedToken?.exp;
      if (!expiresIn) {
        setLoading(false);
        router.replace("/register");
        return;
      }
      const expirationDate = new Date(expiresIn);
      if (expirationDate >= new Date()) {
        await getNewTokenWithRefreshToken();
        return;
      }
      setLoading(false);
      router.replace("/(tabs)/home");
    };

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    checkToken();

    return () => clearTimeout(timeout);
  }, []);

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
    const decodedToken = await decodeAccessToken(accessToken.access_token);
    if (!decodedToken) {
      router.replace("/register");
      return;
    }
    storeUserID(decodedToken.sub);

    setLoading(false);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles(theme).container}>
      <LottieView
        source={require("../../assets/animations/splash.json")}
        autoPlay={true}
        loop={false}
        style={{ height: 200, width: 300, marginEnd: -70 }}
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
