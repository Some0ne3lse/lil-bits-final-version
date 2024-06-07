"use client";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import AmountPicker from "./AmountPicker";
import { useRouter } from "next/navigation";
import { useOrder } from "@/app/context/OrderContext";
import { api } from "@/app/api/api";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import styles from "../order.module.css";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";

type FormFieldsType = {
  email: string;
  date: Date;
  count: number;
};

const DateAmountEmailForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormFieldsType>();
  const { setOrderEmail, menuItems, setMenuItems, dish, drinks, setDrinks } =
    useOrder();
  const [date, setDate] = useState<Date | null>(null);
  const [count, setCount] = useState<number>(1);
  const [invalidAmount, setInvalidAmount] = useState<String | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (menuItems) {
      const emailDate = new Date(menuItems.date);
      setDate(emailDate);
      setCount(menuItems.count);
      setOrderEmail(menuItems.email);
    }
  }, [menuItems, setOrderEmail]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (drinks.length !== 0 && dish) {
        const drinksPrice = drinks.map((drink) => drink.price);
        const totalDrinksPrice = drinksPrice.reduce((acc, curr) => acc + curr);
        const foodPrice = dish.price * count;

        return totalDrinksPrice + foodPrice;
      }
      return 0;
    };
    setTotalPrice(calculateTotalPrice());
  }, [count, dish, drinks]);

  const updateOrder = async (data: FormFieldsType) => {
    setLoading(true);
    try {
      const newMenuItems = {
        ...menuItems,
        email: data.email,
        dish: dish,
        drinks: drinks,
        count: count,
        date: data.date,
        price: totalPrice,
      };
      await api.putOrder(newMenuItems);
      setMenuItems(newMenuItems);
      handleRedirect();
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(
          err.message +
            " Something went wrong. If you want to create a new order, try doing so. Otherwise contact costumer support"
        );
      } else {
        setError("Something went wrong. Please contact customer service");
      }
    }
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/receipt-screen");
  };

  const addOrder = async (data: FormFieldsType) => {
    setLoading(true);
    try {
      const newMenuItems = {
        ...menuItems,
        email: data.email,
        dish: dish,
        drinks: drinks,
        count: count,
        date: data.date,
        price: totalPrice,
      };
      await api.postOrder(newMenuItems);
      setMenuItems(newMenuItems);
      handleRedirect();
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(
          err.message +
            " Something went wrong. If you previously used this email, try updating instead. Otherwise contact customer support"
        );
      } else {
        setError("Something went wrong. Please contact customer service");
      }
    }
  };

  const handleChange = (dateChange: Date) => {
    setValue("date", dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };

  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const decreaseAmount = () => {
    if (count <= 1) {
      setInvalidAmount("Please select an amount higher than 0");
    } else {
      setCount(count - 1);
      setInvalidAmount(null);
    }
  };

  const increaseAmount = () => {
    if (count >= 10) {
      setInvalidAmount("Please select and amount lower than 11");
    } else {
      setCount(count + 1);
      setInvalidAmount(null);
    }
  };

  const resetForm = () => {
    setMenuItems(null);
    setCount(1);
    setDate(null);
    setDrinks([]);
    setOrderEmail(null);
  };

  let buttonName = "Create new order";

  if (menuItems) {
    buttonName = "Update existing order";
  }

  if (!dish || drinks.length === 0) {
    return (
      <div className={styles.missing_items_container}>
        <div className={styles.missing_items_box}>
          <div className={styles.missing_item_error}>
            Current items are missing from your order:
          </div>
          {!dish && (
            <div className={styles.missing_dish_error}>
              You have not selected a dish yet
            </div>
          )}
          {drinks.length === 0 && (
            <div className={styles.missing_drink_error}>
              You have not selected drinks yet
            </div>
          )}
          <div className={styles.return_error}>
            Please return to the start page and avoid updating during selection
          </div>
          <ReturnToHomepage onClick={resetForm} text="Start over" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.form_container}
    >
      <form className={styles.entire_form} noValidate>
        <div className={styles.date_and_amount}>
          <div className={styles.date_and_error}>
            <Controller
              name="date"
              control={control}
              rules={{ required: { value: true, message: "Date is required" } }}
              render={() => (
                <div className={styles.date_picker_container}>
                  <label
                    htmlFor="datePicker"
                    className={styles.form_label_date_picker}
                  >
                    Select your date
                  </label>
                  <DatePicker
                    className="date_picker"
                    id="datePicker"
                    minDate={new Date()}
                    isClearable
                    filterDate={isWeekDay}
                    filterTime={filterPassedTime}
                    disabledKeyboardNavigation
                    minTime={new Date(0, 0, 0, 16, 0)}
                    maxTime={new Date(0, 0, 0, 23, 0)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy"
                    timeFormat="HH:mm"
                    required
                    selected={date}
                    placeholderText="Select date"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              )}
            />
            {dateError && <div className={styles.date_error}>{dateError}</div>}
            {errors.date && (
              <div className={styles.date_error}>{errors.date.message}</div>
            )}
          </div>
          <Controller
            control={control}
            name="count"
            render={() => (
              <AmountPicker
                count={count}
                decreaseAmount={decreaseAmount}
                increaseAmount={increaseAmount}
                invalidAmount={invalidAmount}
              />
            )}
          />
        </div>
        <div className={styles.email_and_submit}>
          <div className={styles.email_and_error}>
            <label className={styles.form_label_email} htmlFor="email">
              Enter your email here
            </label>

            <input
              className={styles.email_input}
              autoComplete="off"
              id="email"
              type="email"
              placeholder={
                menuItems?.email ? "Please re-enter email" : "Enter email"
              }
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className={styles.email_error}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.price_and_submit}>
            <div className={styles.total_price_text}>
              Total price: {totalPrice}
            </div>
            {!loading ? (
              <button
                className={styles.submit_button}
                onClick={handleSubmit((data) => {
                  data.count = count;
                  if (isWeekDay(data.date)) {
                    if (filterPassedTime(data.date)) {
                      if (menuItems) {
                        updateOrder(data);
                      } else if (!menuItems) {
                        addOrder(data);
                      }
                    } else {
                      setDateError(
                        "You can only pick a time after current time"
                      );
                    }
                  } else {
                    setDateError(
                      "You can only pick a date and time from Monday to Friday, 16:00 - 23:00"
                    );
                  }
                })}
              >
                {buttonName}
              </button>
            ) : (
              <ReactLoading
                type="spin"
                height={"2rem"}
                width={"2rem"}
                color="#a86e5f"
              />
            )}
          </div>
        </div>
        {error && menuItems && (
          <button
            className={styles.submit_button}
            onClick={handleSubmit((data) => {
              data.count = count;
              if (isWeekDay(data.date)) {
                if (filterPassedTime(data.date)) {
                  addOrder(data);
                } else {
                  setDateError("You can only pick a time after current time");
                }
              } else {
                setDateError(
                  "You can only pick a date and time from Monday to Friday, 16:00 - 23:00"
                );
              }
            })}
          >
            Create new order
          </button>
        )}
        {error &&
          !menuItems &&
          (!loading ? (
            <button
              className={styles.submit_button}
              onClick={handleSubmit((data) => {
                data.count = count;
                if (isWeekDay(data.date)) {
                  if (filterPassedTime(data.date)) {
                    updateOrder(data);
                  } else {
                    setDateError("You can only pick a time after current time");
                  }
                } else {
                  setDateError(
                    "You can only pick a date and time from Monday to Friday, 16:00 - 23:00"
                  );
                }
              })}
            >
              Update existing order
            </button>
          ) : (
            <ReactLoading
              type="spin"
              height={"2rem"}
              width={"2rem"}
              color="#a86e5f"
            />
          ))}
      </form>
      {error && (
        <div className={styles.order_error_container}>
          <div className={styles.order_error_box}>
            <div className={styles.order_error}>{error}</div>
            <ReturnToHomepage onClick={resetForm} text="Start over" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DateAmountEmailForm;
