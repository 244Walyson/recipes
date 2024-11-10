import SvgVegetablesIcon from "@/src/assets/icons/vegetables_icon";
import SvgPlateIcon from "@/src/assets/icons/vegetables_icon";
import CategoryItem from "@/src/components/category-item";
import Header from "@/src/components/header";
import CustomModal from "@/src/components/modal";
import SearchCard from "@/src/components/search-card";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const Search = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.filterWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.filtersText}>Filtros</Text>
          <AntDesign name="filter" size={24} color="#ccc" />
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={openModal}>
            <SvgVegetablesIcon width={25} height={25} opacity={0.3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <Feather name="trending-up" size={25} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <AntDesign name="clockcircleo" size={25} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textWrapper}></View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </ScrollView>
      <ScrollView>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </ScrollView>
      <CustomModal
        visible={isModalVisible}
        onClose={closeModal}
        attributes={["facil", "medio", "dificil"]}
        title="dificuldade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  filtersContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  filtersText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 20,
  },
});

export default Search;
