"use client";

import { useOrder } from "@/app/context/OrderContext";
import Receipt from "./components/Receipt";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import styles from "./receipt.module.css";

const ReceiptScreen = () => {
  const { setMenuItems } = useOrder();
  const resetForm = () => {
    setMenuItems(null);
  };
  return (
    <main>
      <div className={styles.receipt_screen}>
        <Receipt />
        <div className={styles.receipt_return_button}>
          <ReturnToHomepage text="Make a new order" onClick={resetForm} />
        </div>
      </div>
    </main>
  );
};

export default ReceiptScreen;
