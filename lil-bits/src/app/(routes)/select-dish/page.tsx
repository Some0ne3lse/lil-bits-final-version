import AllMeals from "./components/AllMeals";

const SelectDish = () => {
  // I put all code in AllMeals when I was creating the loading screen.
  // At the time it was better, since I had header and footer here instead of in layout.tsx
  // Might change this back later
  return (
    <main>
      <AllMeals />
    </main>
  );
};

export default SelectDish;
