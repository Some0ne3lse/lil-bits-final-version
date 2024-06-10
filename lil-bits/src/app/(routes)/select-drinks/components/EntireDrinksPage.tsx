"use client";
import { motion } from "framer-motion";
import AllDrinks from "./AllDrinks";
import SubmitDrinks from "./SubmitDrinks";
import styles from "../drinks.module.css";

const EntireDrinksPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.entire_drinks_page}
    >
      <AllDrinks />
      <SubmitDrinks />
    </motion.div>
  );
};

export default EntireDrinksPage;
