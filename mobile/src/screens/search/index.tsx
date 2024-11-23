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
  RefreshControl,
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
import { getIngredients } from "@/src/services/ingredient.service";
import {
  allergensData,
  priceData,
  timeData,
  trendingData,
} from "@/src/static/search-modal-data";
import { useRouter } from "expo-router";

type ModalData = {
  visible?: boolean;
  data: {
    key: string;
    title: string;
    data: { id: string; name: string }[];
  };
};

const H_MAX_HEIGHT = 200;
const H_MIN_HEIGHT = 60;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [btnApplyModal, setBtnApplyModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState<IFindAllFilters>({});
  const [refreshing, setRefreshing] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
    data: {
      key: "",
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
    console.log(searchFilters);
    getRecipes(searchFilters).then((response) => {
      console.log(response);
      setRecipes(response);
      setRefreshing(false);
    });
  }, [searchFilters, refreshing]);

  const openModal = ({
    data,
    multipleSelection = false,
  }: {
    data: { title: string; key: string; data: { id: string; name: string }[] };
    multipleSelection?: boolean;
  }) => {
    if (data.key === "ingredients") {
      getIngredients().then((response) => {
        const title = "Selecione seus ingredientes favoritos";
        setModalData({
          visible: true,
          data: { key: data.key, title, data: response.data },
        });
        setBtnApplyModal(multipleSelection);
      });
      return;
    }
    setModalData({ visible: true, data });
    setBtnApplyModal(multipleSelection);
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

  const handleModalApply = (selected: string[] | string, key: string) => {
    if (key === "totalTime") {
      if (selected === "Até 30 minutos") {
        setSearchFilters({ ...searchFilters, [key]: [0, 30] });
      }
      if (selected === "De 30 a 60 minutos") {
        setSearchFilters({ ...searchFilters, [key]: [30, 60] });
      }
      if (selected === "De 60 a 90 minutos") {
        setSearchFilters({ ...searchFilters, [key]: [60, 90] });
      }
      if (selected === "Mais de 90 minutos") {
        setSearchFilters({ ...searchFilters, [key]: [90, 9999] });
      }
      return closeModal();
    }
    setSearchFilters({ ...searchFilters, [key]: selected });
    closeModal();
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
        <View style={styles(theme).header}>
          <Header />
        </View>
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
                openModal({
                  data: { key: "allergens", ...allergensData },
                  multipleSelection: true,
                })
              }
            >
              <AntDesign name="warning" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  data: { key: "price", ...priceData },
                  multipleSelection: false,
                })
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
                  data: { key: "ingredients", title: "Ingredientes", data: [] },
                  multipleSelection: true,
                })
              }
            >
              <FontAwsome name="bowl-food" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  data: { key: "trending", ...trendingData },
                  multipleSelection: false,
                })
              }
            >
              <Feather name="trending-up" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  data: { key: "totalTime", ...timeData },
                  multipleSelection: false,
                })
              }
            >
              <AntDesign name="clockcircleo" size={25} color={theme.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={{}} onPress={() => setSearchFilters({})}>
            <Text
              style={{
                width: 120,
                paddingHorizontal: 10,
                color: theme.tertiary,
                fontFamily: "ABeeZee_400Regular",
              }}
            >
              Limpar Filtros
            </Text>
          </TouchableOpacity>
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

      <FlatList
        style={[
          styles(theme).cardsContainer,
          { paddingTop: H_MAX_HEIGHT + 100 },
        ]}
        data={recipes?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: recipe }) => (
          <SearchCard
            key={recipe.id}
            title={recipe.name}
            author={recipe.user.name}
            imgUrl={recipe.imgUrl}
            time={recipe.preparationTime?.toString()}
            mealType={recipe.mealTypes}
            onPress={() => router.push(`/recipes/${recipe.id}`)}
          />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            colors={[theme.foreground]}
            tintColor="transparent"
            progressBackgroundColor="transparent"
            style={{ zIndex: 1000 }}
          />
        }
      />

      {modalData && (
        <CustomModal
          visible={modalData?.visible ?? false}
          onClose={closeModal}
          data={modalData.data.data}
          title={modalData.data.title}
          btnApplyActive={btnApplyModal}
          btnApplyText="Aplicar"
          btnApplyAction={(selected) =>
            handleModalApply(selected, modalData.data.key)
          }
        />
      )}
    </View>
  );
};

export default Search;
