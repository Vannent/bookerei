import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import styles from "../styles/Product.module.scss";

const Product = ({ product: { image, name, genre, author, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={styles.productCard}>
          <img
            src={urlFor(image && image[0])}
            alt="product"
            className={styles.productImage}
          />
          <p className={styles.productGenre}>#{genre}</p>
          <p className={styles.productName}>{name}</p>
          <p className={styles.productAuthor}>{author}</p>
          <p className={styles.productPrice}>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
