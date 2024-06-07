"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  const checkActivePath = (path: string) => {
    return path === pathName;
  };
  return (
    <header className="header">
      <Image
        src={"/lilBits.png"}
        width={150}
        height={144}
        alt="Lil' Bits logo"
        priority
      />
      <h2 className={checkActivePath("/select-dish") ? "active" : "inactive"}>
        Select Dish
      </h2>
      <h2 className={checkActivePath("/select-drinks") ? "active" : "inactive"}>
        Select Drinks
      </h2>
      <h2 className={checkActivePath("/order-screen") ? "active" : "inactive"}>
        Order Screen
      </h2>
      <h2
        className={checkActivePath("/receipt-screen") ? "active" : "inactive"}
      >
        Your Receipt
      </h2>
    </header>
  );
};

export default Header;
