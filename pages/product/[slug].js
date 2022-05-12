import {
  Add,
  Remove,
  StarBorderOutlined,
  StarOutlined,
} from "@material-ui/icons";
import React from "react";
import { client, urlFor } from "../../lib/client";
import styles from "../../styles/ProductDetails.module.scss";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { Button, IconButton } from "@material-ui/core";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };
  return (
    <div>
      <div className={styles.productDetailContainer}>
        <div>
          <div className={styles.imageContainer}>
            <img
              src={urlFor(image && image[0])}
              className="product-detail-image"
            />
          </div>
        </div>

        <div className={styles.productDetailDesc}>
          <h1>{name}</h1>
          <div className={styles.reviews}>
            <div>
              <StarOutlined fontSize="small" />
              <StarOutlined fontSize="small" />
              <StarOutlined fontSize="small" />
              <StarOutlined fontSize="small" />
              <StarBorderOutlined fontSize="small" />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={styles.price}>${price}</p>
          <div className={styles.productDetailContainerPurchase}>
            <div className={styles.quantity}>
              <p className={styles.quantityDesc}>
                <IconButton className={styles.minus} onClick={decQty}>
                  <Remove />
                </IconButton>
                <span className={styles.num}>{qty}</span>
                <IconButton className={styles.plusBut} onClick={incQty}>
                  <Add />
                </IconButton>
              </p>
            </div>
            <div className={styles.plus}>
              <Button
                variant="outlined"
                type="button"
                className={styles.addToCart}
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                type="button"
                className={styles.buyNow}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.maylikeProductsWrapper}>
        <h2>You may also like</h2>
        <div className={styles.marquee}>
          <div className={styles.maylikeProductsContainerTrack}>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
