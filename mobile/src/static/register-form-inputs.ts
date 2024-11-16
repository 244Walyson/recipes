type FormField = {
  value: string;
  id: string;
  name: string;
  type: "default" | "numeric" | "email-address" | "phone-pad";
  placeholder: string;
  validation: (value: string) => {};
  message: string;
};

export const genericInputs = {
  name: {
    value: "",
    id: "name",
    name: "name",
    type: "default",
    placeholder: "Nome da Receita",
    validation: (value: string) => value.length > 2,
    message: "O nome deve ter no mínimo 3 caracteres",
  },
  type: {
    value: "",
    id: "type",
    name: "type",
    type: "default",
    placeholder: "Tipo (ex.: Sobremesa, Jantar)",
    validation: (value: string) => value.length > 2,
    message: "O tipo deve ter no mínimo 3 caracteres",
  },
  totalTime: {
    value: "",
    id: "totalTime",
    name: "totalTime",
    type: "numeric",
    placeholder: "Tempo de preparo",
    validation: (value: string) => value.length > 0,
    message: "O tempo total não pode ser vazio",
  },
  servingCount: {
    value: "",
    id: "servingCount",
    name: "servingCount",
    type: "numeric",
    placeholder: "Porções",
    validation: (value: string) => value.length > 0,
    message: "O número de porções não pode ser vazio",
  },
  costEstimate: {
    value: "",
    id: "costEstimate",
    name: "costEstimate",
    type: "numeric",
    placeholder: "custo estimado",
    validation: (value: string) => value.length > 0,
    message: "O número de porções não pode ser vazio",
  },
  allergens: {
    value: "",
    id: "allergens",
    name: "allergens",
    type: "default",
    placeholder: "Alergênicos",
    validation: (value: string) => value.length > 0,
    message: "O número de porções não pode ser vazio",
  },
  adictionalTips: {
    value: "",
    id: "adictionalTips",
    name: "adictionalTips",
    type: "default",
    placeholder: "Dicas Adicionais",
    validation: (value: string) => value.length > 0,
    message: "As dicas adicionais não podem ser vazias",
  },
} as Record<string, FormField>;

export const directionsInputs = {
  step: {
    value: "",
    id: "step",
    name: "step",
    type: "default",
    placeholder: "Passo",
    validation: (value: string) => value.length > 0,
    message: "O passo não pode ser vazio",
  },
  title: {
    value: "",
    id: "title",
    name: "title",
    type: "default",
    placeholder: "Título",
    validation: (value: string) => value.length > 0,
    message: "O título não pode ser vazio",
  },
  description: {
    value: "",
    id: "description",
    name: "description",
    type: "default",
    placeholder: "Descrição",
    validation: (value: string) => value.length > 0,
    message: "A descrição não pode ser vazia",
  },
} as Record<string, FormField>;

export const macronutrientsInputs = {
  fat: {
    value: "",
    id: "fat",
    name: "fat",
    type: "numeric",
    placeholder: "Gordura",
    validation: (value: string) => value.length > 0,
    message: "A gordura não pode ser vazia",
  },
  protein: {
    value: "",
    id: "protein",
    name: "protein",
    type: "numeric",
    placeholder: "Proteína",
    validation: (value: string) => value.length > 0,
    message: "A proteína não pode ser vazia",
  },
  carbohydrate: {
    value: "",
    id: "carbohydrate",
    name: "carbohydrate",
    type: "numeric",
    placeholder: "Carboidrato",
    validation: (value: string) => value.length > 0,
    message: "O carboidrato não pode ser vazio",
  },
} as Record<string, FormField>;

export const ingredientsInputs = {
  ingredient: {
    value: "",
    id: "ingredient",
    name: "ingredient",
    type: "default",
    placeholder: "Ingrediente",
    validation: (value: string) => value.length > 0,
    message: "O ingrediente não pode ser vazio",
  },
  quantity: {
    value: "",
    id: "quantity",
    name: "quantity",
    type: "numeric",
    placeholder: "Quantidade",
    validation: (value: string) => value.length > 0,
    message: "A quantidade não pode ser vazia",
  },
  unity: {
    value: "",
    id: "unity",
    name: "unity",
    type: "default",
    placeholder: "Unidade",
    validation: (value: string) => value.length > 0,
    message: "A unidade não pode ser vazia",
  },
} as Record<string, FormField>;
