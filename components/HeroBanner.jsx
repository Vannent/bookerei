import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import styles from "../styles/HeroBanner.module.scss";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className={styles.heroBannerContainer}>
      <div>
        <p className={styles.heroBannerContainerGenre}>{heroBanner.genre}</p>
        <h3>{heroBanner.bookHeader}</h3>
        <div className={styles.heroBannerContainerDescription}>
          {heroBanner.desc}
        </div>
        <Link href={`/product/outliers-malcolm-gladwell`}>
          <Button className={styles.contained} variant="contained">
            {heroBanner.buttonText}
          </Button>
        </Link>
        <Link href={heroBanner.authorLink}>
          <Button className={styles.outlined} variant="outlined">
            {heroBanner.buttonText2}
          </Button>
        </Link>
      </div>
      <img src={urlFor(heroBanner.image)} alt="Outliers Book Cover" />
    </div>
  );
};

export default HeroBanner;
