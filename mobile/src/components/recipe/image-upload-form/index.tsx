import React, { useState, useEffect } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import HeaderSecondary from "@/src/components/shared/header-secondary";
import SvgImageAdd from "@/src/assets/icons/image_add";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/src/services/image-upload.service";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import ErrorContainer from "../../shared/error-container";
import LoadingContainer from "../../shared/loading-container";
import { useRecipeRequestContext } from "@/src/context/recipe-request-context";
import { useRouter } from "expo-router";

const ImageUploadForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { recipeRequest, updateRecipeRequest } = useRecipeRequestContext();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setLoading(true);
      const fileUri = result.assets[0].uri;
      uploadImage(fileUri)
        .then((imgUrl) => {
          if (imgUrl) {
            const { url } = imgUrl;
            updateRecipeRequest({ ...recipeRequest, imgUrl: url });
          }
          setLoading(false);
        })
        .catch((error) => {
          setError("Erro ao enviar imagem");
          console.log("Error uploading image", error);
        });
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRemoveImage = () => {
    updateRecipeRequest({ ...recipeRequest, imgUrl: "" });
  };

  const handleBack = () => {
    console.log("router", router);
    router.back();
  };

  return (
    <View>
      {!!error && <ErrorContainer error={error} />}
      {loading && <LoadingContainer />}

      <View style={styles(theme).imageContainer}>
        {recipeRequest.imgUrl ? (
          <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: recipeRequest.imgUrl }}
          >
            <HeaderSecondary
              title="Nova receita"
              ioniconLeftName="arrow-left"
              ioniconRightName="image-remove"
              onPressRight={() => handleRemoveImage()}
              onPressLeft={handleBack}
              colorEmphasis={theme.foreground}
            />
          </ImageBackground>
        ) : (
          <>
            <HeaderSecondary
              title="Nova receita"
              ioniconLeftName="arrow-left"
              ioniconRightName=""
              onPressRight={() => handleRemoveImage()}
              onPressLeft={handleBack}
              colorEmphasis={theme.foreground}
            />
            <TouchableOpacity
              onPress={openGallery}
              style={{ alignItems: "center", marginTop: 30 }}
            >
              <View style={{ width: 150, height: 150 }}>
                <SvgImageAdd fill={theme.foreground} />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ImageUploadForm;
