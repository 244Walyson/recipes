import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider } from "../context/theme-context";
import { RecipeRequestProvider } from "../context/recipe-request-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RecipeRequestProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="recipes/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="social-auth/[key]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="oauthredirect" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </RecipeRequestProvider>
    </ThemeProvider>
  );
}
