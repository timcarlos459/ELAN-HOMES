import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "ÉLAN HOMES | Live • Stay • Invest in Kenya",
  description = "Discover exceptional properties for sale, beautiful holiday stays and real estate opportunities across Kenya with ÉLAN HOMES.",
  image = "",
  url = "",
  type = "website",
  noindex = false,
}) {
  const siteName = "ÉLAN HOMES";
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="author" content={siteName} />
      <meta name="robots" content={robots} />

      {/* OPEN GRAPH */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* TWITTER / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {image && <meta name="twitter:image" content={image} />}

      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}
