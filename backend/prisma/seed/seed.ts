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

  // Criando Receita com preparationMethod como JSON
  const recipe = await prisma.recipe.create({
    data: {
      name: 'Pancakes',
      preparationMethod: [
        {
          step: 1,
          title: 'Mix ingredients',
          description: 'In a bowl, mix flour, sugar, and butter.',
        },
        {
          step: 2,
          title: 'Cook pancakes',
          description:
            'Heat a pan and cook the batter until golden brown on both sides.',
        },
      ],
      preparationTime: 10,
      imgUrl: 'https://shorturl.at/xzXe1',
      difficultyLevel: 'Easy',
      calories: 200,
      macronutrients: { carbs: 50, protein: 5, fat: 10 },
      allergens: ['gluten', 'dairy'],
      servingCount: 4,
      costEstimate: 5.5,
      additionalTips: 'Use fresh ingredients for better taste.',
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
