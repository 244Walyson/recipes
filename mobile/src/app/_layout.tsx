import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider } from "../context/theme-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(recipes)/recipes/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
