import SvgVegetablesIcon from "@/src/assets/icons/vegetables_icon";
import CustomModal from "@/src/components/shared/modal";
import SearchCard from "@/src/components/search/search-card";
import Header from "@/src/components/shared/header-primary";
import { useTheme } from "@/src/context/theme-context";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { IPaginatedResponse } from "@/src/interfaces/paginated-response.interface";
import { IRecipeResponse } from "@/src/interfaces/recipe/recipe-response.interface";
import { getRecipes } from "@/src/services/recipe.service";
import CustomSearchBar from "@/src/components/shared/search-bar";
import { IFindAllFilters } from "@/src/interfaces/recipe/find-all-filters.interface";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwsome from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { getIngredients } from "@/src/services/ingredient.service";
import {
  allergensData,
  priceData,
  timeData,
  trendingData,
} from "@/src/static/search-modal-data";

type ModalData = {
  visible?: boolean;
  data: {
    title: string;
    data: { id: number; name: string }[];
  };
};

const H_MAX_HEIGHT = 200;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Search = () => {
  const { theme } = useTheme();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [btnApplyModal, setBtnApplyModal] = useState(false);
  const [focused, setFocused] = useState("");
  const [searchFilters, setSearchFilters] = useState<IFindAllFilters>({});
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
    data: {
      title: "",
      data: [],
    },
  });

  const [recipes, setRecipes] = useState<IPaginatedResponse<IRecipeResponse>>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    getRecipes(searchFilters).then((response) => {
      setRecipes(response);
    });
  }, []);

  const openModal = ({
    data,
    apiEndpoint,
    multipleSelection = false,
  }: {
    data?: { title: string; data: { id: number; name: string }[] };
    apiEndpoint?: string;
    multipleSelection?: boolean;
  }) => {
    if (data) {
      setModalData({ visible: true, data });
      setBtnApplyModal(multipleSelection);
      return;
    }
    if (apiEndpoint === "ingredients") {
      getIngredients().then((response) => {
        const title = "Selecione seus ingredientes favoritos";
        setModalData({ visible: true, data: { title, data: response.data } });
        setBtnApplyModal(multipleSelection);
      });
    }
  };

  const closeModal = () => {
    setModalData({ ...modalData, visible: false });
  };

  const handleSearch = (text: string) => {
    setSearchFilters({ ...searchFilters, name: text });

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(async () => {
      if (text) {
        try {
          const data = await getRecipes({ name: text });
          setRecipes(data);
        } catch (error) {
          console.error("Erro ao buscar receitas:", error);
        }
      }
    }, 500);

    setDebounceTimeout(newTimeout);
    if (text) {
      const filteredSuggestions = recipes?.data
        .filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
        .map((item) => item.name);
      setSuggestions(filteredSuggestions || []);
      return;
    }
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchFilters({ ...searchFilters, name: suggestion });
    setSuggestions([]);
  };

  return (
    <View style={styles(theme).container}>
      <Animated.View
        style={[
          {
            transform: [{ translateY: imageTranslateY }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: H_MAX_HEIGHT,
            zIndex: 1,
          },
        ]}
      >
        <Header />
        <View style={{ paddingHorizontal: 10 }}>
          <CustomSearchBar
            onSearch={handleSearch}
            value={searchFilters?.name}
          />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <Text
                  style={styles(theme).suggestion}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  {item}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>

        <View style={styles(theme).filterWrapper}>
          <View style={styles(theme).textWrapper}>
            <Text style={styles(theme).filtersText}>Filtros</Text>
            <AntDesign name="filter" size={14} color={theme.tertiary} />
          </View>

          <View style={styles(theme).iconWrapper}>
            <TouchableOpacity
              onPress={() =>
                openModal({ data: allergensData, multipleSelection: true })
              }
            >
              <AntDesign name="warning" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({ data: priceData, multipleSelection: false })
              }
            >
              <MaterialIcons
                name="price-change"
                size={25}
                color={theme.tertiary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  apiEndpoint: "ingredients",
                  multipleSelection: true,
                })
              }
            >
              <FontAwsome name="bowl-food" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  data: trendingData,
                  multipleSelection: false,
                })
              }
            >
              <Feather name="trending-up" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({ data: timeData, multipleSelection: false })
              }
            >
              <AntDesign name="clockcircleo" size={25} color={theme.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <ScrollView
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
        </ScrollView> */}
      </Animated.View>

      <ScrollView
        style={[
          styles(theme).cardsContainer,
          { paddingTop: H_MAX_HEIGHT + 80 },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {recipes?.data.map((recipe) => (
          <SearchCard
            key={recipe.id}
            title={recipe.name}
            author={recipe.user.name}
            imgUrl={recipe.imgUrl}
            time={recipe.totalTime?.toString()}
            mealType={recipe.mealTypes}
          />
        ))}
      </ScrollView>
      {modalData && (
        <CustomModal
          visible={modalData?.visible ?? false}
          onClose={closeModal}
          data={modalData.data.data}
          title={modalData.data.title}
          btnApplyActive={btnApplyModal}
          btnApplyText="Aplicar"
          btnApplyAction={() => console.log("Apply")}
        />
      )}
    </View>
  );
};

export default Search;
