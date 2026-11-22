import { useParams, Link } from "react-router-dom";

// REGION IMPORTS
import Nairobi from "./nairobi/nairobi";
import Coastal from "./coastal/Coastal";
import Eastern from "./eastern/Eastern";
import Central from "./central/Central";

// COUNTY IMPORTS
import Kilifi from "./coastal/counties/kilifi/Kilifi";
import Kwale from "./coastal/counties/kwale/Kwale";
import Lamu from "./coastal/counties/lamu/Lamu";
import Mombasa from "./coastal/counties/mombasa/mombasa";
import TaitaTaveta from "./coastal/counties/taita-taveta/TaitaTaveta";

export default function DestinationController() {
  const { slug, locationSlug, countySlug } = useParams();

  // NAIROBI REGION
  if (slug === "nairobi") {
    return <Nairobi locationSlug={locationSlug} />;
  }

  // COASTAL REGION
  if (slug === "coastal") {
    const activeCountySlug = countySlug || locationSlug;

    if (activeCountySlug === "kilifi") {
      return <Kilifi locationSlug={countySlug ? locationSlug : undefined} />;
    }

    if (activeCountySlug === "kwale") {
      return <Kwale locationSlug={countySlug ? locationSlug : undefined} />;
    }

    if (activeCountySlug === "lamu") {
      return <Lamu locationSlug={countySlug ? locationSlug : undefined} />;
    }

    if (activeCountySlug === "mombasa") {
      return <Mombasa locationSlug={countySlug ? locationSlug : undefined} />;
    }

    if (activeCountySlug === "taita-taveta") {
      return (
        <TaitaTaveta locationSlug={countySlug ? locationSlug : undefined} />
      );
    }

    if (!locationSlug) {
      return <Coastal />;
    }

    return (
      <main className="destination-not-found">
        <h1>County Coming Soon</h1>
        <p>We are preparing this coastal destination for ÉLAN HOMES.</p>
        <Link to="/destinations/coastal">Back to Coastal Region</Link>
      </main>
    );
  }

  // EASTERN REGION
  if (slug === "eastern") {
    return <Eastern locationSlug={locationSlug} />;
  }

  // CENTRAL REGION
  if (slug === "central") {
    return <Central locationSlug={locationSlug} />;
  }

  // OTHER REGIONS
  return (
    <main className="destination-not-found">
      <h1>Destination Coming Soon</h1>
      <p>We are preparing this destination for ÉLAN HOMES.</p>
      <Link to="/">Return Home</Link>
    </main>
  );
}
