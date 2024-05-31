"use client";
import AllDrinks from "./components/AllDrinks";
import Footer from "@/app/global-components/Footer";
import Header from "@/app/global-components/Header";
import SubmitDrinks from "./components/SubmitDrinks";

const SelectDrinks = () => {
  return (
    <main>
      <Header />
      <AllDrinks />
      <SubmitDrinks />
      <Footer />
    </main>
  );
};

export default SelectDrinks;
