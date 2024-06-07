"use client";
import { useOrder } from "@/app/context/OrderContext";
import Receipt from "./components/Receipt";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import styles from "./receipt.module.css";
import { motion } from "framer-motion";

const ReceiptScreen = () => {
  const { setMenuItems } = useOrder();
  const resetForm = () => {
    setMenuItems(null);
  };
  return (
    <main>
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
    </main>
  );
};

export default ReceiptScreen;
