import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/api/api";
import styles from "../drinks.module.css";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import Image from "next/image";
import { useOrder } from "@/app/context/OrderContext";
import { DrinkApiType, DrinksResponse } from "@/app/types/types";
import Loading from "@/app/loading";
import { motion } from "framer-motion";

const AllDrinks = () => {
  // First we import from context
  const { drinks, setDrinks, menuItems, setMenuItems } = useOrder();
  // This is to display any errors
  const [error, setError] = useState<string | null>();
  // This is for displaying the loading screen
  const [loading, setLoading] = useState<boolean>(true);
  // This is for importing the drinks from the api
  // Type is in types.ts file because it is a little big
  const [allDrinksFromServer, setAllDrinksFromServer] =
    useState<DrinksResponse | null>(null);

  // This function does what it is named
  // It is wrapped in a try catch for error handling
  const getAllDrinksFromServer = useCallback(async () => {
    try {
      const fetchAllDrinks = await api.getAllDrinks();
      setAllDrinksFromServer(fetchAllDrinks);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message + " Please contact customer support");
      } else {
        setError("Something went wrong. Please contact customer support");
      }
    }
    // When done, it sets loading to false
    setLoading(false);
  }, [setAllDrinksFromServer]);

  // We could put the entire fetch code in the useEffect,
  // but I wanted to have the code similar to the fetch code for meals

  useEffect(() => {
    getAllDrinksFromServer();
  }, [getAllDrinksFromServer]);

  // Since we don't get a price from api, price is set here
  const drinksPrice = 2500;

  // Whenever a drink is selected, this code runs
  const selectDrink = (event: DrinkApiType) => {
    // First we use a spread operator to "copy" the existing array
    // Then we add the drink to the array of drinks
    setDrinks((drinks) => [
      ...drinks,
      {
        id: event.idDrink,
        name: event.strDrink,
        description: event.strInstructions,
        imageSource: event.strDrinkThumb,
        price: drinksPrice,
        category: event.strCategory,
      },
    ]);
  };

  // This code runs when page gets loaded. If we got a previous order,
  // it sets the current drinks to whatever was in the drinks part of menuItems
  useEffect(() => {
    if (menuItems) {
      setDrinks([...menuItems.drinks]);
    } else {
      // If no menuItems, the drinks are set to an empty array
      setDrinks([]);
    }
  }, [menuItems, setDrinks]);

  // Since we don't have an amount on the server,
  // this code checks how many of each type of drinks we have, so we can show it later
  const drinksAmountCounter = (id: string) => {
    let counter = 0;
    // For loop goes through all drinks, then compares id, and then adds it to the counter
    for (const item of drinks) {
      if (item.id === id) {
        counter += 1;
      }
    }
    return counter;
  };

  // resetForm resets menuItems if we have an error,
  // and the user needs to go back to home page
  const resetForm = () => {
    setMenuItems(null);
  };

  // what shows if page is loading
  if (loading) {
    return (
      <div className={styles.drinks_container}>
        <Loading />
      </div>
    );
    // If we have a server or other type of error, this is what shows
  } else if (!allDrinksFromServer || error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className={styles.drinks_error_container}
      >
        <div className={styles.drinks_error_box}>
          <div className={styles.drinks_error}>{error}</div>
          <ReturnToHomepage text="Start over" onClick={resetForm} />
        </div>
      </motion.div>
    );
  }

  // If everything goes right, this will display all drinks
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.drinks_container}
    >
      <div className={styles.all_drinks_box}>
        <div className={styles.all_drinks_scroll}>
          {/* To display the drinks, we map over them, then display them one by one,
          and then we put the counter on top. */}

          {allDrinksFromServer.drinks.map((item, index) => (
            <div
              key={index}
              className={styles.drinks_content}
              onClick={() => selectDrink(item)}
            >
              <div className={styles.image_and_counter}>
                <Image
                  src={item.strDrinkThumb}
                  fill
                  sizes="100%"
                  alt={item.strDrink}
                  className={styles.drink_image}
                  style={{ cursor: "pointer" }}
                  priority
                />

                {/* The counter only shows when we have one or more of the selected drink */}

                {drinksAmountCounter(item.idDrink) > 0 ? (
                  <div className={styles.drink_counter}>
                    {drinksAmountCounter(item.idDrink)}
                  </div>
                ) : null}
              </div>
              <p>{item.strDrink}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AllDrinks;
