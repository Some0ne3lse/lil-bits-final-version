import EntireHomePage from "./homepage-components/EntireHomePage";

const Home = () => {
  // I put all code in EntireHomePage when I was creating the loading screen.
  // At the time it was better, since I had header and footer here instead of in layout.tsx
  // Might change this back later
  return (
    <main>
      <EntireHomePage />
    </main>
  );
};

export default Home;
