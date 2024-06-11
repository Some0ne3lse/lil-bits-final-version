"use client";
import { api } from "@/app/api/api";
import { useOrder } from "@/app/context/OrderContext";
import { OrderType } from "@/app/types/types";
import { useCallback, useEffect, useState } from "react";
import styles from "../receipt.module.css";
import Image from "next/image";
import Loading from "@/app/loading";

// This is the receipt itself
const Receipt = () => {
  // Import menuItems so we can make sure the order got saved in the server later
  const { menuItems } = useOrder();
  // After fetching, we set the order to receipt
  const [receipt, setReceipt] = useState<OrderType | null>(menuItems);
  // Error for any error handling
  const [error, setError] = useState<string | null>(null);
  // Loading to display loading screen
  const [loading, setLoading] = useState<boolean>(true);

  // To make sure that we saved the server, we have this code
  const getOrdersFromServer = useCallback(async (email: string) => {
    const fetchOrders = await api.getOrders(email).catch((error) => {
      // If we have any errors, they are shown here
      setError(
        "ERROR: '" +
          error.message +
          "' Please check your internet connection or contact customer service"
      );
    });
    // If fetch is a success we set the order to receipt
    if (fetchOrders) {
      setReceipt(fetchOrders);
    }
    // Then we stop loading screen
    setLoading(false);
  }, []);

  // This code runs on page load.
  useEffect(() => {
    // We should have menuItems from order-screen, so we take the email from that,
    // and search the server for that email.
    // Then we know the meal is in the server
    if (menuItems) {
      getOrdersFromServer(menuItems?.email);
    } else {
      // If something went wrong, we stop the loading and show this text
      setLoading(false);
      setError(
        "There was an issue getting your order. Please try again without updating"
      );
    }
  }, [getOrdersFromServer, menuItems]);

  // This function is for setting the date format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading screen if page is loading
  if (loading) {
    return <Loading />;
  }

  // First we check if receipt has all the info and that it is not null
  if (
    receipt !== null &&
    receipt.date &&
    receipt.email &&
    receipt.dish &&
    receipt.drinks &&
    receipt.price &&
    receipt.count
  ) {
    // Then display all the data.
    return (
      <div className={styles.receipt_container}>
        <div className={styles.receipt_box}>
          <div className={styles.all_text}>
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
                <span>{receipt.dish.name}</span>{" "}
                <div className={styles.receipt_price}>
                  {receipt.dish.price} ISK per person
                </div>
              </div>
              <div>
                <p className={styles.receipt_type}>Selected Drinks:</p>
                {receipt.drinks.map((item, index) => (
                  <div key={index}>
                    <span>{item.name}</span>{" "}
                    <span className={styles.receipt_price}>
                      {item.price} ISK
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className={styles.receipt_type}>Amount Of Servings</p>{" "}
                {receipt.count}
              </div>
            </div>
            <div className={styles.receipt_price}>
              Total: {receipt.price} ISK
            </div>
          </div>
          <div className={styles.receipt_images}>
            <div className={styles.dish_image_container}>
              <Image
                className={styles.dish_image}
                src={receipt.dish.imageSource}
                alt={receipt.dish.name}
                width={100}
                height={100}
                priority
              />
            </div>
            <div className={styles.drink_grid}>
              {receipt.drinks.map((item, index) => (
                <div key={index} className={styles.drinks_content}>
                  <Image
                    className={styles.receipt_drinks_image}
                    src={item.imageSource}
                    alt={item.name}
                    width={45}
                    height={45}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // If something is missing, this is what gets shown
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
