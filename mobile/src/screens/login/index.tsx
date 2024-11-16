import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SvgTopWaves from "@/src/assets/waves/wave_top";
import SvgBottomWaves from "@/src/assets/waves/wave_botton";
import SvgGoggleIcon from "@/src/assets/icons/google_icon";
import SvgGithubIcon from "@/src/assets/icons/github_icon";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import CustomInput from "@/src/components/shared/custom-input";
import { updateAndValidate } from "@/src/utils/forms";
import {
  decodeAccessToken,
  getAccessToken,
  getStoredAccessToken,
  getStoredRefreshToken,
  storeAccessToken,
  storeRefreshToken,
} from "@/src/services/auth.service";
import { createUser, getUser } from "@/src/services/user.service";
import { useRouter } from "expo-router";
import { useUser } from "@/src/context/user-context";

const Register = () => {
  const { theme } = useTheme();
  const { setUser } = useUser();
  const router = useRouter();
  const [activity, setActivity] = useState("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "name",
      placeholder: "name",
      validation: function (value: string) {
        return value.length > 2;
      },
      message: "o nome não pode ser vazio",
    },
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "default",
      placeholder: "username",
      validation: function (value: string) {
        return value.length > 2;
      },
      message: "o username deve conter no minimo 4 caracters",
    },
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "default",
      placeholder: "email@example.com",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value.toLowerCase()
        );
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
      validation: function (value: string) {
        return value.length > 5;
      },
      message: "a senha deve conter no minimo 6 caracters",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "default",
      placeholder: "imgUrl",
      validation: function (value: string) {
        return value.length > 5;
      },
      message: "a senha deve conter no minimo 6 caracters",
    },
  });

  const handleSubmit = async () => {
    console.log("Submit", activity);
    console.log(await getStoredRefreshToken());

    if (activity === "register") {
      const user = await createUser({
        name: formData.name.value,
        email: formData.email.value,
        username: formData.username.value,
        password: formData.password.value,
        imgUrl: formData.img,
      });
      setUser(user);
    }
    getAccessToken({
      email: formData.email.value,
      password: formData.password.value,
    }).then((accessToken) => {
      console.log("accessToken", accessToken);
      storeAccessToken(accessToken.access_token);
      storeRefreshToken(accessToken.refresh_token);
      setUserContext(accessToken.access_token);
    });

    router.replace("/(tabs)/home");
  };

  const setUserContext = (accessToken: string) => {
    const decoded = decodeAccessToken(accessToken);
    if (decoded) {
      getUser(decoded.sub).then((user) => setUser(user));
    }
  };

  const handleGithubLogin = () => {
    console.log("Login com Github");
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  const handleInputChange = (value: string, fieldName: string) => {
    setFormData(updateAndValidate(formData, fieldName, value));
  };

  const renderFormFields = () => {
    const fieldsToRender = Object.keys(formData).filter((key) => {
      if (activity === "register" && registerStep === 1) {
        return key === "name" || key === "username";
      }
      if (activity === "login" || registerStep === 2) {
        return key === "email" || key === "password";
      }
      return false;
    });

    return fieldsToRender.map((fieldName) => {
      const field = formData[fieldName];
      return (
        <CustomInput
          key={fieldName}
          keyboardType={field.type === "email" ? "email-address" : "default"}
          placeholder={field.placeholder}
          label={field.name}
          value={field.value}
          onChangeText={(value) => handleInputChange(value, fieldName)}
          isPassword={field.type === "password"}
        />
      );
    });
  };

  return (
    <View style={styles(theme).container}>
      <SvgTopWaves style={[styles(theme).svg, styles(theme).svgTop]} />
      <SvgBottomWaves style={[styles(theme).svg, styles(theme).svgBottom]} />

      <View style={styles(theme).loginContainer}>
        <Text style={[styles(theme).text, styles(theme).textLogin]}>
          {activity === "login" ? "Login" : "Registre-se"}
        </Text>

        <View style={{ width: "100%" }}>{renderFormFields()}</View>

        <View style={styles(theme).socialMediaLogin}>
          <TouchableOpacity
            style={styles(theme).socialMediaLoginBtn}
            onPress={handleGoogleLogin}
          >
            <SvgGoggleIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(theme).socialMediaLoginBtn}
            onPress={handleGithubLogin}
          >
            <SvgGithubIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles(theme).btnLoginContainer}>
        <TouchableOpacity
          onPress={() =>
            activity === "login"
              ? setActivity("register")
              : registerStep == 2
              ? setRegisterStep(1)
              : setActivity("login")
          }
        >
          <Text style={styles(theme).textLight}>
            {registerStep == 2 && activity !== "login"
              ? "Voltar"
              : activity === "login"
              ? "Não tem uma conta?"
              : "Já tem uma conta?"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).btnLogin}
          onPress={() =>
            registerStep == 2 || activity == "login"
              ? handleSubmit()
              : setRegisterStep(2)
          }
        >
          <Text style={styles(theme).textButton}>
            {activity === "register"
              ? registerStep == 1
                ? "Próximo"
                : "Registrar-se"
              : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
