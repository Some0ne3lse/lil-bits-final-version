import Address from "./homepage-components/Address";
import Footer from "./global-components/Footer";
import Header from "./global-components/Header";
import SearchForEmail from "./homepage-components/SearchForEmail";
import TheCarousel from "./homepage-components/TheCarousel";
import styles from "./page.module.css";
import LinkButton from "./global-components/LinkButton";

const Home = () => {
  return (
    <main>
      <div className={styles.entire_home_page}>
        <Header />
        <TheCarousel />
        <div className={styles.homepage_buttons}>
          <div className={styles.order_container}>
            <div className={styles.order_box}>
              <p className={styles.order_text}>Go to our order screen!</p>
              <LinkButton link="/select-dish" text="Order" />
            </div>
          </div>
          <SearchForEmail />
        </div>
        <Address />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
