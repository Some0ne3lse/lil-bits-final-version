"use client";

import styles from "../dish.module.css";

type DishDescription = {
  title: string;
  description: string;
};

const MealDescription = ({ title, description }: DishDescription) => {
  return (
    <>
      <div className={styles.dish_description_box}>
        <div className={styles.dish_description_scroll}>
          <h1 className={styles.dish_description_text}>{title}</h1>
          <p className={styles.dish_description_text}>{description}</p>
        </div>
      </div>
    </>
  );
};

export default MealDescription;
