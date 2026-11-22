import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExploreCategories from "./components/ExploreCategories";
import FeaturedProperties from "./components/FeaturedProperties";
import FeaturedStays from "./components/FeaturedStays";
import ExploreDestinations from "./components/ExploreDestinations";
import PropertyOwnerCTA from "./components/PropertyOwnerCTA";
import Footer from "./components/Footer";

import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Stays from "./pages/Stays";
import StayDetails from "./pages/StayDetails";
import Land from "./pages/Land";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import ListProperty from "./pages/ListProperty";
import Destination from "./pages/Destination";

import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Saved from "./pages/Saved";
import MyBookings from "./pages/MyBookings";

import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <ExploreCategories />
      <FeaturedProperties />
      <FeaturedStays />
      <ExploreDestinations />
      <PropertyOwnerCTA />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* GENERAL PAGES */}
        <Route path="/about" element={<About />} />

        {/* PROPERTIES */}
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* STAYS */}
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/:id" element={<StayDetails />} />

        {/* OTHER PAGES */}
        <Route path="/land" element={<Land />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/list-property" element={<ListProperty />} />

        {/* DESTINATIONS MAIN PAGE */}
        <Route path="/destinations" element={<ExploreDestinations />} />

        {/* DESTINATION REGION PAGES */}
        <Route path="/destinations/:slug" element={<Destination />} />

        {/* NAIROBI LOCATIONS AND COASTAL COUNTY PAGES */}
        <Route
          path="/destinations/:slug/:locationSlug"
          element={<Destination />}
        />

        {/* COASTAL COUNTY LOCATION PAGES */}
        <Route
          path="/destinations/:slug/:countySlug/:locationSlug"
          element={<Destination />}
        />

        {/* ACCOUNT PAGES */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
