import EntireDrinksPage from "./components/EntireDrinksPage";

const SelectDrinks = () => {
  // I am not sure about how I did it here. I want to keep the code consistent,
  // but we only display the error inside the AllDrinks component.
  // For now I keep it like this
  return (
    <main>
      <EntireDrinksPage />
    </main>
  );
};

export default SelectDrinks;
