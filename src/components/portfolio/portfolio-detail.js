import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioDetail(props) {
  const [portfolioItem, setPortfolioItem] = useState("");

  useEffect(() => {
    if (portfolioItem.length == 0) {
      axios
        .get(
          `https://huntergreen.devcamp.space/portfolio/portfolio_items/${
            props.match.params.slug
          }`,
          { withCredentials: true }
        )
        .then(response => {
          setPortfolioItem(response.data.portfolio_item);
        })
        .catch(error => {
          console.log("Error from portfolio detail: ", error);
        });
    }
  });

  const {
    banner_image_url,
    category,
    description,
    logo_url,
    name,
    position,
    thumb_image_url,
    url
  } = portfolioItem;

  const logoStyles = {
    width: "200px"
  };

  const bannerStyles = {
    backgroundImage: `url(${banner_image_url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  };

  return (
    <div className="portfolio-detail-wrapper">
      <div className="banner" style={bannerStyles}>
        <img src={logo_url} style={logoStyles} />
      </div>

      <div className="portfolio-detail-description-wrapper">
        <div className="description">{description}</div>
      </div>

      <div className="bottom-content-wrapper">
        <a href={url} className="site-link" target="_blank">
          Visit {name}
        </a>
      </div>
    </div>
  );
}
