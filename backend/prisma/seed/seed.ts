import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando Usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword123',
      username: 'john_doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'hashedpassword456',
      username: 'jane_smith',
    },
  });

  // Criando Ingredientes
  const ingredient1 = await prisma.ingredient.create({
    data: {
      name: 'Sugar',
    },
  });

  const ingredient2 = await prisma.ingredient.create({
    data: {
      name: 'Flour',
    },
  });

  const ingredient3 = await prisma.ingredient.create({
    data: {
      name: 'Butter',
    },
  });

  // Criando Tipos de Refeição
  const mealType1 = await prisma.mealType.create({
    data: {
      name: 'Breakfast',
    },
  });

  const mealType2 = await prisma.mealType.create({
    data: {
      name: 'Lunch',
    },
  });

  // Criando Estilos Culinários
  const cuisineStyle1 = await prisma.cuisineStyle.create({
    data: {
      name: 'Italian',
    },
  });

  const cuisineStyle2 = await prisma.cuisineStyle.create({
    data: {
      name: 'Mexican',
    },
  });

  // Criando Receita
  const recipe = await prisma.recipe.create({
    data: {
      name: 'Pancakes',
      preparationMethod: 'Mix ingredients and cook on a pan.',
      preparationTime: 10,
      imgUrl: 'http://example.com/pancakes.jpg',
      difficultyLevel: 'Easy',
      category: 'Dessert',
      tags: ['sweet', 'breakfast'],
      calories: 200,
      macronutrients: { carbs: 50, protein: 5, fat: 10 },
      servingSize: '1 plate',
      allergens: ['gluten', 'dairy'],
      cookTime: 15,
      totalTime: 25,
      servingCount: 4,
      costEstimate: 5.5,
      experienceLevel: 'Beginner',
      additionalTips: 'Use fresh ingredients for better taste.',
      videoUrl: 'http://example.com/video',
      sourceUrl: 'http://example.com/source',
      isPublished: true,
      userId: user1.id,
      recipeIngredients: {
        create: [
          {
            quantity: 1,
            unit: 'cup',
            ingredientId: ingredient1.id,
          },
          {
            quantity: 2,
            unit: 'cups',
            ingredientId: ingredient2.id,
          },
          {
            quantity: 0.5,
            unit: 'cup',
            ingredientId: ingredient3.id,
          },
        ],
      },
      mealTypes: {
        create: [
          {
            mealTypeId: mealType1.id,
          },
        ],
      },
      cuisineStyles: {
        create: [
          {
            cuisineStyleId: cuisineStyle1.id,
          },
        ],
      },
    },
  });

  console.log({ user1, user2, recipe });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
