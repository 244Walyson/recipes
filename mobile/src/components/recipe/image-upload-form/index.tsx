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

type ImageUploadFormProps = {
  onImageUpladed: (imgUrl: string) => void;
};

const ImageUploadForm = ({ onImageUpladed }: ImageUploadFormProps) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState<string>();
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
            onImageUpladed(url);
            setImageUrl(url);
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
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  return (
    <View>
      {!!error && <ErrorContainer error={error} />}
      {loading && <LoadingContainer />}

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
    </View>
  );
};

export default ImageUploadForm;
