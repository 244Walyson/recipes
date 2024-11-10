import TrendinCard from "@/src/components/trending-card";
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "@/src/components/shared/header-primary";
import CategoryCard from "@/src/components/home/category-card";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import { useRouter } from "expo-router";

const categories = [
  {
    name: "Salada",
  },
  {
    name: "Pizza",
  },
  {
    name: "Sushi",
  },
  {
    name: "Sobremesas",
  },
  {
    name: "Bebidas",
  },
  {
    name: "Massas",
  },
  {
    name: "Carnes",
  },
  {
    name: "Lanches",
  },
  {
    name: "Vegetariano",
  },
  {
    name: "Vegano",
  },
  {
    name: "Doces",
  },
  {
    name: "Salgados",
  },
  {
    name: "Bolos",
  },
  {
    name: "Sopas",
  },
  {
    name: "Caldos",
  },
  {
    name: "Molhos",
  },
  {
    name: "Cremes",
  },
  {
    name: "Geleias",
  },
  {
    name: "Compotas",
  },
  {
    name: "Pães",
  },
  {
    name: "Biscoitos",
  },
  {
    name: "Tortas",
  },
  {
    name: "Pudins",
  },
];

const Home = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = React.useState(categories[0].name);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleInputFocus = () => {
    console.log("Input focused");
    router.push("/search");
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).container}>
      <Header onFocus={handleInputFocus} />

      {/* Tendências */}
      <View style={styles(theme).trendingContainer}>
        <View style={styles(theme).textTrendWrapper}>
          <Text style={styles(theme).trendingText}>Em alta</Text>
          <Text style={styles(theme).textColored}>Ver Todas</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).trendingContainerWrapper}
        >
          <TrendinCard />
          <TrendinCard />
        </ScrollView>
      </View>

      {/* Categorias Populares */}
      <View style={styles(theme).trendingContainer}>
        <View style={styles(theme).textTrendWrapper}>
          <Text style={styles(theme).trendingText}>Categorias Populares</Text>
          <Text style={styles(theme).textColored}>Ver Todas</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).scrollContainer}
        >
          {categories.map((category, index) => (
            <Text
              key={index}
              style={[
                styles(theme).categoryText,
                focused === category.name ? { color: theme.foreground } : {},
              ]}
              onPress={() => setFocused(category.name)}
            >
              {category.name}
            </Text>
          ))}
        </ScrollView>
      </View>

      {/* Cartões de Categoria */}
      <View style={styles(theme).trendingContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).categoryContainerwrapper}
        >
          <CategoryCard name="Pudim" author="Waly" imgUrl="" time="1h 20min" />
          <CategoryCard name="Torta" author="Waly" imgUrl="" time="45min" />
          <CategoryCard name="Bolo" author="Waly" imgUrl="" time="30min" />
          <CategoryCard name="Mousse" author="Waly" imgUrl="" time="1h" />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
