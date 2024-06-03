"use client";

import { useOrder } from "@/app/context/OrderContext";
import Header from "@/app/global-components/Header";
import Receipt from "./components/Receipt";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import Footer from "@/app/global-components/Footer";
import styles from "./receipt.module.css";

const ReceiptScreen = () => {
  const { setMenuItems } = useOrder();
  const resetForm = () => {
    setMenuItems(null);
  };
  return (
    <main>
      <Header />
      <div className={styles.receipt_screen}>
        <Receipt />
        <div className={styles.receipt_return_button}>
          <ReturnToHomepage text="Make a new order" onClick={resetForm} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ReceiptScreen;
