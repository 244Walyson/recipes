CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT NOW(),
    isActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    preparationMethod TEXT NOT NULL,
    preparationTime INT NOT NULL,
    imgUrl VARCHAR(255),
    difficultyLevel VARCHAR(50),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted BOOLEAN DEFAULT FALSE,
    userId INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    comment TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    deleted BOOLEAN DEFAULT FALSE,
    rating INT NOT NULL,
    userId INT NOT NULL,
    recipeId INT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id),
    CONSTRAINT fk_recipe FOREIGN KEY (recipeId) REFERENCES recipes (id)
);

CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL,
);

CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    recipeId INT NOT NULL,
    ingredientId INT NOT NULL,
    CONSTRAINT fk_recipe FOREIGN KEY (recipeId) REFERENCES recipes (id),
    CONSTRAINT fk_ingredient FOREIGN KEY (ingredientId) REFERENCES ingredients (id)


);

CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    token TEXT NOT NULL,
    userId INT NOT NULL,
    isRevoked BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE password_recovery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    token TEXT NOT NULL,
    userId INT NOT NULL,
    isRevoked BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id)
);