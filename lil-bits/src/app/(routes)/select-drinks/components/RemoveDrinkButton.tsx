import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "@/app/context/OrderContext";

const RemoveDrinkButton = ({ index }: { index: number }) => {
  const { drinks, setDrinks } = useOrder();

  const handleDeleteClick = (indexToDelete: number) => {
    const newDrinksList = [
      ...drinks.slice(0, indexToDelete),
      ...drinks.slice(indexToDelete + 1),
    ];
    setDrinks(newDrinksList);
  };
  return (
    <FontAwesomeIcon icon={faBan} onClick={() => handleDeleteClick(index)} />
  );
};
export default RemoveDrinkButton;
