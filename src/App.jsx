import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExploreCategories from "./components/ExploreCategories";
import FeaturedProperties from "./components/FeaturedProperties";
import FeaturedStays from "./components/FeaturedStays";
import ExploreDestinations from "./components/ExploreDestinations";
import PropertyOwnerCTA from "./components/PropertyOwnerCTA";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ExploreCategories />
        <FeaturedProperties />
        <FeaturedStays />
        <ExploreDestinations />
        <PropertyOwnerCTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
