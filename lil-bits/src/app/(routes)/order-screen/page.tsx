"use client";

import Header from "@/app/global-components/Header";
import DateAmountEmailForm from "./components/DateAmountEmailForm";
import Footer from "@/app/global-components/Footer";

const OrderScreen = () => {
  return (
    <main>
      <Header />
      <DateAmountEmailForm />
      <Footer />
    </main>
  );
};

export default OrderScreen;
