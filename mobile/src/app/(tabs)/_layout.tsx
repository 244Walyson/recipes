import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/src/components/shared/nav-bar";

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="search" options={{ headerShown: false }} />
      <Tabs.Screen name="new-recipe" options={{ headerShown: false }} />
      <Tabs.Screen name="recipes" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabLayout;
