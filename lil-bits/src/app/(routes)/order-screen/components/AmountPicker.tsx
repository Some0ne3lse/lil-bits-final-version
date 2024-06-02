import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AmountPickerType = {
  decreaseAmount: () => void;
  increaseAmount: () => void;
  invalidAmount: String | null;
  count: Number;
};

const AmountPicker = ({
  decreaseAmount,
  increaseAmount,
  invalidAmount,
  count: count,
}: AmountPickerType) => {
  return (
    <>
      <label>Select amount of people</label>
      <FontAwesomeIcon icon={faAngleDown} onClick={decreaseAmount} />
      <div>{count.toString()}</div>
      <FontAwesomeIcon icon={faAngleUp} onClick={increaseAmount} />
      {invalidAmount && <div>{invalidAmount}</div>}
    </>
  );
};

export default AmountPicker;
