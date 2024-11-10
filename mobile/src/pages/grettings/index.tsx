import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export const Grettings = () => {
  return (
    <ImageBackground
      source={require("../../assets/pancake.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.textMin}>
          <Icon name="star" size={20} color="#fff" /> +10k receitas
        </Text>
        <View style={styles.bottonContainer}>
          <Text style={styles.text}>Comece a cozinhar</Text>
          <Text style={styles.textMin}>Encontre as melhores receitas</Text>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Vamos la</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Grettings;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  textMin: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  text: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#F6B100",
    width: 200,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    fontSize: 20,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  bottonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 80,
  },
});
