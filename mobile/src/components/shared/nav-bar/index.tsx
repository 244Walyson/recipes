import React from "react";
import { View, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";

type TabBarProps = BottomTabBarProps;

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { theme } = useTheme();

  // Lista de rotas válidas com ícones associados
  const validRoutes = ["home", "search", "profile", "new-recipe"]; // Liste as rotas válidas aqui

  // Função para obter o ícone da rota
  const getIcon = (routeName: string) => {
    switch (routeName) {
      case "home":
        return "home";
      case "search":
        return "search1";
      case "profile":
        return "user";
      case "new-recipe":
        return "plus";
      default:
        return null; // Não renderiza ícone se não for uma rota válida
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

        const iconName = validRoutes.includes(route.name)
          ? getIcon(route.name)
          : null;

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
              {iconName && (
                <AntDesign
                  name={iconName}
                  size={24}
                  color={isFocused ? theme.background : theme.foreground}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default TabBar;
