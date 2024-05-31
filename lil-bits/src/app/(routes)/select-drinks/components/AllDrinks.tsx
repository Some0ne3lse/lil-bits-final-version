import { useCallback, useEffect, useState } from "react";
import { api } from "@/app/api/api";
import styles from "../AllDrinks.module.css";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import Image from "next/image";
import { useOrder } from "@/app/context/OrderContext";
import { DrinkApiType, DrinksResponse } from "@/app/types/types";

const AllDrinks = () => {
  const { setDrinks, menuItems, setMenuItems } = useOrder();
  const [error, setError] = useState<string | null>();

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
  }, [setAllDrinksFromServer]);

  useEffect(() => {
    getAllDrinksFromServer();
  }, [getAllDrinksFromServer]);

  const selectDrink = (event: DrinkApiType) => {
    setDrinks((drinks) => [
      ...drinks,
      {
        id: event.idDrink,
        name: event.strDrink,
        description: event.strInstructions,
        imageSource: event.strDrinkThumb,
        price: 1000,
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

  const resetForm = () => {
    setMenuItems(null);
  };

  if (!allDrinksFromServer || error) {
    return (
      <>
        <div>{error}</div>
        <ReturnToHomepage text="Start over" onClick={resetForm} />
      </>
    );
  }
  return (
    <div className={styles["drinks-container"]}>
      {allDrinksFromServer.drinks.map((item, index) => (
        <div
          key={index}
          className={styles["drinks-content"]}
          onClick={() => selectDrink(item)}
        >
          <Image
            src={item.strDrinkThumb}
            width={100}
            height={100}
            alt={item.strDrink}
          />
          <p className={styles["drink-name"]}>{item.strDrink}</p>
        </div>
      ))}
    </div>
  );
};

export default AllDrinks;
