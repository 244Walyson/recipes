import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Background, PlatformPressable } from "@react-navigation/elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type TabBarProps = BottomTabBarProps;

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { theme } = useTheme();

  const getIcon = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "home";
      case "recipes":
        return "profile";
      case "profile":
        return "user";
      case "search":
        return "search1";
      case "new-recipe":
        return "plus";
      default:
        return "home";
    }
  };

  return (
    <View style={[styles(theme).tabBarContainer]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles(theme).tabButton,
              isFocused
                ? { backgroundColor: theme.foreground }
                : { backgroundColor: theme.background },
            ]}
          >
            <View style={styles(theme).iconContainer}>
              <AntDesign
                name={getIcon(route.name)}
                size={24}
                color={isFocused ? theme.background : theme.foreground}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default TabBar;
