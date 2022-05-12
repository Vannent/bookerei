import { IconButton } from "@material-ui/core";
import {
  CollectionsBookmarkOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.scss";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className={styles.navbarContainer}>
      <p className={styles.logo}>
        <CollectionsBookmarkOutlined fontSize="large" />
        <Link href="/">Bookerei</Link>
      </p>

      <div className={styles.navbarContainerRight}>
        <IconButton onClick={() => setShowCart((prevState) => !prevState)}>
          <ShoppingBasketOutlined />
          <span className={styles.cartItemQty}>{totalQuantities}</span>
        </IconButton>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
