import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../order.module.css";

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
    <div className={styles.amount_container}>
      <label className={styles.form_label_amount}>
        Select amount of people
      </label>
      <div className={styles.amount_selector}>
        <FontAwesomeIcon
          icon={faAngleDown}
          onClick={decreaseAmount}
          className={styles.amount_icon}
        />
        <div className={styles.amount_number}>{count.toString()}</div>
        <FontAwesomeIcon
          icon={faAngleUp}
          onClick={increaseAmount}
          className={styles.amount_icon}
        />
      </div>
      {invalidAmount && (
        <div className={styles.amount_error}>{invalidAmount}</div>
      )}
    </div>
  );
};

export default AmountPicker;
