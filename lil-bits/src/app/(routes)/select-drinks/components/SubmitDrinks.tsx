import { useOrder } from "@/app/context/OrderContext";
import LinkButton from "@/app/global-components/LinkButton";
import RemoveDrinkButton from "./RemoveDrinkButton";

type SubmitDrinkType = {
  drinks: string;
};

const SubmitDrinks = () => {
  const { drinks } = useOrder();

  if (drinks.length === 0) {
    return <div>No drinks selected</div>;
  }

  const drinksPrice = drinks.map((drink) => drink.price);
  const totalDrinksPrice = drinksPrice.reduce((acc, curr) => acc + curr);

  return (
    <>
      {drinks.map((drink, index) => (
        <div key={index}>
          <div>{drink.name}</div>
          <RemoveDrinkButton index={index} />
        </div>
      ))}
      {drinks && <p>Price: {totalDrinksPrice}</p>}
      <LinkButton link="/order-screen" text="Continue to Order screen" />
    </>
  );
};

export default SubmitDrinks;
