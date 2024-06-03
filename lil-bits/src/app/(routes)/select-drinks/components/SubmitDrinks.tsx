import { useOrder } from "@/app/context/OrderContext";
import LinkButton from "@/app/global-components/LinkButton";
import RemoveDrinkButton from "./RemoveDrinkButton";
import styles from "../drinks.module.css";

type SubmitDrinkType = {
  drinks: string;
};

const SubmitDrinks = () => {
  const { drinks } = useOrder();

  if (drinks.length === 0) {
    return (
      <div className={styles.selected_drinks_container}>
        <div className={styles.selected_drinks_box}>No drinks selected</div>
      </div>
    );
  }

  const listToSort = [...drinks];

  listToSort.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const drinksPrice = drinks.map((drink) => drink.price);
  const totalDrinksPrice = drinksPrice.reduce((acc, curr) => acc + curr);

  return (
    <div className={styles.selected_drinks_container}>
      <div className={styles.selected_drinks_box}>
        <div>Your Order:</div>
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
      <LinkButton link="/order-screen" text="Continue to Order screen" />
    </div>
  );
};

export default SubmitDrinks;
