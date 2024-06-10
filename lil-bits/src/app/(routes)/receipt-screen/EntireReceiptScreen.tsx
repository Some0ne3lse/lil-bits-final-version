"use client";
import { useOrder } from "@/app/context/OrderContext";
import Receipt from "./components/Receipt";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import styles from "./receipt.module.css";
import { motion } from "framer-motion";

// This is the receipt screen
const EntireReceiptScreen = () => {
  // We start by importing setMenuItems, so we can empty it when we return to home page
  const { setMenuItems } = useOrder();

  const resetForm = () => {
    setMenuItems(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.receipt_screen}
    >
      <Receipt />
      <div className={styles.receipt_return_button}>
        <ReturnToHomepage text="Make a new order" onClick={resetForm} />
      </div>
    </motion.div>
  );
};

export default EntireReceiptScreen;
