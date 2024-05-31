import Address from "./homepage-components/Address";
import Footer from "./global-components/Footer";
import Header from "./global-components/Header";
import SearchForEmail from "./homepage-components/SearchForEmail";
import TheCarousel from "./homepage-components/TheCarousel";
import styles from "./page.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <Header />
      <TheCarousel />
      <div className={styles.order_container}>
        <div className={styles.order_box}>
          <p className={styles.order_text}>Go to our order screen!</p>
          <Link href="/select-dish">
            <button className={styles.order_button}>Order</button>
          </Link>
        </div>
      </div>
      <SearchForEmail />
      <Address />
      <Footer />
    </main>
  );
};

export default Home;
