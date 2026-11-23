import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExploreCategories from "./components/ExploreCategories";
import FeaturedProperties from "./components/FeaturedProperties";
import FeaturedStays from "./components/FeaturedStays";
import ExploreDestinations from "./components/ExploreDestinations";
import PropertyOwnerCTA from "./components/PropertyOwnerCTA";
import Footer from "./components/Footer";

import "./App.css";

// LAZY-LOADED PAGES
const About = lazy(() => import("./pages/About"));

const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));

const Stays = lazy(() => import("./pages/Stays"));
const StayDetails = lazy(() => import("./pages/StayDetails"));

const Land = lazy(() => import("./pages/Land"));
const Contact = lazy(() => import("./pages/Contact"));
const Search = lazy(() => import("./pages/Search"));
const ListProperty = lazy(() => import("./pages/ListProperty"));
const Destination = lazy(() => import("./pages/Destination"));

const SignIn = lazy(() => import("./pages/SignIn"));
const Register = lazy(() => import("./pages/Register"));
const Account = lazy(() => import("./pages/Account"));
const Saved = lazy(() => import("./pages/Saved"));
const MyBookings = lazy(() => import("./pages/MyBookings"));

// LOADING SCREEN
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <p>Loading ÉLAN HOMES...</p>
    </div>
  );
}

// HOME PAGE
function Home() {
  return (
    <>
      <SEO
        title="ÉLAN HOMES | Discover Properties & Holiday Stays in Kenya"
        description="Discover exceptional homes, villas, apartments, properties for sale and beautiful holiday stays across Kenya. Live, Stay and Invest with ÉLAN HOMES."
      />

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
      <ScrollToTop />

      <Navbar />

      <Suspense fallback={<PageLoader />}>
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

          {/* DESTINATIONS */}
          <Route path="/destinations" element={<ExploreDestinations />} />
          <Route path="/destinations/:slug" element={<Destination />} />

          {/* DESTINATION LOCATIONS */}
          <Route
            path="/destinations/:slug/:locationSlug"
            element={<Destination />}
          />

          {/* COASTAL COUNTY LOCATIONS */}
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
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
