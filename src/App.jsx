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
const RequestViewing = lazy(() => import("./pages/RequestViewing"));

const Stays = lazy(() => import("./pages/Stays"));
const StayDetails = lazy(() => import("./pages/StayDetails"));

const Land = lazy(() => import("./pages/Land"));
const LandDetails = lazy(() => import("./pages/LandDetails"));
const RequestLandViewing = lazy(() => import("./pages/RequestLandViewing"));

// CENTRAL ENQUIRY SYSTEM
const Enquiry = lazy(() => import("./pages/Enquiry"));

// CUSTOMER ENQUIRY TRACKING
const TrackEnquiry = lazy(() => import("./pages/TrackEnquiry"));

// CUSTOMER PAYMENTS AND RECEIPTS
const Payment = lazy(() => import("./pages/Payment"));
const Receipt = lazy(() => import("./pages/Receipt"));

// LIVE CUSTOMER SUPPORT
const SupportChat = lazy(() => import("./components/SupportChat"));

const Contact = lazy(() => import("./pages/Contact"));
const Search = lazy(() => import("./pages/Search"));
const ListProperty = lazy(() => import("./pages/ListProperty"));
const Destination = lazy(() => import("./pages/Destination"));

// SUPPORT PAGES
const HelpCentre = lazy(() => import("./pages/HelpCentre"));
const BookingPolicy = lazy(() => import("./pages/BookingPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Careers = lazy(() => import("./pages/Careers"));

// ACCOUNT PAGES
const SignIn = lazy(() => import("./pages/SignIn"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Account = lazy(() => import("./pages/Account"));
const AccountSecurity = lazy(() => import("./pages/AccountSecurity"));
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

      <div className="app">
        <Navbar />

        <main className="app-main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* HOME */}
              <Route path="/" element={<Home />} />

              {/* GENERAL PAGES */}
              <Route path="/about" element={<About />} />

              {/* PROPERTIES */}
              <Route path="/properties" element={<Properties />} />
              <Route
                path="/properties/:id/request-viewing"
                element={<RequestViewing />}
              />
              <Route path="/properties/:id" element={<PropertyDetails />} />

              {/* STAYS */}
              <Route path="/stays" element={<Stays />} />
              <Route path="/stays/:id" element={<StayDetails />} />

              {/* LAND */}
              <Route path="/land" element={<Land />} />
              <Route
                path="/land/:id/request-viewing"
                element={<RequestLandViewing />}
              />
              <Route path="/land/:id" element={<LandDetails />} />

              {/* CENTRAL ENQUIRY SYSTEM */}
              <Route path="/enquiry/:category/:id" element={<Enquiry />} />

              {/* CUSTOMER ENQUIRY TRACKING */}
              <Route path="/track-enquiry" element={<TrackEnquiry />} />

              {/* CUSTOMER PAYMENTS AND RECEIPTS */}
              <Route path="/payment/:invoiceId" element={<Payment />} />
              <Route path="/receipt/:receiptId" element={<Receipt />} />

              {/* OTHER PAGES */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="/list-property" element={<ListProperty />} />

              {/* DESTINATIONS */}
              <Route path="/destinations" element={<ExploreDestinations />} />
              <Route path="/destinations/:slug" element={<Destination />} />
              <Route
                path="/destinations/:slug/:locationSlug"
                element={<Destination />}
              />
              <Route
                path="/destinations/:slug/:countySlug/:locationSlug"
                element={<Destination />}
              />

              {/* SUPPORT PAGES */}
              <Route path="/help-centre" element={<HelpCentre />} />
              <Route path="/booking-policy" element={<BookingPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsConditions />}
              />
              <Route path="/careers" element={<Careers />} />

              {/* ACCOUNT PAGES */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route
                path="/account/reset-password"
                element={<ResetPassword />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/account/security" element={<AccountSecurity />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/bookings" element={<MyBookings />} />
            </Routes>
          </Suspense>
        </main>

        {/* FLOATING LIVE SUPPORT ON ALL PAGES */}
        <SupportChat />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
