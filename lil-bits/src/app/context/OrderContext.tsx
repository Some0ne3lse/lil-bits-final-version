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
};

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
});

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [menuItems, setMenuItems] = useState<OrderType | null>(null);
  const [dish, setDish] = useState<Dish | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
