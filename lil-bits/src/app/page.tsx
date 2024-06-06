import Address from "./homepage-components/Address";
import Footer from "./global-components/Footer";
import Header from "./global-components/Header";
import SearchForEmail from "./homepage-components/SearchForEmail";
import TheCarousel from "./homepage-components/TheCarousel";
import styles from "./page.module.css";
import LinkButton from "./global-components/LinkButton";
import EntireHomePage from "./homepage-components/EntireHomePage";

const Home = () => {
  return (
    <main>
      <Header />
      <EntireHomePage />
      <Footer />
    </main>
  );
};

export default Home;
