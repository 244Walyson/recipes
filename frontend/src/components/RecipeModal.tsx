import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { IRecipeResponse } from "@/interfaces/recipe/recipe-response.interface";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: IRecipeResponse;
};

const RecipeModal = ({ isOpen, onClose, recipe }: RecipeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-y-auto scrollbar-custom">
        <DialogTitle>{recipe.name}</DialogTitle>
        <DialogDescription>{recipe.additionalTips}</DialogDescription>

        <Image
          className="rounded-lg object-cover max-h-60"
          src={recipe.imgUrl ?? "/cookImage.png"}
          alt="recipe"
          width={100}
          height={100}
          layout="responsive"
        />

        <div className="mt-4">
          <p>Tempo de Preparo: {recipe.preparationTime} minutes</p>
          <p>Quantidade de Porções: {recipe.servingCount}</p>
          <p>Custo Estimado: ${recipe.costEstimate?.toFixed(2)}</p>
        </div>

        <div className="mt-4">
          <h3>Ingredients:</h3>
          <ul>
            {recipe &&
              recipe.recipeIngredients?.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3>Modo de Preparo:</h3>
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
