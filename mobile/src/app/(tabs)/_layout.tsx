import React from "react";
import TabBar from "@/src/components/tab-bar";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="search" options={{ headerShown: false }} />
      <Tabs.Screen name="new-recipe" options={{ headerShown: false }} />
      <Tabs.Screen name="recipes" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabLayout;
