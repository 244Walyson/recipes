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
      <Tabs.Screen
        name="profiles/[id]"
        options={{
          tabBarStyle: { display: "none" },
          href: {
            pathname: "/profiles/[id]",
            params: {
              id: "",
            },
          },
        }}
      />
      <Tabs.Screen
        name="recipes/edit/[id]"
        options={{
          tabBarStyle: { display: "none" },
          href: {
            pathname: "/recipes/edit/[id]",
            params: {
              id: "",
            },
          },
        }}
      />
      <Tabs.Screen
        name="recipes/[id]"
        options={{
          tabBarStyle: { display: "none" },
          href: {
            pathname: "/recipes/[id]",
            params: {
              id: "",
            },
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
