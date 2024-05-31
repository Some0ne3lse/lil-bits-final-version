import LinkButton from "../../../global-components/LinkButton";

type SubmitDishType = {
  dish: string;
};

export default function SubmitDish({ dish }: SubmitDishType) {
  return (
    <>
      <div>You current order is: {dish}</div>
      <LinkButton link="/select-drinks" text="Continue to drink selection" />
    </>
  );
}
