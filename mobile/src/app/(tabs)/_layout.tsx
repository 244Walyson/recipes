import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/src/components/shared/nav-bar";

const CustomTabBar = (props: any) => <TabBar {...props} />;

const TabLayout = () => {
  return (
    <Tabs
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="new-recipe" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;
