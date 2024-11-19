import React, { useRef, useState } from "react";
import { View, ScrollView, StatusBar, Animated } from "react-native";
import { styles } from "./styles";
import { useTheme } from "@/src/context/theme-context";
import RecipeForm from "@/src/components/recipe/recipe-form";
import ImageUploadForm from "@/src/components/recipe/image-upload-form";

const H_MAX_HEIGHT = 220;
const H_MIN_HEIGHT = 0;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const RegisterRecipe = () => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [imgUrl, setImgUrl] = useState<string>();

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [0, -H_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />

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
        <ImageUploadForm
          onImageUpladed={(imgUrl: string) => setImgUrl(imgUrl)}
        />
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
        <RecipeForm imgUrl={imgUrl} />
      </ScrollView>
    </View>
  );
};

export default RegisterRecipe;
