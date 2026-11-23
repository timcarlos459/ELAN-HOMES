import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";

// REGION IMPORTS
import Nairobi from "./nairobi/nairobi";
import Coastal from "./coastal/Coastal";
import Eastern from "./eastern/Eastern";
import Central from "./central/Central";
import RiftValley from "./rift-valley/RiftValley";
import NyanzaWestern from "./nyanza-western/NyanzaWestern";
import Kajiado from "./kajiado/Kajiado";

// COUNTY IMPORTS
import Kilifi from "./coastal/counties/kilifi/Kilifi";
import Kwale from "./coastal/counties/kwale/Kwale";
import Lamu from "./coastal/counties/lamu/Lamu";
import Mombasa from "./coastal/counties/mombasa/mombasa";
import TaitaTaveta from "./coastal/counties/taita-taveta/TaitaTaveta";

// KAJIADO LOCATION IMPORTS
import OngataRongai from "./kajiado/locations/OngataRongai";
import Kitengela from "./kajiado/locations/Kitengela";
import Kiserian from "./kajiado/locations/Kiserian";
import Ngong from "./kajiado/locations/Ngong";
import Amboseli from "./kajiado/locations/Amboseli";
import Oloitoktok from "./kajiado/locations/Oloitoktok";

export default function DestinationController() {
  const { slug, locationSlug, countySlug } = useParams();

  const regionNames = {
    nairobi: "Nairobi",
    coastal: "Coastal Kenya",
    eastern: "Eastern Kenya",
    central: "Central Kenya",
    "rift-valley": "Rift Valley",
    "nyanza-western": "Nyanza and Western Kenya",
    kajiado: "Kajiado County",
  };

  const countyNames = {
    kilifi: "Kilifi",
    kwale: "Kwale",
    lamu: "Lamu",
    mombasa: "Mombasa",
    "taita-taveta": "Taita Taveta",
  };

  const formatName = (value) => {
    if (!value) return "";

    const specialNames = {
      "mombasa-island-cbd": "Mombasa Island–CBD",
      "galu-beach-kinondo": "Galu Beach–Kinondo",
      "msambweni-shimoni": "Msambweni–Shimoni",
      "wundanyi-taita-hills": "Wundanyi–Taita Hills",
      "makueni-wote": "Makueni–Wote",
      "nyanza-western": "Nyanza and Western",
    };

    if (specialNames[value]) return specialNames[value];

    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // DETERMINE DESTINATION NAME
  let destinationName = regionNames[slug] || "Kenya";
  let destinationContext = "";

  if (slug === "coastal") {
    if (countySlug) {
      const countyName = countyNames[countySlug] || formatName(countySlug);

      destinationName = locationSlug ? formatName(locationSlug) : countyName;
      destinationContext = locationSlug ? `, ${countyName}` : "";
    } else if (locationSlug) {
      destinationName = countyNames[locationSlug] || formatName(locationSlug);
    }
  } else if (slug === "kajiado" && locationSlug) {
    destinationName = formatName(locationSlug);
    destinationContext = ", Kajiado County";
  } else if (locationSlug) {
    destinationName = formatName(locationSlug);
  }

  const seoTitle =
    locationSlug || countySlug
      ? `Properties & Holiday Stays in ${destinationName}${destinationContext}, ${
          slug === "nairobi"
            ? "Nairobi"
            : slug === "coastal"
              ? "Kenya"
              : regionNames[slug] || "Kenya"
        } | ÉLAN HOMES`
      : `Explore ${destinationName} | Properties & Holiday Stays in Kenya | ÉLAN HOMES`;

  const seoDescription = `Discover properties for sale and beautiful holiday stays in ${destinationName}${destinationContext} with ÉLAN HOMES. Explore accommodation and real estate opportunities across Kenya.`;

  const renderWithSEO = (content) => (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      {content}
    </>
  );

  // NAIROBI REGION
  if (slug === "nairobi") {
    return renderWithSEO(<Nairobi locationSlug={locationSlug} />);
  }

  // COASTAL REGION
  if (slug === "coastal") {
    const activeCountySlug = countySlug || locationSlug;

    if (activeCountySlug === "kilifi") {
      return renderWithSEO(
        <Kilifi locationSlug={countySlug ? locationSlug : undefined} />,
      );
    }

    if (activeCountySlug === "kwale") {
      return renderWithSEO(
        <Kwale locationSlug={countySlug ? locationSlug : undefined} />,
      );
    }

    if (activeCountySlug === "lamu") {
      return renderWithSEO(
        <Lamu locationSlug={countySlug ? locationSlug : undefined} />,
      );
    }

    if (activeCountySlug === "mombasa") {
      return renderWithSEO(
        <Mombasa locationSlug={countySlug ? locationSlug : undefined} />,
      );
    }

    if (activeCountySlug === "taita-taveta") {
      return renderWithSEO(
        <TaitaTaveta locationSlug={countySlug ? locationSlug : undefined} />,
      );
    }

    if (!locationSlug) {
      return renderWithSEO(<Coastal />);
    }

    return renderWithSEO(
      <main className="destination-not-found">
        <h1>County Coming Soon</h1>
        <p>We are preparing this coastal destination for ÉLAN HOMES.</p>
        <Link to="/destinations/coastal">Back to Coastal Region</Link>
      </main>,
    );
  }

  // EASTERN REGION
  if (slug === "eastern") {
    return renderWithSEO(<Eastern locationSlug={locationSlug} />);
  }

  // CENTRAL REGION
  if (slug === "central") {
    return renderWithSEO(<Central locationSlug={locationSlug} />);
  }

  // RIFT VALLEY REGION
  if (slug === "rift-valley") {
    return renderWithSEO(<RiftValley locationSlug={locationSlug} />);
  }

  // NYANZA & WESTERN REGION
  if (slug === "nyanza-western") {
    return renderWithSEO(<NyanzaWestern locationSlug={locationSlug} />);
  }

  // KAJIADO REGION AND LOCATIONS
  if (slug === "kajiado") {
    if (!locationSlug) {
      return renderWithSEO(<Kajiado />);
    }

    if (locationSlug === "ongata-rongai") {
      return renderWithSEO(<OngataRongai />);
    }

    if (locationSlug === "kitengela") {
      return renderWithSEO(<Kitengela />);
    }

    if (locationSlug === "kiserian") {
      return renderWithSEO(<Kiserian />);
    }

    if (locationSlug === "ngong") {
      return renderWithSEO(<Ngong />);
    }

    if (locationSlug === "amboseli") {
      return renderWithSEO(<Amboseli />);
    }

    if (locationSlug === "oloitoktok") {
      return renderWithSEO(<Oloitoktok />);
    }

    return renderWithSEO(
      <main className="destination-not-found">
        <h1>Location Coming Soon</h1>
        <p>We are preparing this Kajiado destination for ÉLAN HOMES.</p>
        <Link to="/destinations/kajiado">Back to Kajiado</Link>
      </main>,
    );
  }

  // OTHER REGIONS
  return renderWithSEO(
    <main className="destination-not-found">
      <h1>Destination Coming Soon</h1>
      <p>We are preparing this destination for ÉLAN HOMES.</p>
      <Link to="/">Return Home</Link>
    </main>,
  );
}
