import Address from "./homepage-components/Address";
import Footer from "./global-components/Footer";
import Header from "./global-components/Header";
import OrderButton from "./homepage-components/OrderButton";
import SearchForEmail from "./homepage-components/SearchForEmail";
import TheCarousel from "./homepage-components/TheCarousel";

const Home = () => {
  return (
    <main>
      <Header />
      <TheCarousel />
      <OrderButton />
      <SearchForEmail />
      <Address />
      <Footer />
    </main>
  );
};

export default Home;
