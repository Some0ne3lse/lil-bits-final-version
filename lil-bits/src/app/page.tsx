import EntireHomePage from "./homepage-components/EntireHomePage";

const Home = () => {
  // I put all code in EntireHomePage because in other pages we return
  // different components depending on errors, and I want to keep the code consistent
  return (
    <main>
      <EntireHomePage />
    </main>
  );
};

export default Home;
