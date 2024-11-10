import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  loginContainer: {
    width: "90%",
    height: "60%",
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
