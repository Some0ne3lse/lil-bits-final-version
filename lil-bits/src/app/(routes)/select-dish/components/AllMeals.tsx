"use client";
import { api } from "@/app/api/api";
import MealDescription from "./MealDescription";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import { useOrder } from "@/app/context/OrderContext";
import { Dish } from "@/app/types/types";
import { useCallback, useEffect, useState } from "react";
import LinkButton from "@/app/global-components/LinkButton";
import styles from "../dish.module.css";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";
import MealImage from "./MealImage";

const AllMeals = () => {
  // For communicating with context
  const { menuItems, setMenuItems, dish, setDish } = useOrder();
  // If there are any errors they get set here
  const [error, setError] = useState<string | null>();
  // For setting wether info is loading or not
  const [loading, setLoading] = useState<boolean>(true);
  // If page has loaded, selecting another meal starts loading that only influences the meal part of the app
  const [mealLoading, setMealLoading] = useState<boolean>(false);
  // Starts the loading circle after selecting navigate to next page
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);

  // Since we don't have a price in the api, the price for a meal is set here
  const mealsPrice = 4500;

  // Here we request a new random order
  const getRandomOrderFromServer = useCallback(async () => {
    // setMealLoading is set to true, so we see a loading screen when fetching random order
    setMealLoading(true);

    // fetchRandomOrder is in a try catch, so if we get an error, we get the error screen
    try {
      const fetchRandomOrder = await api.getRandomOrder();
      // We setDish immediately, so when user navigates to next page, it is already set
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
    // both loading states set to false, so the screen shows the meal screen
    setMealLoading(false);
    setLoading(false);
  }, [setDish]);

  // When the page loads, this code runs
  useEffect(() => {
    // If we did not search for an order in previous screen, we fetch a random order
    if (!menuItems) {
      getRandomOrderFromServer();
    } else {
      // If we did search for an order, we run it through a check, to make sure it actually has a dish
      if (menuItems && menuItems.dish) {
        // React doesn't like it when we set something to another value, so here we first make a dishCopy
        const dishCopy: Dish = { ...menuItems.dish };
        setDish(dishCopy);
      } else {
        // If the user somehow got an order into the server without a dish, we first set the error,
        // then after waiting 7 seconds, we fetch a random order from the server
        setError(
          "No dish found with this email. Please start over, or continue with this random dish that will show in a few seconds"
        );
        setTimeout(() => {
          getRandomOrderFromServer();
          setError(null);
        }, 7000);
      }
      setLoading(false);
    }
  }, [getRandomOrderFromServer, menuItems, setDish]);

  // If something went wrong, and the user has to restart, we setMenuItems to null
  const resetForm = () => {
    setMenuItems(null);
  };

  // When the screen is loading we show this
  if (loading) {
    return <Loading />;
    // If we have an error or no dish, the error screen shows
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
  // If everything went right, this is the meals screen
  return (
    // It is wrapped in a motion.div, so we get a fadeIn animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.dish_container}
    >
      <div className={styles.generated_dish}>
        {/* We only show the meal when it is done loading */}
        {!mealLoading ? (
          <div>
            <MealImage imageSource={dish.imageSource} />
            <MealDescription title={dish.name} description={dish.description} />
          </div>
        ) : (
          <Loading />
        )}
        <button
          className={styles.generate_button}
          onClick={getRandomOrderFromServer}
          style={{ cursor: "pointer" }}
        >
          Generate new dish
        </button>
      </div>
      <div className={styles.current_order_and_button}>
        <div className={styles.current_order_box}>
          <div className={styles.current_order_text}>You current order is:</div>
          <div className={styles.current_order_dish}>{dish.name}</div>
          <p className={styles.dish_price}>{dish.price} per person</p>
        </div>
        {/* When we press the Continue to drink selection button, we change it to a loading spinner,
        so the user can only press it once  */}
        {!nextPageLoading ? (
          <LinkButton
            link="/select-drinks"
            text="Continue to drink selection"
            setLoading={() => setNextPageLoading(true)}
          />
        ) : (
          <ReactLoading
            type="spin"
            height={"2rem"}
            width={"2rem"}
            color="#a86e5f"
          />
        )}
      </div>
    </motion.div>
  );
};

export default AllMeals;
