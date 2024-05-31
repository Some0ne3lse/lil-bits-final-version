import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AmountPickerType = {
  decreaseAmount: () => void;
  increaseAmount: () => void;
  invalidAmount: String | null;
  count: Number;
};

export default function AmountPicker({
  decreaseAmount,
  increaseAmount,
  invalidAmount,
  count: count,
}: AmountPickerType) {
  return (
    <>
      <h2>Select amount of people</h2>
      <FontAwesomeIcon icon={faAngleDown} onClick={decreaseAmount} />
      <div>{count.toString()}</div>
      <FontAwesomeIcon icon={faAngleUp} onClick={increaseAmount} />
      {invalidAmount && <div>{invalidAmount}</div>}
    </>
  );
}
