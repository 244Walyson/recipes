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
import SvgGoggleIcon from "@/src/assets/social-media-icons/google_icon";
import SvgGithubIcon from "@/src/assets/social-media-icons/github_icon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    // Lógica para "Esqueceu a senha?"
    console.log("Esqueceu a senha?");
  };

  return (
    <View style={styles.container}>
      <SvgTopWaves style={[styles.svg, styles.svgTop]} />
      <SvgBottomWaves style={[styles.svg, styles.svgBottom]} />

      <View style={styles.loginContainer}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.textSpan}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.textSpan}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
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
        <TouchableOpacity>
          <Text style={styles.textDontHaveAccount}>Não tem uma conta?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  loginContainer: {
    width: "90%",
    height: "50%",
    alignItems: "flex-start",
    padding: 20,
    marginBottom: 50,
  },
  svg: {
    width: "100%",
    height: "100%",
    transform: [{ scaleX: 1.15 }],
    aspectRatio: 1.5,
  },
  svgTop: {
    position: "absolute",
    top: 0,
  },
  svgBottom: {
    position: "absolute",
    bottom: 0,
    transform: [{ scaleX: 1.3 }],
  },
  text: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#F6B100",
    marginTop: 10,
    textAlign: "right",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
  },
  btnLogin: {
    minWidth: 200,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  btnLoginContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textSpan: {
    fontSize: 16,
    marginTop: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 24,
  },
  textDontHaveAccount: {
    fontSize: 18,
    marginTop: 10,
    color: "#fff",
  },
  socialMediaLogin: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
  },
  socialMediaLoginBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 3,
  },
});

export default Login;
