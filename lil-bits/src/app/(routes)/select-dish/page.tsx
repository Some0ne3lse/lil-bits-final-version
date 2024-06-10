import AllMeals from "./components/AllMeals";

const SelectDish = () => {
  // I put all code in AllMeals because if we have an error,
  // we display that instead of the meals, and I like it better this way
  return (
    <main>
      <AllMeals />
    </main>
  );
};

export default SelectDish;
