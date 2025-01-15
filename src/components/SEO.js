import React from "react";

const SEO = ({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true,
}) => {
  const pageTitle = shouldExcludeTitleSuffix ? title : `${title} | Livros Gratuitos`;
  const pageImage = image ? `${window.location.origin}/${image}` : null;

  return (
    <>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={pageImage} />}
      {!shouldIndexPage && <meta name="robots" content="noindex, nofollow" />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="theme-color" content="#7B66FF" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={pageImage} />
    </>
  );
};

export default SEO;
