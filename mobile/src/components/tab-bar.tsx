import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";

type TabBarProps = BottomTabBarProps;

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { colors } = useTheme();

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
    <View style={[styles.tabBarContainer]}>
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
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View style={styles.iconContainer}>
              <AntDesign
                name={getIcon(route.name)}
                size={30}
                color={isFocused ? "#f6b100" : colors.text}
              />
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBar;
