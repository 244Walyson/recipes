import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SvgTopWaves from "@/src/assets/waves/wave_top";
import SvgBottomWaves from "@/src/assets/waves/wave_botton";
import SvgGoggleIcon from "@/src/assets/icons/google_icon";
import SvgGithubIcon from "@/src/assets/icons/github_icon";
import { router } from "expo-router";
import { styles } from "./styles";
import CustomInput from "@/src/components/shared/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    console.log("Esqueceu a senha?");
  };

  return (
    <View style={styles.container}>
      <SvgTopWaves style={[styles.svg, styles.svgTop]} />
      <SvgBottomWaves style={[styles.svg, styles.svgBottom]} />

      <View style={styles.loginContainer}>
        <Text style={styles.text}>Login</Text>

        <View style={{ width: "100%" }}>
          <CustomInput
            label="Email"
            placeholder="email@example.com"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <CustomInput
            label="Password"
            placeholder="Password"
            keyboardType="default"
            onChangeText={(text) => setPassword(text)}
            isPassword={true}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <View style={styles.socialMediaLogin}>
          <TouchableOpacity style={styles.socialMediaLoginBtn}>
            <SvgGoggleIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaLoginBtn}>
            <SvgGithubIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnLoginContainer}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.textDontHaveAccount}>Não tem uma conta?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
