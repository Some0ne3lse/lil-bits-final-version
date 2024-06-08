import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "./context/OrderContext";
import Header from "./global-components/Header";
import Footer from "./global-components/Footer";

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
  // OrderProvider here since I want to use it in entire app.
  // I used chatGPT here since I didn't know what layout.tsx was before then
  // Now I do, and I put header and footer here by myself
  return (
    <html lang="en">
      <OrderProvider>
        <body className={quicksand.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </OrderProvider>
    </html>
  );
};

export default RootLayout;
