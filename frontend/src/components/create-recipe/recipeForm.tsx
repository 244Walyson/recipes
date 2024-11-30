"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { createRecipe } from "@/services/recipe.service";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IIngredient } from "@/interfaces/ingredient/ingredient.interface";
import { IMealType } from "@/interfaces/meal-type/meal-type.interface";
import { createMealType, getMealTypes } from "@/services/meal-type.service";
import {
  createIngredient,
  getIngredients,
} from "@/services/ingredient.service";
import { IReciperequest } from "@/interfaces/recipe/recipe-request.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getStoredUserID } from "@/services/user.service";
import { IDirections } from "@/interfaces/recipe/directions.interface";
import { uploadImage } from "@/services/image-upload.service";

const RecipeForm = () => {
  const [ingredientsSuggestions, setIngredientsSuggestions] = useState<
    IIngredient[]
  >([]);
  const [mealTypesSuggentions, setMealTypesSuggestions] = useState<IMealType[]>(
    []
  );
  const [recipe, setRecipe] = useState<IReciperequest>({
    name: "",
    preparationMethod: [{ step: 1, title: "", description: "" }],
    preparationTime: undefined,
    imgUrl: "",
    additionalTips: "",
    ingredients: [{ id: "", name: "", quantity: undefined, unit: "" }],
    mealTypes: [{ id: "", name: "" }],
    allergens: [],
    userId: "",
    costEstimate: undefined,
    cuisineStyles: [],
    isPublished: true,
    macronutrients: {},
    servingCount: undefined,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddPreparationStep = () => {
    setRecipe((prev) => ({
      ...prev,
      preparationMethod: [
        ...prev.preparationMethod,
        { step: prev.preparationMethod.length + 1, title: "", description: "" },
      ],
    }));
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState<"ingredient" | "mealType">(
    "ingredient"
  );
  const [newItemName, setNewItemName] = useState("");

  const handlePreparationStepChange = <T extends keyof IDirections>(
    index: number,
    field: T,
    value: IDirections[T]
  ) => {
    const updatedSteps = [...recipe.preparationMethod];
    updatedSteps[index][field] = value;
    setRecipe({ ...recipe, preparationMethod: updatedSteps });
  };

  const handleAddIngredient = () => {
    const actualIngredients = recipe.ingredients[recipe.ingredients.length - 1];
    if (!actualIngredients.id) {
      setNewItemName(actualIngredients.name);
      setIsDialogOpen(true);
      setNewItemType("ingredient");
      return;
    }
    if (
      !actualIngredients.name ||
      !actualIngredients.quantity ||
      !actualIngredients.unit
    ) {
      return;
    }

    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: "", name: "", quantity: undefined, unit: "" },
      ],
    }));
  };

  const handleSelectedIngredient = (index: number, ingredient: IIngredient) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = {
      ...ingredient,
      name: ingredient.name,
      id: ingredient.id,
      quantity: recipe.ingredients[index].quantity,
      unit: recipe.ingredients[index].unit,
    };

    setRecipe((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));

    setIngredientsSuggestions([]);
  };

  const handleSubmit = async () => {
    console.log("Enviando receita:", recipe);
    try {
      const userId = await getStoredUserID();
      if (!userId) {
        console.error("Usuário não autenticado.");
        return;
      }
      const recipeData = {
        ...recipe,
        userId,
      };
      createRecipe(recipeData)
        .then((response) => {
          console.log("Receita criada com sucesso:", response);
          setSuccess("Receita criada com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao criar receita:", error);
          setError("Erro ao criar receita. Tente novamente.");
        });
    } catch (error) {
      console.error("Erro ao criar receita:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddNewItem = () => {
    if (newItemType === "ingredient") {
      createIngredient(newItemName).then((response) => {
        handleSelectedIngredient(recipe.ingredients.length - 1, response);
      });
    }
    if (newItemType === "mealType") {
      createMealType(newItemName).then((response) => {
        handleSelectedMealType(recipe.mealTypes.length - 1, response);
      });
    }
    setIsDialogOpen(false);
    setNewItemName("");
  };

  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const result = await uploadImage(file);
        setRecipe((prev) => ({
          ...prev,
          imgUrl: result.url,
        }));
        console.log("Resultado do upload:", result);
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  const handleMealTypeChange = <T extends keyof IMealType>(
    index: number,
    field: T,
    value: string
  ) => {
    const updatedMealTypes = [...recipe.mealTypes];
    updatedMealTypes[index][field] = value;
    getMealTypes(value).then((response) => {
      console.log("Sugestões de tipos de refeição:", response);
      setMealTypesSuggestions(response.data);
    });
  };

  const handleAddMealType = () => {
    const actualMealType = recipe.mealTypes[recipe.mealTypes.length - 1];
    if (!actualMealType.id) {
      setNewItemName(actualMealType.name);
      setIsDialogOpen(true);
      setNewItemType("mealType");
      return;
    }
    setRecipe((prev) => ({
      ...prev,
      mealTypes: [...prev.mealTypes, { id: "", name: "" }],
    }));

    console.log("Tipos de refeição:", recipe.mealTypes);
  };

  const handleSelectedMealType = (index: number, mealType: IMealType) => {
    const updatedMealTypes = [...recipe.mealTypes];
    updatedMealTypes[index] = {
      ...mealType,
      name: mealType.name,
      id: mealType.id,
    };

    setRecipe((prev) => ({
      ...prev,
      mealTypes: updatedMealTypes,
    }));

    setMealTypesSuggestions([]);

    console.log("Tipo de refeição selecionado:", mealType);
    console.log("Index do tipo de refeição:", updatedMealTypes);
    console.log("Tipos de refeição atualizados:", recipe.mealTypes);
  };

  const handleIngredientsChange = <T extends keyof IIngredient>(
    index: number,
    field: T,
    value: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedIngredients = [...recipe.ingredients] as any;
    updatedIngredients[index][field] = value;
    setRecipe((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
    getIngredients(value).then((response) => {
      setIngredientsSuggestions(response.data);
    });
  };

  const handleAllergensChange = (value: string) => {
    setRecipe({
      ...recipe,
      allergens: value.split(",").map((allergen) => allergen.trim()),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-6">
        Preencha os campos abaixo para criar uma nova receita.
      </h2>

      <div className="mb-4">
        <Label htmlFor="name">Nome da Receita</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="imgUrl">URL da Imagem</Label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-4 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {recipe.imgUrl ? (
            <Image
              src={recipe.imgUrl}
              alt="Imagem da Receita"
              width={100}
              height={100}
              className="w-full h-64 object-cover"
            />
          ) : (
            <p>Arraste e solte a imagem ou clique para selecionar</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="preparationTime">Tempo de Preparo (minutos)</Label>
        <Input
          id="preparationTime"
          type="number"
          name="preparationTime"
          value={recipe.preparationTime}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="costEstimate">Custo Estimado</Label>
        <Input
          id="costEstimate"
          type="number"
          name="costEstimate"
          value={recipe.costEstimate}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="ServingCount">Quantidade de Porções</Label>
        <Input
          id="ServingCount"
          type="number"
          name="ServingCount"
          value={recipe.servingCount}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="preparationMethod">Modo de Preparo</Label>
        {recipe.preparationMethod.map((step, index) => (
          <div key={step.step} className="mb-4">
            <Input
              type="text"
              placeholder="Título da Etapa"
              value={step.title}
              onChange={(e) =>
                handlePreparationStepChange(index, "title", e.target.value)
              }
              className="w-full mb-2"
            />
            <Textarea
              placeholder="Descrição da Etapa"
              value={step.description}
              onChange={(e) =>
                handlePreparationStepChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full"
            />
          </div>
        ))}
        <Button onClick={handleAddPreparationStep} className="mt-2">
          Adicionar Etapa
        </Button>
      </div>

      <div className="mb-4">
        <Label>Ingredientes</Label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-2 flex gap-2">
            <Command>
              <CommandInput
                placeholder="Digite ou selecione um ingrediente..."
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleIngredientsChange(index, "name", e.target.value)
                }
                value={ingredient.name}
                disabled={recipe.ingredients.length - 1 !== index}
              />
              {ingredientsSuggestions.length > 0 &&
                recipe.ingredients.length - 1 == index && (
                  <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    <CommandGroup heading="Sugestões">
                      {ingredientsSuggestions.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelectedIngredient(index, item)}
                        >
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                )}
            </Command>
            <Input
              type="number"
              placeholder="Quantidade"
              value={ingredient.quantity}
              onChange={(e) =>
                setRecipe((prev) => {
                  const updated = [...prev.ingredients];
                  updated[index].quantity = Number(e.target.value);
                  return { ...prev, ingredients: updated };
                })
              }
              className="w-1/3"
            />
            <Input
              type="text"
              placeholder="Unidade"
              value={ingredient.unit}
              onChange={(e) =>
                setRecipe((prev) => {
                  const updated = [...prev.ingredients];
                  updated[index].unit = e.target.value;
                  return { ...prev, ingredients: updated };
                })
              }
              className="w-1/3"
            />
          </div>
        ))}
        <Button onClick={() => handleAddIngredient()} className="mt-2">
          Adicionar Ingrediente
        </Button>
      </div>

      <div className="mb-4">
        <Label>Tipos de Refeição</Label>
        {recipe.mealTypes.map((mealType, index) => (
          <Command key={mealType.id}>
            <CommandInput
              placeholder="Digite ou selecione um tipo de refeição..."
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMealTypeChange(index, "name", e.target.value)
              }
              value={mealType.name}
              disabled={recipe.mealTypes.length - 1 !== index}
            />
            {mealTypesSuggentions.length > 0 &&
              recipe.mealTypes.length - 1 == index && (
                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                  <CommandGroup heading="Sugestões">
                    {mealTypesSuggentions.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => handleSelectedMealType(index, item)}
                      >
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
          </Command>
        ))}
        <Button onClick={() => handleAddMealType()} className="mt-2">
          Adicionar Tipo de Refeição
        </Button>
      </div>

      <div className="mb-4">
        <Label htmlFor="additionalTips">Dicas Adicionais</Label>
        <Textarea
          id="additionalTips"
          name="additionalTips"
          value={recipe.additionalTips}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Novo{" "}
              {newItemType === "ingredient"
                ? "Ingrediente"
                : "Tipo de Refeição"}
            </DialogTitle>
            <DialogDescription>
              O item digitado não foi encontrado. Deseja cadastrá-lo?
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={`Nome do novo ${newItemType}`}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancelar
            </Button>
            <Button onClick={handleAddNewItem}>Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-4">
        <Label htmlFor="allergens">Alergênicos</Label>
        <Input
          id="allergens"
          type="text"
          name="allergens"
          value={recipe.allergens?.join(", ") || ""}
          onChange={(e) => handleAllergensChange(e.target.value)}
          placeholder="Separe os alérgenos por vírgula"
          className="w-full mt-1"
        />
      </div>

      <Button onClick={handleSubmit}>Criar Receita</Button>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
    </div>
  );
};

export default RecipeForm;
