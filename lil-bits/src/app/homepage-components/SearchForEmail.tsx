"use client";
import { useCallback, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { api } from "../api/api";
import styles from "../page.module.css";
import ReactLoading from "react-loading";

const SearchForEmail = () => {
  const [email, setEmail] = useState<string>("");
  const { setMenuItems } = useOrder();
  const [error, setError] = useState<string | null>(null);
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);
  const router = useRouter();

  // This function gets order previously sent to server, using the api from api.ts
  const getOrdersFromServer = useCallback(
    async (email: string) => {
      const fetchOrders = await api.getOrders(email).catch((error) => {
        // If the api sends an error, it gets set here, so it can be shown later
        setError(
          error.message +
            "' Please make sure you entered the correct email or contact customer service"
        );
      });
      // If we get something from the api, we assign it to menuItems.
      // menuItems get's used for the rest of the application to set the different data for the different components.
      // After adding menuItems we go to the next screen
      if (fetchOrders) {
        setMenuItems(fetchOrders);
        router.push("/select-dish");
      }
      // If something went wrong we stop nextPageLoading, so the button can be used again
      setNextPageLoading(false);
    },
    [router, setMenuItems]
  );

  // This is just to control email input
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // When the submit button gets pressed, this function starts
  const handleVerifyClick = (event: React.FormEvent) => {
    event.preventDefault();
    // nextPageLoading set to true, so people don't press the button again and again
    setNextPageLoading(true);
    // Email verification
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexp.test(email)) {
      getOrdersFromServer(email);
    } else {
      setError("Not a valid email");
      // If wrong email used, button can be pressed again
      setNextPageLoading(false);
    }
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleVerifyClick} className={styles.form}>
        <label htmlFor="email" className={styles.form_label}>
          Search for your order via email address
        </label>
        <input
          id="email"
          type="text"
          autoComplete="off"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={styles.form_input}
        />
        {/* If we get an error, it gets shown here */}
        {error && (
          <div className={styles.error_container}>
            <div className={styles.error}>{error}</div>
          </div>
        )}
        {/* Whenever the user presses the button, we start a loading circle
        and remove the button, so user is forced to wait */}
        {!nextPageLoading ? (
          <input
            type="submit"
            value="Search"
            className={styles.submit_button}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <ReactLoading
            type="spin"
            height={"2rem"}
            width={"2rem"}
            color="#a86e5f"
          />
        )}
      </form>
    </div>
  );
};

export default SearchForEmail;
