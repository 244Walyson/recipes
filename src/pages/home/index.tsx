import CategoryCard from "@/src/components/category-card";
import TrendinCard from "@/src/components/trending-card";
import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "@/src/components/header";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.trendingContainer}>
        <View style={styles.textTrendWrapper}>
          <Text style={styles.trendingText}>Em alta</Text>
          <Text style={styles.textColored}>Ver Todas</Text>
        </View>
      </View>
      <View style={styles.trendingContainerWrapper}>
        <TrendinCard />
        <TrendinCard />
        <TrendinCard />
      </View>

      <View style={styles.trendingContainer}>
        <View style={styles.textTrendWrapper}>
          <Text style={styles.trendingText}>Categorias Populares</Text>
          <Text style={styles.textColored}>Ver Todas</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
        <Text style={styles.categoryText}>Salada</Text>
      </ScrollView>
      <View style={styles.trendingContainerWrapper}>
        <CategoryCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 70,
  },
  headerWrapper: {
    flexDirection: "row",
  },
  textWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textTrendWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  trendingContainerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  recipetext: {
    fontSize: 34,
    fontWeight: "bold",
  },
  textColored: {
    color: "#F6B100",
  },
  trendingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F6B100",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    width: "90%",
    height: 45,
    fontSize: 18,
    color: "#000",
  },
  searchIcon: {
    color: "#F6B100",
    marginRight: 10,
  },
  trendingContainer: {},
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 20,
    marginRight: 20,
    color: "#ccc",
  },
});

export default Home;
