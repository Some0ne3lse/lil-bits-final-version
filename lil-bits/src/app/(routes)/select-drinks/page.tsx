"use client";
import AllDrinks from "./components/AllDrinks";
import SubmitDrinks from "./components/SubmitDrinks";
import styles from "./drinks.module.css";

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
