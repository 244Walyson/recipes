import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { WebView } from "react-native-webview";
import {
  GOOGLE_CLIENT_ID_ANDROID,
  GITHUB_CLIENT_ID,
  GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID_IOS,
  GOOGLE_CLIENT_ID_WEB,
} from "@/src/utils/system";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAccessTokenWithGithubCode,
  getAccessTokenWithGoogleToken,
  storeAllTokens,
} from "@/src/services/auth.service";
import { CommonActions } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const config = {
  webClientId: GOOGLE_CLIENT_ID_WEB,
  iosClientId: GOOGLE_CLIENT_ID_IOS,
  androidClientId: GOOGLE_CLIENT_ID_ANDROID,
};

const SocialAuth = () => {
  const navigation = useNavigation();
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
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ key: "(tabs)", name: "(tabs)" }],
          })
        );
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
    console.log(event);
    const url = event.url;
    if (url.includes(GITHUB_CALLBACK_URL)) {
      const code = extractCodeFromUrl(url);
      if (!code) return;
      getAccessTokenWithGithubCode(code).then((data) => {
        storeAllTokens(data);
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ key: "(tabs)", name: "(tabs)" }],
          })
        );
      });
    }
  };

  const extractCodeFromUrl = (url: string) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const code = urlParams.get("code");
    return code;
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
