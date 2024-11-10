import SvgVegetablesIcon from "@/src/assets/icons/vegetables_icon";
import CustomModal from "@/src/components/shared/modal";
import SearchCard from "@/src/components/search/search-card";
import Header from "@/src/components/shared/header-primary";
import { useTheme } from "@/src/context/theme-context";
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
import { styles } from "./styles";

type ModalItems = {
  title: string;
  data: ModalDataItems[];
};

type ModalDataItems = {
  id: number;
  name: string;
};

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

const vegetablesData = {
  title: "Selecione seus ingredientes favoritos",
  data: [
    {
      id: 1,
      name: "Cenoura",
    },
    {
      id: 2,
      name: "Beterraba",
    },
    {
      id: 3,
      name: "Batata",
    },
    {
      id: 4,
      name: "Tomate",
    },
    {
      id: 5,
      name: "Cebola",
    },
    {
      id: 6,
      name: "Alho",
    },
    {
      id: 7,
      name: "Pimentão",
    },
    {
      id: 8,
      name: "Abobrinha",
    },
    {
      id: 9,
      name: "Berinjela",
    },
    {
      id: 10,
      name: "Pepino",
    },
  ],
};

const trendingData = {
  title: "O que você prefere?",
  data: [
    {
      id: 1,
      name: "Mais populares",
    },
    {
      id: 2,
      name: "Mais recentes",
    },
    {
      id: 3,
      name: "Mais curtidos",
    },
    {
      id: 4,
      name: "Mais comentados",
    },
  ],
};

const timeData = {
  title: "Quanto tempo você tem?",
  data: [
    {
      id: 1,
      name: "Até 30 min",
    },
    {
      id: 2,
      name: "Até 1h",
    },
    {
      id: 3,
      name: "Até 2h",
    },
    {
      id: 4,
      name: "Mais de 2h",
    },
  ],
};

const Search = () => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalDataItems[]>([]);
  const [modelTitle, setModalTitle] = useState<string>("");
  const [btnApplyModal, setBtnApplyModal] = useState(false);
  const [focused, setFocused] = useState("");

  const openModal = (data: ModalItems) => {
    setModalData(data.data);
    setModalTitle(data.title);
    if (data.title === "Selecione seus ingredientes favoritos") {
      setBtnApplyModal(true);
      setModalVisible(true);
      return;
    }
    setBtnApplyModal(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles(theme).container}>
      <Header />
      <View style={styles(theme).filterWrapper}>
        <View style={styles(theme).textWrapper}>
          <Text style={styles(theme).filtersText}>Filtros</Text>
          <AntDesign name="filter" size={24} color="#ccc" />
        </View>
        <View style={styles(theme).iconWrapper}>
          <TouchableOpacity onPress={() => openModal(vegetablesData)}>
            <SvgVegetablesIcon width={25} height={25} opacity={0.3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal(trendingData)}>
            <Feather name="trending-up" size={25} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal(timeData)}>
            <AntDesign name="clockcircleo" size={25} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles(theme).filtersContainer}
      >
        {categories.map((category, index) => (
          <Text
            key={index}
            style={[
              styles(theme).categoryText,
              focused === category.name ? { color: theme.foreground } : {},
            ]}
            onPress={() =>
              focused === category.name
                ? setFocused("")
                : setFocused(category.name)
            }
          >
            {category.name}
          </Text>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles(theme).cardsContainer}>
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
        data={modalData}
        title={modelTitle}
        btnApplyText="Aplicar"
        btnApplyAction={() => console.log("Apply")}
      />
    </View>
  );
};

export default Search;
