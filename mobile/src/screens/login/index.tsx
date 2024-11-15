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
import { router } from "expo-router";
import { useTheme } from "@/src/context/theme-context";
import { styles } from "./styles";
import CustomInput from "@/src/components/shared/input";

const Register = () => {
  const { theme } = useTheme();
  const [activity, setActivity] = useState("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    router.push("/register");
  };

  const handleGithubLogin = () => {
    console.log("Login com Github");
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  return (
    <View style={styles(theme).container}>
      <SvgTopWaves style={[styles(theme).svg, styles(theme).svgTop]} />
      <SvgBottomWaves style={[styles(theme).svg, styles(theme).svgBottom]} />

      <View style={styles(theme).loginContainer}>
        <Text style={[styles(theme).text, styles(theme).textLogin]}>
          {activity === "login" ? "Login" : "Registre-se"}
        </Text>

        <View style={{ width: "100%" }}>
          {activity !== "login" && registerStep == 1 && (
            <>
              <CustomInput
                keyboardType="default"
                placeholder="name"
                label="name"
                onChangeText={(text) => setEmail(text)}
              />
              <CustomInput
                keyboardType="default"
                placeholder="username"
                label="Username"
                onChangeText={(text) => setEmail(text)}
              />
            </>
          )}
          {(activity == "login" || registerStep == 2) && (
            <>
              <CustomInput
                keyboardType="email-address"
                placeholder="email@example.com"
                label="Email"
                onChangeText={(text) => setEmail(text)}
              />
              <CustomInput
                keyboardType="default"
                placeholder="Password"
                label="password"
                onChangeText={(text) => setEmail(text)}
                isPassword={true}
              />
            </>
          )}
        </View>

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
          onPress={() => setRegisterStep(2)}
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
