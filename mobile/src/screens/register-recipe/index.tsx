import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Animated,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import RecipeForm from "@/src/components/recipe/recipe-form";
import SvgImageAdd from "@/src/assets/icons/image_add";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/src/services/image-upload.service";

const H_MAX_HEIGHT = 220;
const H_MIN_HEIGHT = 0;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const RegisterRecipe = () => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const file = result.assets[0].uri;
        uploadImage(file).then((imgUrl) => {
          if (imgUrl) setImageUrl(imgUrl.url);
          setLoading(false);
        });
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    }
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
      {loading && (
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size="large" color={theme.foreground} />
        </View>
      )}

      <Animated.View
        style={[
          styles(theme).imagePlaceholder,
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
        <View style={styles(theme).imageContainer}>
          {imageUrl ? (
            <ImageBackground style={{ flex: 1 }} source={{ uri: imageUrl }}>
              <HeaderSecondary
                title="Nova receita"
                ioniconLeftName="arrow-left"
                ioniconRightName="image-remove"
                onPressRight={() => setImageUrl("")}
                colorEmphasis={theme.foreground}
              />
            </ImageBackground>
          ) : (
            <>
              <HeaderSecondary
                title="Nova receita"
                ioniconLeftName="arrow-left"
                ioniconRightName=""
                onPressRight={() => setImageUrl("")}
                colorEmphasis={theme.foreground}
              />
              <TouchableOpacity onPress={openGallery}>
                <SvgImageAdd />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[
          styles(theme).formContainer,
          { paddingTop: H_MAX_HEIGHT + 100 },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <RecipeForm imgUrl={imageUrl} />
      </ScrollView>
    </View>
  );
};

export default RegisterRecipe;
