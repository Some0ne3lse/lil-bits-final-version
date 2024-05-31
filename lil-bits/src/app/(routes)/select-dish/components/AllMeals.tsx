"use client";
import { api } from "@/app/api/api";
import GenerateNewDish from "./GenerateNewdish";
import MealDescription from "./MealDescription";
import MealImage from "./MealImage";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import SubmitDish from "./SubmitDish";
import { useOrder } from "@/app/context/OrderContext";
import { Dish } from "@/app/types/types";

import { useCallback, useEffect, useState } from "react";

export default function AllMeals() {
  const { menuItems, setMenuItems } = useOrder();
  const { dish, setDish } = useOrder();
  const [error, setError] = useState<string | null>();
  // ASK ABOUT ID, PRICE AND IMAGESOURCE NOT BEING THERE!

  const mutatePreviousOrderToDish = () => {
    if (menuItems && menuItems.dish) {
      const dishCopy: Dish = { ...menuItems.dish };
      setDish(dishCopy);
    } else {
      setError(
        "No dish found with this email. Please start over, or continue with this random dish"
      );
      getRandomOrderFromServer();
    }
  };

  const getRandomOrderFromServer = useCallback(async () => {
    try {
      const fetchRandomOrder = await api.getRandomOrder();
      // TODO: handle if meal api is down
      // setRandomDish(fetchRandomOrder);
      setDish({
        id: fetchRandomOrder.meals[0].idMeal,
        price: 3000,
        name: fetchRandomOrder.meals[0].strMeal,
        description: fetchRandomOrder.meals[0].strInstructions,
        imageSource: fetchRandomOrder.meals[0].strMealThumb,
        category: fetchRandomOrder.meals[0].strCategory,
        cousine: fetchRandomOrder.meals[0].strArea,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message + " Please contact customer support");
      } else {
        setError("Something went wrong. Please contact customer support");
      }
    }

    // TODO: Find and set up eslint rule to make warning when deps items are missing
  }, [setDish]);

  // Ask teach if dependency is ok empty
  useEffect(() => {
    if (!menuItems) {
      getRandomOrderFromServer();
    } else {
      mutatePreviousOrderToDish();
    }
  }, []);

  const resetForm = () => {
    setMenuItems(null);
  };

  if (!dish || error) {
    return (
      <div>
        <div>{error}</div>
        <ReturnToHomepage text="Start over" onClick={resetForm} />
      </div>
    );
  }
  return (
    <div>
      <MealImage imageSource={dish.imageSource} />
      <MealDescription
        title={dish.name}
        description={dish.description}
        price={dish.price}
      />
      <GenerateNewDish onClick={getRandomOrderFromServer} />
      <SubmitDish dish={dish.name} />
    </div>
  );
}
