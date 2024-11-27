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
  StatusBar,
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
import { IIngredient } from "@/src/interfaces/ingredient/ingredient.interface";

type ModalData = {
  visible?: boolean;
  data: {
    key: string;
    title: string;
    data: { id: string; name: string }[];
  };
};

const H_MAX_HEIGHT = 200;
const H_MIN_HEIGHT = 70;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const Search = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [btnApplyModal, setBtnApplyModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState<IFindAllFilters>({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
    getRecipes(searchFilters, page).then((response) => {
      console.log(response);
      if (page == 1) {
        setRecipes(response);
        return;
      }
      setRecipes((prev) => ({
        data: [...(prev?.data ?? []), ...response.data],
        total: response.total,
        page: response.page,
        limit: response.limit,
      }));
    });
    setLoading(false);
  }, [searchFilters, loading, page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setPage(1);
  };

  const openModal = ({
    data,
    multipleSelection = false,
  }: {
    data: { title: string; key: string; data: { id: string; name: string }[] };
    multipleSelection?: boolean;
  }) => {
    if (data.key === "ingredients") {
      getIngredients().then((response) => {
        console.log(response);
        const title = "Selecione seus ingredientes favoritos";

        const uniqueData = response.data.map((item: IIngredient) => ({
          ...item,
          key: item.id,
        }));

        setModalData({
          visible: true,
          data: { key: data.key, title, data: uniqueData },
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
    setPage(1);
    setSearchFilters({ ...searchFilters, [key]: selected });
    closeModal();
  };

  const clearFilters = () => {
    setSearchFilters({});
    setPage(1);
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent={false} backgroundColor={theme.background} />
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
          <Header
            smallText="Encontre"
            coloredText="as melhores"
            bigText="Receitas"
          />
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
                  data: { key: "orderBy", ...trendingData },
                  multipleSelection: false,
                })
              }
            >
              <Feather name="trending-up" size={25} color={theme.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal({
                  data: { key: "preparationTime", ...timeData },
                  multipleSelection: false,
                })
              }
            >
              <AntDesign name="clockcircleo" size={25} color={theme.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ alignItems: "flex-end", backgroundColor: theme.background }}
        >
          <TouchableOpacity style={{}} onPress={clearFilters}>
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
      </Animated.View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={[styles(theme).cardsContainer]}
        contentContainerStyle={{
          paddingTop: H_MAX_HEIGHT + 60,
          paddingBottom: H_MIN_HEIGHT + 20,
        }}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[theme.foreground]}
            tintColor="transparent"
            progressBackgroundColor="transparent"
            style={{ zIndex: 100 }}
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
