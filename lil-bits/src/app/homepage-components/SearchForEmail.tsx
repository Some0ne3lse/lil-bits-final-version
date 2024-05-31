"use client";
import { useCallback, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { api } from "../api/api";
import styles from "../page.module.css";

export default function SearchForEmail() {
  const [email, setEmail] = useState<string>("");
  const { setMenuItems } = useOrder();
  const [error, setError] = useState<string | null>(null);
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
      getOrdersFromServer(email);
    } else {
      setError("Not a valid email");
    }
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleVerifyClick} className={styles.form}>
        <input
          type="text"
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
        <input
          type="submit"
          value="Search for your order with email"
          className={styles.submit_button}
        />
      </form>
    </div>
  );
}
