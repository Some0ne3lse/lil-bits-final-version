"use client";
import AllDrinks from "./components/AllDrinks";
import SubmitDrinks from "./components/SubmitDrinks";
import styles from "./drinks.module.css";

// Here we have 2 components in the page file. This is so we can always show the drinks that have already been
// selected in case of the user trying to update their order, even if the drinks api is down
const SelectDrinks = () => {
  return (
    <main>
      <div className={styles.drinks_page}>
        <AllDrinks />
        <SubmitDrinks />
      </div>
    </main>
  );
};

export default SelectDrinks;
