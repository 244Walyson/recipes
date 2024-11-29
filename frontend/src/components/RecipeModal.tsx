import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    name: string;
    preparationMethod: { step: number; title: string; description: string }[];
    preparationTime: number;
    imgUrl: string;
    macronutrients: { protein: number; carbs: number; fat: number };
    servingCount: number;
    isPublished: boolean;
    costEstimate: number;
    additionalTips: string;
    allergens: string[];
    ingredients: { id: string; name: string; quantity: number; unit: string }[];
    mealTypes: { id: string; name: string }[];
    cuisineStyles: { id: string; name: string }[];
  };
};

const RecipeModal = ({ isOpen, onClose, recipe }: RecipeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{recipe.name}</DialogTitle>
        <DialogDescription>{recipe.additionalTips}</DialogDescription>

        <div className="flex justify-center mt-4 h-60 max-h-svh">
          <Image
            src={recipe.imgUrl}
            alt={recipe.name}
            width={200}
            height={200}
            className="rounded-lg w-full max-w-sm"
          />
        </div>

        <div className="mt-4">
          <p>Tempo de Preparo: {recipe.preparationTime} minutes</p>
          <p>Quantidade de Porções: {recipe.servingCount}</p>
          <p>Custo Estimado: ${recipe.costEstimate.toFixed(2)}</p>
        </div>

        <div className="mt-4">
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients?.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3>Preparation Steps:</h3>
          <ol>
            {recipe.preparationMethod.map((step) => (
              <li key={step.step}>
                <strong>{step.title}</strong>: {step.description}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
