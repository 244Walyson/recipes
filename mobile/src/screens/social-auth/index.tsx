import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CALLBACK_URL,
} from "@/src/utils/system";

const SocialAuth = () => {
  const { key } = useLocalSearchParams<{ key: string }>();
  const [oauthUrl, setOauthUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log(GOOGLE_CLIENT_ID);
    if (key === "google") {
      setOauthUrl(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&response_type=code&scope=openid%20profile%20email`
      );
    } else if (key === "github") {
      setOauthUrl(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=user:email`
      );
      console.log("github", oauthUrl);
    }
  }, [key]);

  const handleStateChange = (event: any) => {
    if (event.url.includes(GOOGLE_CALLBACK_URL || GITHUB_CALLBACK_URL)) {
      console.log(event.url);
    }
  };

  if (!oauthUrl) {
    return (
      <View style={styles.center}>
        <Text>Redirecionando para o provedor OAuth...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: oauthUrl }}
      startInLoadingState={true}
      onNavigationStateChange={(event) => {
        handleStateChange(event);
      }}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialAuth;
