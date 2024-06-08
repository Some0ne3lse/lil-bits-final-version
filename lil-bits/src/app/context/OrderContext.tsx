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

// This is the context for the entire site. It is needed because every part of the menu is created with a setState
// If the user starts by finding their menu, it gets saved to menuItems, which is then used in every other page
// If the user does not find a previous order, menuItems is null until the end, where drinks, dish, etc gets combined into the menuItems

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

// I used chatGPT for the drinksAmountCounter type in OrderContextType and OrderContext.

// At first we create the context with initial values
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

// useOrder is the function we extract to every page that use to actually use the context
const useOrder = () => {
  return useContext(OrderContext);
};

// Here is the provider. This is where all the data is stored
// Different states are saved in setState. This is all the data from the different sites
// It starts out with null or 1 as in the orderAmount
const OrderProvider = ({ children }: OrderProviderProps) => {
  const [menuItems, setMenuItems] = useState<OrderType | null>(null);
  const [dish, setDish] = useState<Dish | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  return (
    // OrderContext.Provider wraps around all it's children. All children can then use the context
    // In layout.tsx you can see that I wrapped it around the entire body, so all components can use them
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
};

export { useOrder, OrderProvider };
