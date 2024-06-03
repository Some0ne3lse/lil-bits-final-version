"use client";
import AllDrinks from "./components/AllDrinks";
import Footer from "@/app/global-components/Footer";
import Header from "@/app/global-components/Header";
import SubmitDrinks from "./components/SubmitDrinks";
import styles from "./drinks.module.css";

const SelectDrinks = () => {
  return (
    <main>
      <Header />
      <div className={styles.drinks_page}>
        <AllDrinks />
        <SubmitDrinks />
      </div>
      <Footer />
    </main>
  );
};

export default SelectDrinks;
