import { Button, Card, IconButton } from "@material-ui/core";
import {
  Add,
  ArrowBackIos,
  Delete,
  Remove,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import styles from "../styles/Cart.module.scss";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className={styles.cartWrapper} ref={cartRef}>
      <div className={styles.cartContainer}>
        <Button
          variant="contained"
          className={styles.cartHeading}
          onClick={() => setShowCart(false)}
        >
          <ArrowBackIos />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles.cartNumItems}>({totalQuantities} items)</span>
        </Button>

        {cartItems.length < 1 && (
          <div className={styles.emptyCard}>
            <ShoppingBasketOutlined style={{ fontSize: 150 }} />
            <h3>Shopping card is empty.</h3>
            <Button variant="outlined" onClick={() => setShowCart(false)}>
              Continue Shopping
            </Button>
          </div>
        )}
        <div className={styles.productContainer}>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className={styles.product} key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className={styles.cartProductImage}
                />
                <div className={styles.itemDesc}>
                  <div className={styles.flexTop}>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className={styles.flexMiddle}>{item.quote}</div>
                  <div className={styles.flexBottom}>
                    <div className={styles.flexBottomContent}>
                      <div className={styles.quantity}>
                        <p className={styles.quantityDesc}>
                          <IconButton
                            className={styles.minus}
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                          >
                            <Remove />
                          </IconButton>
                          <span variant="outlined" className={styles.num}>
                            {item.quantity}
                          </span>
                          <IconButton
                            className={styles.plusBut}
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                          >
                            <Add />
                          </IconButton>
                        </p>
                      </div>
                      <Button
                        className={styles.removeItem}
                        onClick={() => onRemove(item)}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className={styles.cartBottom}>
            <div className={styles.total}>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleCheckout}>
                Pay with Stripe
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
