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
  const { drinks, setDrinks, menuItems, setMenuItems } = useOrder();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const [allDrinksFromServer, setAllDrinksFromServer] =
    useState<DrinksResponse | null>(null);

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
    setLoading(false);
  }, [setAllDrinksFromServer]);

  useEffect(() => {
    getAllDrinksFromServer();
  }, [getAllDrinksFromServer]);

  const drinksPrice = 2500;

  const selectDrink = (event: DrinkApiType) => {
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

  useEffect(() => {
    if (menuItems) {
      setDrinks([...menuItems.drinks]);
    } else {
      setDrinks([]);
    }
  }, [menuItems, setDrinks]);

  const drinksAmountCounter = (id: string) => {
    let counter = 0;
    for (const item of drinks) {
      if (item.id === id) {
        counter += 1;
      }
    }
    return counter;
  };

  const resetForm = () => {
    setMenuItems(null);
  };

  if (loading) {
    return (
      <div className={styles.drinks_container}>
        <Loading />
      </div>
    );
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.drinks_container}
    >
      <div className={styles.all_drinks_box}>
        <div className={styles.all_drinks_scroll}>
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
