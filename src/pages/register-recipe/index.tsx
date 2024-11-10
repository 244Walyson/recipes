import IngredintsCard from "@/src/components/ingredients-card";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomPicker from "@/src/components/custom-picker";

type Ingredient = {
  name: string;
  quantity: number;
  unity: string;
};

type Directions = {
  step: number;
  description: string;
  topics: string;
};

const RegisterRecipe = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unity, setUnity] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState<string>("");
  const [directions, setDirections] = useState<Directions[]>([]);

  const addIngredient = () => {
    if (ingredientName && quantity && unity) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, quantity: Number(quantity), unity },
      ]);
      setIngredientName("");
      setQuantity("");
      setUnity("");
    } else {
      console.log("Por favor, preencha todos os campos");
    }
  };

  const addStep = () => {
    if (instructions.trim()) {
      const newStep = {
        step,
        description: instructions,
        topics,
      };
      setDirections([...directions, newStep]);
      setStep(step + 1);
      setInstructions("");
      setTopic("");
      setTopics("");
    }
  };

  const addTopic = () => {
    if (topic.trim()) {
      const newTopic = topics + "\n" + topic;
      setTopics(newTopic);
      directions[directions.length - 1].topics = newTopic;
      setTopic("");
    }
  };

  const handleSaveRecipe = () => {
    console.log("Salvar Receita", { title, type, ingredients, directions });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imagePlaceholder}>
        <ImageBackground
          source={require("../../assets/plate.png")}
          style={styles.image}
        >
          <View style={styles.overlay} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => console.log("Voltar")}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cadastro de Receita</Text>
            <TouchableOpacity onPress={handleSaveRecipe}>
              <Ionicons name="checkmark" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Título da receita"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Exemplo: Sobremesa, Lanche, etc."
          value={type}
          onChangeText={setType}
        />

        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Ingrediente"
          value={ingredientName}
          onChangeText={setIngredientName}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input]}
            placeholder="Quantidade"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <View style={styles.selectWrapper}>
            <CustomPicker
              values={["ml", "litros", "xícaras"]}
              onChange={(value) => setUnity(value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={addIngredient} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Adicionar Ingrediente</Text>
        </TouchableOpacity>

        {ingredients.map((ingredient, index) => (
          <IngredintsCard
            key={index}
            name={ingredient.name}
            quantity={ingredient.quantity}
            unity={ingredient.unity}
            editing={true}
            onDelete={() => {}}
          />
        ))}

        <View style={styles.directionsContainer}>
          <Text style={styles.label}>Modo de Preparo</Text>
          <View>
            <Text style={styles.textLight}>Descreva em etapas ex: </Text>
            <Text style={styles.textStrong}>1. Preparar a massa</Text>
            <Text style={styles.textLight}> • Em uma tijela adicione...</Text>
            <Text style={styles.textLight}> • Adicione o açucar...</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input]}
              placeholder={step + ". Descrição da etapa"}
              value={instructions}
              onChangeText={setInstructions}
            />
            <TouchableOpacity style={styles.addWrapper} onPress={addStep}>
              <Ionicons name="checkmark" size={30} color="#BF926B" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input]}
              placeholder={"• passo "}
              value={topic}
              onChangeText={setTopic}
            />
            <TouchableOpacity style={styles.addWrapper} onPress={addTopic}>
              <Ionicons name="add" size={30} color="#BF926B" />
            </TouchableOpacity>
          </View>

          {directions.map((dir, index) => (
            <View key={index}>
              <Text style={styles.textStrong}>
                Passo {dir.step}: {dir.description}
              </Text>
              {dir.topics.split("\n").map((topic, index) => (
                <Text key={index} style={styles.textLight}>
                  • {topic}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
          <Text style={styles.saveButtonText}>Salvar Receita</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#BF926B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  iconAddPhoto: {
    width: "100%",
    height: "100%",
    top: 100,
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    height: 60,
  },
  selectWrapper: {
    width: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    height: 45,
    padding: 10,
    marginBottom: 15,
  },
  textStrong: {
    fontSize: 18,
    color: "#ccc",
    paddingHorizontal: 10,
  },
  textLight: {
    fontSize: 16,
    color: "#ccc",
    paddingHorizontal: 15,
  },
  addWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    width: 60,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  directionsContainer: {
    marginTop: 20,
    gap: 10,
  },
});

export default RegisterRecipe;
