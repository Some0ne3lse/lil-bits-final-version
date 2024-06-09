import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../order.module.css";

type AmountPickerType = {
  decreaseAmount: () => void;
  increaseAmount: () => void;
  invalidAmount: String | null;
  count: Number;
};

// This is for picking how many dishes the order should be

const AmountPicker = ({
  decreaseAmount,
  increaseAmount,
  invalidAmount,
  count,
}: AmountPickerType) => {
  // We pass the above things to props, so it works with the form
  // In the browser you will get the issue 'No label associated with this field'
  // I am not sure how to fix this, tried a few different methods
  return (
    <div className={styles.amount_container}>
      <label className={styles.form_label_amount}>
        Select amount of people
        <div className={styles.amount_selector}>
          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={decreaseAmount}
            style={{ cursor: "pointer" }}
            className={styles.amount_icon}
          />
          <div className={styles.amount_number}>{count.toString()}</div>
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={increaseAmount}
            style={{ cursor: "pointer" }}
            className={styles.amount_icon}
          />
        </div>
      </label>

      {/* If the amount is above 10 or below 1 we set the invalidAmount and show it */}
      {invalidAmount && (
        <div className={styles.amount_error}>{invalidAmount}</div>
      )}
    </div>
  );
};

export default AmountPicker;
