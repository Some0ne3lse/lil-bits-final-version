"use client";

import { useOrder } from "@/app/context/OrderContext";
import Header from "@/app/global-components/Header";
import Receipt from "./components/Receipt";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import Footer from "@/app/global-components/Footer";

const ReceiptScreen = () => {
  const { setMenuItems } = useOrder();
  const resetForm = () => {
    setMenuItems(null);
  };
  return (
    <main>
      <Header />
      <Receipt />
      <ReturnToHomepage text="Make a new order" onClick={resetForm} />
      <Footer />
    </main>
  );
};

export default ReceiptScreen;
