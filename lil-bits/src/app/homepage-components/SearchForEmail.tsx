"use client";
import { useCallback, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
import { api } from "../api/api";

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
      setError("No email found");
    }
  };

  return (
    <form onSubmit={handleVerifyClick}>
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
      {error && <div>{error}</div>}
      <input type="submit" value="Search for this email" />
    </form>
  );
}
