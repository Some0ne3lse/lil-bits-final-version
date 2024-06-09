"use client";

import DateAmountEmailForm from "./components/DateAmountEmailForm";

// There is no loading screen on this page, since we don't fetch anything

const OrderScreen = () => {
  return (
    <main>
      <DateAmountEmailForm />
    </main>
  );
};

export default OrderScreen;
