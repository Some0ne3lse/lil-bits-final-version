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

// This is the most complicated part of the application.
// We can probably improve it, but I am running short on time, and my level is not advanced enough

const DateAmountEmailForm = () => {
  // First we import everything we need from react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormFieldsType>();
  // Then we import everything we need from context.
  const { setOrderEmail, menuItems, setMenuItems, dish, drinks, setDrinks } =
    useOrder();

  // Date for selected date
  const [date, setDate] = useState<Date | null>(null);
  // Count for amount of people
  const [count, setCount] = useState<number>(1);
  // invalidAmount is the message that gets shown
  // when user wants to select amount lower than 1 or higher than 10
  const [invalidAmount, setInvalidAmount] = useState<String | null>(null);
  // totalPrice to show user price, that changes with amount of people
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // error for showing error text
  const [error, setError] = useState<string | null>(null);
  // dateError for showing invalid date text. Email error is defined in return code
  const [dateError, setDateError] = useState<string | null>(null);
  // nextPageLoading is for displaying loading spinner conditionally
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);

  // When page loads, if we have a menuItems from previous order,
  // we set all the info here. User still has to update date, and confirm with email
  useEffect(() => {
    if (menuItems) {
      const emailDate = new Date(menuItems.date);
      setDate(emailDate);
      setCount(menuItems.count);
      setOrderEmail(menuItems.email);
    }
  }, [menuItems, setOrderEmail]);

  // We also run this function to display the total price for the entire order
  // and later set the price to the menuItems in updateOrder or addOrder function
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

  // This code is to handle changing to next page
  // I use router instead of link, so I can call it conditionally
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/receipt-screen");
  };

  // We have two functions that almost do the same
  // updateOrder and addOrder
  // One updates the other creates a new order
  const updateOrder = async (data: FormFieldsType) => {
    // First we start the loading spinner so user has to wait
    setNextPageLoading(true);
    // Then we try to update the order
    try {
      // We make a copy of menuItems, and then update any value that was changed
      const newMenuItems = {
        ...menuItems,
        email: data.email,
        dish: dish,
        drinks: drinks,
        count: count,
        date: data.date,
        price: totalPrice,
      };
      // Try to update the order with our putOrder in api.ts
      await api.putOrder(newMenuItems);
      // setMenuItems to newMenuItems so we can use it one final time in receipt
      setMenuItems(newMenuItems);
      // And then go to the next page
      handleRedirect();

      // If any errors come up, we set the error to whatever went wrong
    } catch (err: unknown) {
      // We stop the loading spinner, so user can select an option
      setNextPageLoading(false);
      if (err instanceof Error) {
        // We don't really know what kind of error we'll get,
        // but if it's an instance of Error, we print the error.message,
        // and give the user 3 choices. They are defined later in the code
        setError(
          err.message +
            " Something went wrong. If you want to create a new order, try doing so. Otherwise contact costumer support"
        );
        // If we don't know what kind of error it is, we ask user to contact customer service
      } else {
        setError("Something went wrong. Please contact customer service");
      }
    }
  };

  // addOrder is almost the same as updateOrder
  const addOrder = async (data: FormFieldsType) => {
    // First we set the loading spinner, so the user has to wait
    setNextPageLoading(true);
    // We make a copy of menuItems, and then update any value that was changed
    // It should be null, but we still do it this way to be sure everything goes right
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
      // Run the postOrder which creates a new order for our server
      await api.postOrder(newMenuItems);
      // setMenuItems so we can use it one last time
      setMenuItems(newMenuItems);
      // Go to next page
      handleRedirect();
      // If any errors come up, we set the error to whatever went wrong
    } catch (err: unknown) {
      // We stop the loading spinner, so user can select an option
      setNextPageLoading(false);
      if (err instanceof Error) {
        // We don't really know what kind of error we'll get,
        // but if it's an instance of Error, we print the error.message,
        // and give the user 3 choices. They are defined later in the code
        setError(
          err.message +
            " Something went wrong. If you previously used this email, try updating instead. Otherwise contact customer support"
        );
        // If we don't know what kind of error it is, we ask user to contact customer service
      } else {
        setError("Something went wrong. Please contact customer service");
      }
    }
  };

  // This function handles any changes to the date-picker component
  const handleChange = (dateChange: Date) => {
    // I am not completely sure about what shouldDirty does,
    // but as I understand it, it let's us modify the default value
    setValue("date", dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };

  // This function simply checks if it's a weekday.
  // This is so the user has to select a day from Monday to Friday
  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // This function makes sure that user can't select a time before current time
  const filterPassedTime = (time: Date) => {
    // Gets current time
    const currentDate = new Date();
    // Gets selected time
    const selectedDate = new Date(time);
    // Insures that selected time is later than current time
    return currentDate.getTime() < selectedDate.getTime();
  };

  // This function decreases the amount counter, unless it is 1 or lower
  // If so, we get the invalidAmountMessage
  const decreaseAmount = () => {
    if (count <= 1) {
      setInvalidAmount("Please select an amount higher than 0");
    } else {
      setCount(count - 1);
      setInvalidAmount(null);
    }
  };

  // This function increase the amount counter, unless it is 10 or higher
  // If so, we get the invalidAmountMessage
  const increaseAmount = () => {
    if (count >= 10) {
      setInvalidAmount("Please select and amount lower than 11");
    } else {
      setCount(count + 1);
      setInvalidAmount(null);
    }
  };

  // If user goes back to start incase of error, we reset everything
  const resetForm = () => {
    setMenuItems(null);
    setCount(1);
    setDate(null);
    setDrinks([]);
    setOrderEmail(null);
  };

  // If we got an order in the very beginning, we change the name of the button
  let buttonName = "Create new order";

  if (menuItems) {
    buttonName = "Update existing order";
  }

  // If the user is missing anything in their order,
  // for example if they updated the page in drinks or meal selector,
  // we give them this page.

  // We check if dish or drinks is empty
  if (!dish || drinks.length === 0) {
    return (
      <div className={styles.missing_items_container}>
        <div className={styles.missing_items_box}>
          <div className={styles.missing_item_error}>
            Current items are missing from your order:
          </div>

          {/* If dish is empty, this message shows */}

          {!dish && (
            <div className={styles.missing_dish_error}>
              You have not selected a dish yet
            </div>
          )}

          {/* If drinks array is empty, this message shows */}

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

  // This is the entire form
  return (
    // motion.div is for animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.form_container}
    >
      <form className={styles.entire_form} noValidate>
        <div className={styles.date_and_amount}>
          <div className={styles.date_and_error}>
            {/* Since we are using react-hook-form we need a controller.
            First is for the date. It is required, and gives the error message,
            if it is missing. */}

            <Controller
              name="date"
              control={control}
              rules={{ required: { value: true, message: "Date is required" } }}
              render={() => (
                // Render is what we're actually showing
                // Visit https://reactdatepicker.com/ for details on props

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

            {/* Here we show any errors related to the date.
            dateError gets defined later, but is mostly if the selected date is outside the time frame
            errors.date is any error we get from the form */}

            {dateError && <div className={styles.date_error}>{dateError}</div>}
            {errors.date && (
              <div className={styles.date_error}>{errors.date.message}</div>
            )}
          </div>

          {/* This is the component for the amount of people.
          More info in component itself */}

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

            {/* This input is for the email. It checks the value, and if it doesn't fit, gives an error. */}

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

            {/* This is the button for submitting the form.
            If the button has been pressed, it changes to a spinning loader,
            so the user is forced to wait */}

            {!nextPageLoading ? (
              <button
                className={styles.submit_button}
                style={{ cursor: "pointer" }}
                // When submit is pressed, we check if the date follows the rules we made,
                // and if so, it does one of the following:
                // If we have menuItems, we fetched an order all the way back in the first page,
                // so we use the updateOrder function
                // If not, it creates a new order with the addOrder function.

                // If it doesn't follow the date rules, we get a small error below the input.
                // I did it this way, because if you make the order on a weekend,
                // the default value would be that day, and the user would be able to select that day and time,
                // even though we filter time and dates in the date-picker code
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
        {/* If we have an error and menuItems, it usually means one of two things:
        1: Server doesn't respond
        2: User selected a mail different from the one they used to fetch the order

        To deal with this, we give the user the option to create a new order,
        with the selected email, or correct the email.
        They can also return to home page, which is defined later in the code */}
        {error && menuItems && (
          <button
            className={styles.submit_button}
            style={{ cursor: "pointer" }}
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

        {/* If we have an error and no menuItems, it is usually because of two
        things: 1: Server doesn't respond 2: There is an order with that email
        in the system To deal with this, we give the user the option to update
        the order in the system, with the selected email, or correct the email.
        They can also return to home page, which is defined later in the code */}

        {error &&
          !menuItems &&
          (!nextPageLoading ? (
            <button
              style={{ cursor: "pointer" }}
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

      {/* If we have any error it is displayed here. 
      We also give the user the option to start over */}

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
