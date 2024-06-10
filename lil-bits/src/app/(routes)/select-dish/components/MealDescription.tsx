"use client";
import { motion } from "framer-motion";
import styles from "../dish.module.css";

type DishDescription = {
  title: string;
  description: string;
};

// This is the box for describing what meal is currently selected
const MealDescription = ({ title, description }: DishDescription) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className={styles.dish_description_box}
      >
        <div className={styles.dish_description_scroll}>
          <h1 className={styles.dish_description_title}>{title}</h1>
          <p className={styles.dish_description_text}>{description}</p>
        </div>
      </motion.div>
    </>
  );
};

export default MealDescription;
