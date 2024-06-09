import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "@/app/context/OrderContext";
import styles from "../drinks.module.css";

// This is the button for removing drinks
const RemoveDrinkButton = ({ index }: { index: number }) => {
  // First we import from context
  const { drinks, setDrinks } = useOrder();

  // This function is what happens when you click the button
  const handleDeleteClick = (indexToDelete: number) => {
    // We make a new list, use slice to get all drinks before and after the selected index
    // Then we setDrinks to the new list
    const newDrinksList = [
      ...drinks.slice(0, indexToDelete),
      ...drinks.slice(indexToDelete + 1),
    ];
    setDrinks(newDrinksList);
  };
  return (
    <FontAwesomeIcon
      className={styles.remove_drink_button}
      icon={faBan}
      onClick={() => handleDeleteClick(index)}
    />
  );
};
export default RemoveDrinkButton;
