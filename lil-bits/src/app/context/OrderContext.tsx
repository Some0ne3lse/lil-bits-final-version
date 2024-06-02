"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Dish, Drink, OrderType } from "../types/types";

type OrderProviderProps = {
  children: ReactNode;
};

type OrderContextType = {
  menuItems: OrderType | null;
  setMenuItems: Dispatch<SetStateAction<OrderType | null>>;
  dish: Dish | null;
  setDish: Dispatch<SetStateAction<Dish | null>>;
  drinks: Drink[];
  setDrinks: Dispatch<SetStateAction<Drink[]>>;
  orderDate: Date | null;
  setOrderDate: Dispatch<SetStateAction<Date | null>>;
  orderAmount: number;
  setOrderAmount: Dispatch<SetStateAction<number>>;
  orderEmail: string | null;
  setOrderEmail: Dispatch<SetStateAction<string | null>>;
  drinksAmountCounter: (id: string) => number;
};

// I used chatGPT for the drinksAmountCounter in OrderContextType and OrderContext.

const OrderContext = createContext<OrderContextType>({
  menuItems: null,
  setMenuItems: () => {},
  dish: null,
  setDish: () => {},
  drinks: [],
  setDrinks: () => [],
  orderDate: null,
  setOrderDate: () => Date,
  orderAmount: 1,
  setOrderAmount: () => Number,
  orderEmail: null,
  setOrderEmail: () => String,
  drinksAmountCounter: () => 0,
});

const useOrder = () => {
  return useContext(OrderContext);
};

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [menuItems, setMenuItems] = useState<OrderType | null>(null);
  const [dish, setDish] = useState<Dish | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  const drinksAmountCounter = (id: string) => {
    let counter = 0;
    for (const item of drinks) {
      if (item.id === id) {
        counter += 1;
      }
    }
    return counter;
  };

  return (
    <OrderContext.Provider
      value={{
        menuItems,
        setMenuItems,
        dish,
        setDish,
        drinks,
        setDrinks,
        orderDate,
        setOrderDate,
        orderAmount,
        setOrderAmount,
        orderEmail,
        setOrderEmail,
        drinksAmountCounter,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { useOrder, OrderProvider };
