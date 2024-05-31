"use client";

import { DishDescription } from "@/app/types/types";

const MealDescription = ({ title, description, price }: DishDescription) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price} per person</p>
    </>
  );
};

export default MealDescription;
