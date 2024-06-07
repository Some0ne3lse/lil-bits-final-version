"use client";
import { api } from "@/app/api/api";
import MealDescription from "./MealDescription";
import MealImage from "./MealImage";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import { useOrder } from "@/app/context/OrderContext";
import { Dish } from "@/app/types/types";
import { useCallback, useEffect, useState } from "react";
import LinkButton from "@/app/global-components/LinkButton";
import styles from "../dish.module.css";
import Loading from "@/app/loading";

const AllMeals = () => {
  const { menuItems, setMenuItems } = useOrder();
  const { dish, setDish } = useOrder();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mealLoading, setMealLoading] = useState<boolean>(false);

  const mealsPrice = 4500;

  const getRandomOrderFromServer = useCallback(async () => {
    setMealLoading(true);
    try {
      const fetchRandomOrder = await api.getRandomOrder();
      setDish({
        id: fetchRandomOrder.meals[0].idMeal,
        price: mealsPrice,
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
    setMealLoading(false);
    setLoading(false);
  }, [setDish]);

  useEffect(() => {
    if (!menuItems) {
      getRandomOrderFromServer();
    } else {
      if (menuItems && menuItems.dish) {
        const dishCopy: Dish = { ...menuItems.dish };
        setDish(dishCopy);
      } else {
        setError(
          "No dish found with this email. Please start over, or continue with this random dish"
        );
        getRandomOrderFromServer();
      }
      setLoading(false);
    }
  }, [getRandomOrderFromServer, menuItems, setDish]);

  const resetForm = () => {
    setMenuItems(null);
  };

  if (loading) {
    return <Loading />;
  } else if (!dish || error) {
    return (
      <div className={styles.dish_error_container}>
        <div className={styles.dish_error_box}>
          <div className={styles.dish_error}>{error}</div>
          <ReturnToHomepage text="Start over" onClick={resetForm} />
        </div>
      </div>
    );
  }
  return (
    <main>
      <div className={styles.dish_container}>
        <div className={styles.generated_dish}>
          {!mealLoading ? (
            <>
              <MealImage imageSource={dish.imageSource} />
              <MealDescription
                title={dish.name}
                description={dish.description}
              />
            </>
          ) : (
            <Loading />
          )}

          <button
            className={styles.generate_button}
            onClick={getRandomOrderFromServer}
          >
            Generate new dish
          </button>
        </div>
        <div className={styles.current_order_and_button}>
          <div className={styles.current_order_box}>
            <div className={styles.current_order_text}>
              You current order is:
            </div>
            <div className={styles.current_order_dish}>{dish.name}</div>
            <p className={styles.dish_price}>{dish.price} per person</p>
          </div>
          <LinkButton
            link="/select-drinks"
            text="Continue to drink selection"
          />
        </div>
      </div>
    </main>
  );
};

export default AllMeals;
