"use client";
import { api } from "@/app/api/api";
import { useOrder } from "@/app/context/OrderContext";
import { OrderType } from "@/app/types/types";
import { useCallback, useEffect, useState } from "react";
import styles from "../receipt.module.css";

const Receipt = () => {
  const { menuItems } = useOrder();
  const [receipt, setReceipt] = useState<OrderType | null>(menuItems);
  const [error, setError] = useState<string | null>(null);

  const getOrdersFromServer = useCallback(async (email: string) => {
    const fetchOrders = await api.getOrders(email).catch((error) => {
      setError(
        "ERROR: '" +
          error.message +
          "' Please check your internet connection or contact customer service"
      );
    });
    if (fetchOrders) {
      setReceipt(fetchOrders);
    }
  }, []);

  useEffect(() => {
    if (menuItems) {
      getOrdersFromServer(menuItems?.email);
    } else {
      setError(
        "There was an issue getting your order. Please try again without updating"
      );
    }
  }, [getOrdersFromServer, menuItems]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (
    receipt?.date &&
    receipt?.email &&
    receipt.dish &&
    receipt.drinks &&
    receipt.price &&
    receipt.count
  ) {
    return (
      <div className={styles.receipt_container}>
        <div className={styles.receipt_box}>
          <div className={styles.receipt_text}>
            <div>
              <p className={styles.receipt_type}>Date:</p>
              {formatDate(receipt.date)}
            </div>
            <div>
              <p className={styles.receipt_type}>Email:</p>
              {receipt?.email}
            </div>
            <div>
              <p className={styles.receipt_type}>Selected Dish:</p>
              {receipt.dish.name}
            </div>
            <div>
              <p className={styles.receipt_type}>Selected Drinks:</p>
              {receipt.drinks.map((item, index) => (
                <div key={index}>{item.name}</div>
              ))}
            </div>
            <div>
              <p className={styles.receipt_type}>Amount Of Servings</p>{" "}
              {receipt.count}
            </div>
          </div>
          <div className={styles.receipt_total_price}>
            Total: {receipt.price} ISK
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.receipt_error_container}>
        <div className={styles.receipt_error_box}>
          <div className={styles.receipt_error}>{error}</div>
        </div>
      </div>
    );
  }
};

export default Receipt;
