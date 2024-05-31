"use client";

import { DishDescription } from "@/app/types/types";

export default function MealDescription({
  title,
  description,
  price,
}: DishDescription) {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{price} per person</p>
    </>
  );
}
