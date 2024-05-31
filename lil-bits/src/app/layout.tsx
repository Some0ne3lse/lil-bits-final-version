import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "./context/OrderContext";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lil'Bits Orders",
  description: "The place to get your food",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <OrderProvider>
        <body className={quicksand.className}>{children}</body>
      </OrderProvider>
    </html>
  );
};

export default RootLayout;
