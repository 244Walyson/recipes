import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider } from "../context/theme-context";
import { UserProvider } from "../context/user-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </ThemeProvider>
  );
}
