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

  const getOrdersFromServer = useCallback(
    async (email: string) => {
      const fetchOrders = await api.getOrders(email).catch((error) => {
        setError(
          error.message +
            "' Please make sure you entered the correct email or contact customer service"
        );
      });
      if (fetchOrders) {
        setMenuItems(fetchOrders);
        router.push("/select-dish");
      }
      setNextPageLoading(false);
    },
    [router, setMenuItems]
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleVerifyClick = (event: React.FormEvent) => {
    event.preventDefault();
    setNextPageLoading(true);
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexp.test(email)) {
      getOrdersFromServer(email);
    } else {
      setError("Not a valid email");
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
        {error && (
          <div className={styles.error_container}>
            <div className={styles.error}>{error}</div>
          </div>
        )}
        {!nextPageLoading ? (
          <input
            type="submit"
            value="Search"
            className={styles.submit_button}
          />
        ) : (
          <>
            <div>Currently fetching your order...</div>
          </>
        )}
      </form>
    </div>
  );
};

export default SearchForEmail;
