import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import {
  GOOGLE_CLIENT_ID_ANDROID,
  GOOGLE_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID_IOS,
  GOOGLE_CLIENT_ID_WEB,
} from "@/src/utils/system";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAccessTokenWithGoogleToken,
  storeAllTokens,
} from "@/src/services/auth.service";

WebBrowser.maybeCompleteAuthSession();

const config = {
  webClientId: GOOGLE_CLIENT_ID_WEB,
  iosClientId: GOOGLE_CLIENT_ID_IOS,
  androidClientId: GOOGLE_CLIENT_ID_ANDROID,
};

const SocialAuth = () => {
  const router = useRouter();
  const { key } = useLocalSearchParams<{ key: string }>();
  const [oauthUrl, setOauthUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

  const handleTokenResponse = async () => {
    console.log(response);
    if (response?.type === "success") {
      const { id_token } = response.params;
      getAccessTokenWithGoogleToken(id_token).then((data) => {
        storeAllTokens(data);
        router.replace("/(tabs)/home");
      });
    }
    console.log("response", response);
  };

  useEffect(() => {
    console.log("effect");
    handleTokenResponse();
  }, [response]);

  useEffect(() => {
    console.log("key", key);
    if (key === "google") {
      console.log("Login com Google");
      if (request) {
        setLoading(true);
        promptAsync()
          .then(() => setLoading(false))
          .catch((error) => {
            console.error("Erro no login com Google:", error);
            setLoading(false);
          });
      }
    } else if (key === "github") {
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=user:email`;
      setOauthUrl(githubUrl);
    }
  }, [key, request]);

  const handleStateChange = (event: any) => {
    if (event.url.includes(GOOGLE_CALLBACK_URL || GITHUB_CALLBACK_URL)) {
      console.log(event.url);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Redirecionando para o provedor OAuth...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {key === "github" && oauthUrl && (
        <WebView
          originWhitelist={["*"]}
          source={{ uri: oauthUrl }}
          startInLoadingState={true}
          onNavigationStateChange={(event) => {
            handleStateChange(event);
          }}
        />
      )}
    </View>
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
