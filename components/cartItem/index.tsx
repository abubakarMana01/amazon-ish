import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import TextTruncate from "react-text-truncate";
import { motion } from "framer-motion";
import { RemoveShoppingCart } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

type productTypes = {
  id: string;
  image: string;
  price: string;
  title: string;
  rating: { rate: number };
  category: string;
};

interface IProps {
  data: productTypes;
}

export default function CartItem({ data }: IProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween" }}
      layout
      className={styles.product__container}
    >
      <div className={styles.product__imageContainer}>
        <Image
          src={data.image}
          width="100%"
          height="100%"
          objectFit="contain"
          alt="product image"
        />
      </div>

      <div className={styles.product__details}>
        <Link href={"/products/" + data.id}>
          <a className={styles.product__name}>
            {/* <TextTruncate
              line={2}
              element="p"
              containerClassName={styles.product__name}
              truncateText=""
              text={data.title}
            /> */}

            {data.title}
          </a>
        </Link>

        <div className={styles.product__priceAndQuantityContainer}>
          <p className={styles.product__price}>{`$${data.price}`}</p>

          <div className={styles.product__quantityContainer}>
            <button onClick={handleQuantityDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleQuantityIncrease}>+</button>
          </div>
          <Tooltip title="Remove from cart" placement="right" arrow color="red">
            <div className={styles.product__removeItem}>
              <RemoveShoppingCart color="inherit" />
            </div>
          </Tooltip>
        </div>
      </div>
    </motion.article>
  );
}
