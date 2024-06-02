"use client";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import AmountPicker from "./AmountPicker";
import { useRouter } from "next/navigation";
import { useOrder } from "@/app/context/OrderContext";
import { api } from "@/app/api/api";
import { OrderType } from "@/app/types/types";
import ReturnToHomepage from "@/app/global-components/ReturnToHomepage";
import styles from "../order.module.css";

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
  const [emailTaken, setEmailTaken] = useState<boolean>(false);

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

  const updateOrder = (orderObject: OrderType) => {
    api
      .putOrder(orderObject)
      .then(() => {
        handleRedirect();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setEmailTaken(false);
      });
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/receipt-screen");
  };

  const addOrder = (orderObject: OrderType) => {
    api
      .postOrder(orderObject)
      .then(() => {
        if (!error) {
          handleRedirect();
        }
      })
      .catch((err) => {
        setError(
          err.message +
            " If you already made an order with this email, you can try updating your order instead"
        );
        setMenuItems(orderObject);
        setEmailTaken(true);
      });
  };

  const onSubmitData = (data: FormFieldsType) => {
    if (!menuItems) {
      const newMenuItems = {
        email: data.email,
        dish: dish,
        drinks: drinks,
        count: data.count,
        date: data.date,
        price: totalPrice,
      };
      setMenuItems(newMenuItems);
      addOrder(newMenuItems);
    } else if (menuItems) {
      const newMenuItems = {
        ...menuItems,
        email: data.email,
        dish: dish,
        drinks: drinks,
        count: count,
        date: data.date,
        price: totalPrice,
      };
      setMenuItems(newMenuItems);
      updateOrder(newMenuItems);
    } else {
      setError(
        "Some items are missing from your order. Please try again or contact customer support"
      );
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

  let buttonName = "Submit order";

  if (menuItems) {
    buttonName = "Update order";
  }

  if (!dish || drinks.length === 0) {
    return (
      <>
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>{error}</div>
        {menuItems && emailTaken && (
          <button onClick={() => updateOrder(menuItems)}>Update Order</button>
        )}
        <ReturnToHomepage onClick={resetForm} text="Start over" />
      </>
    );
  }

  // Ask about weekend dates

  return (
    <div className={styles.form_container}>
      <form
        className={styles.entire_form}
        onSubmit={handleSubmit((data) => {
          data.count = count;
          if (isWeekDay(data.date)) {
            if (filterPassedTime(data.date)) {
              onSubmitData(data);
            } else {
              setDateError("You can only pick a time after current time");
            }
          } else {
            setDateError(
              "You can only pick a date and time from Monday to Friday, 16:00 - 23:00"
            );
          }
        })}
        noValidate
      >
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
        {dateError && <div>{dateError}</div>}
        {errors.date && <div>{errors.date.message}</div>}
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
        <label className={styles.form_label_email} htmlFor="email">
          Enter your email here
        </label>
        <input
          className={styles.email_input}
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
        {errors.email && <div>{errors.email.message}</div>}
        <div className={styles.total_price_text}>Total price: {totalPrice}</div>
        <button className={styles.submit_button} type="submit">
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default DateAmountEmailForm;
