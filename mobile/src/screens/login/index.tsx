import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import SvgTopWaves from "@/src/assets/waves/wave_top";
import SvgBottomWaves from "@/src/assets/waves/wave_botton";
import SvgGoggleIcon from "@/src/assets/icons/google_icon";
import SvgGithubIcon from "@/src/assets/icons/github_icon";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import CustomInput from "@/src/components/shared/custom-input";
import { updateAndValidate } from "@/src/utils/forms";
import {
  getAccessToken,
  getRecoverPasswordToken,
} from "@/src/services/auth.service";
import { createUser } from "@/src/services/user.service";
import { useRouter, useNavigation } from "expo-router";
import { loginInputs } from "@/src/static/login-ipunts.";
import { CommonActions } from "@react-navigation/native";

const Register = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const [activity, setActivity] = useState("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>(loginInputs);

  const handleSubmit = async () => {
    if (activity === "forgot password") {
      getRecoverPasswordToken(formData.email.value)
        .then(() => {
          setActivity("login");
          console.log("Token enviado");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      return;
    }

    if (activity === "login") {
      getToken();
      return;
    }

    if (activity === "register") {
      registerUser();
    }
  };

  const getToken = () => {
    getAccessToken({
      email: formData.email.value,
      password: formData.password.value,
    })
      .then((accessToken) => {
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ key: "(tabs)", name: "(tabs)" }],
          })
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const registerUser = () => {
    createUser({
      name: formData.name.value,
      email: formData.email.value,
      username: formData.username.value,
      password: formData.password.value,
      imgUrl: formData.img,
    })
      .then((user) => {
        getToken();
        console.log(user);
      })
      .catch((error) => {
        "erro";
        console.log("Error:", error);
      });
  };

  const handleGithubLogin = () => {
    router.push("/social-auth/github");
  };

  const handleGoogleLogin = () => {
    router.push("/social-auth/google");
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
      if (activity === "forgot password") {
        return key === "email";
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

  const getButtonText = () => {
    if (activity === "forgot password") {
      return "Enviar";
    }
    if (activity === "register") {
      return registerStep === 1 ? "Próximo" : "Registrar-se";
    }
    return "Entrar";
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar translucent backgroundColor="transparent" />
      <SvgTopWaves style={[styles(theme).svg, styles(theme).svgTop]} />
      <SvgBottomWaves style={[styles(theme).svg, styles(theme).svgBottom]} />
      <View style={styles(theme).loginContainer}>
        <Text style={[styles(theme).text, styles(theme).textLogin]}>
          {(() => {
            if (activity === "login") return "Login";
            if (activity === "register") return "Registre-se";
            return "Recuperar senha";
          })()}
        </Text>

        <View style={{ width: "100%" }}>{renderFormFields()}</View>

        <View
          style={[
            styles(theme).socialMediaLogin,
            { justifyContent: "space-between" },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
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

          <TouchableOpacity onPress={() => setActivity("forgot password")}>
            <Text style={{ color: theme.tertiary }}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles(theme).btnLoginContainer}>
        <TouchableOpacity
          onPress={() => {
            if (activity === "login") {
              setActivity("register");
            } else if (registerStep == 2) {
              setRegisterStep(1);
            } else {
              setActivity("login");
            }
          }}
        >
          <Text style={styles(theme).textLight}>
            {(() => {
              if (registerStep == 2 || activity === "forgot password") {
                return "Voltar";
              }
              if (activity === "login") {
                return "Não tem uma conta?";
              }
              return "Já tem uma conta?";
            })()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).btnLogin}
          onPress={() =>
            registerStep == 2 ||
            activity == "login" ||
            activity == "forgot password"
              ? handleSubmit()
              : setRegisterStep(2)
          }
        >
          <Text style={styles(theme).textButton}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
