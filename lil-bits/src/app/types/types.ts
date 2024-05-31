export type Provision = {
	id: string;
	name: string;
	description: string;
	imageSource: string;
	price: number;
	category: string;
};

// Spelling mistake here, but want to use same type as the server

export type Dish = Provision & {
	cousine: string;
};

export type Drink = Provision & {
};

export type OrderType = {
	email: string;
	dish: Dish | null;
	drinks: Drink[];
	count: number;
	date: Date;
  price: number
};

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
};

export type MealsResponse = {
  meals: Meal[];
};

export type DishDescription = {
  title: string;
  description: string;
  price: number
}

export type DrinkApiType = {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory: string;
}

export type DrinksResponse = {
  drinks: DrinkApiType[];
}

export type GenerateNewDishType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}