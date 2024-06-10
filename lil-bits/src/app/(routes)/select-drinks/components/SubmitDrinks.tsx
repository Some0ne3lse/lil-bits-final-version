import { useOrder } from "@/app/context/OrderContext";
import LinkButton from "@/app/global-components/LinkButton";
import RemoveDrinkButton from "./RemoveDrinkButton";
import styles from "../drinks.module.css";
import ReactLoading from "react-loading";
import { useState } from "react";

type SubmitDrinkType = {
  drinks: string;
};

// This page shows all drinks we have selected
const SubmitDrinks = () => {
  // First we import from context
  const { drinks } = useOrder();
  // This state is for displaying the loading circle when user selects Continue to Order screen
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);

  // If we have no drinks selected, this is what shows
  if (drinks.length === 0) {
    return (
      <div className={styles.selected_drinks_container}>
        <div className={styles.selected_drinks_box}>No drinks selected</div>
      </div>
    );
  }

  // So the drinks are sorted by name, we run this sort function
  // First we copy the drinks array
  const listToSort = [...drinks];

  // Then we sort that list
  listToSort.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  // This code is for displaying the price for the drinks.
  // First we map over the drinks array, so we can get all the individual prices
  const drinksPrice = drinks.map((drink) => drink.price);
  // Then we reduce, so we get the total amount
  const totalDrinksPrice = drinksPrice.reduce((acc, curr) => acc + curr);

  return (
    <div className={styles.selected_drinks_container}>
      <div className={styles.selected_drinks_box}>
        <div>Your Order:</div>

        {/* We map over listToSort so we can see them in alphabetical order */}

        {listToSort.map((drink, index) => (
          <div key={index} className={styles.drink_and_delete}>
            <div className={styles.selected_drink_name}>{drink.name}</div>
            <RemoveDrinkButton index={index} />
          </div>
        ))}
        {drinks && (
          <p className={styles.drinks_price}>Price: {totalDrinksPrice}</p>
        )}
      </div>

      {/* When user wants to go to next screen we take away the button,
      so they can only press it once */}

      {!nextPageLoading ? (
        <LinkButton
          link="/order-screen"
          text="Continue to Order screen"
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
  );
};

export default SubmitDrinks;
