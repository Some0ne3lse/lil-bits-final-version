"use client";
import { useCallback, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { api } from "../api/api";
import styles from "../page.module.css";

const SearchForEmail = () => {
  const [email, setEmail] = useState<string>("");
  const { setMenuItems } = useOrder();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(false);
    },
    [router, setMenuItems]
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleVerifyClick = (event: React.FormEvent) => {
    event.preventDefault();
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexp.test(email)) {
      setLoading(true);
      getOrdersFromServer(email);
    } else {
      setError("Not a valid email");
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
        {loading && <div>Fetching order...</div>}
        {error && (
          <div className={styles.error_container}>
            <div className={styles.error}>{error}</div>
          </div>
        )}
        <input type="submit" value="Search" className={styles.submit_button} />
      </form>
    </div>
  );
};

export default SearchForEmail;
