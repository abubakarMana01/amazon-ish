import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Logo from "assets/amazon-logo.svg";
import { Dropdown } from "components";

export default function Footer() {
  return (
    <footer className={styles.footer__container}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__content}>
          <ul className={styles.footer__contentLinks}>
            <li>Get to Know Us</li>
            <li>
              <a href="#">About Amazon</a>
            </li>
            <li>
              <a href="#">Connect with Us</a>
            </li>
            <li>
              <a href="#">Amazon Cares</a>
            </li>
            <li>
              <a href="#">Gift a Smile</a>
            </li>
          </ul>
          <ul className={styles.footer__contentLinks}>
            <li>Make Money with Us</li>
            <li>
              <a href="#">Sell products on Amazon</a>
            </li>
            <li>
              <a href="#">Sell apps on Amazon</a>
            </li>
            <li>
              <a href="#">Advertise Your Products</a>
            </li>
            <li>
              <a href="#">Self-Publish with Us</a>
            </li>
            <li>
              <a href="#">Host an Amazon Hub</a>
            </li>
            <li>
              <a href="#">› See More</a>
            </li>
          </ul>
          <ul className={styles.footer__contentLinks}>
            <li>Amazon Payment</li>
            <li>
              <a href="#">Amazon Business Card</a>
            </li>
            <li>
              <a href="#">Shop with Points</a>
            </li>
            <li>
              <a href="#">Reload Your Balance</a>
            </li>
            <li>
              <a href="#">Amazon Currency Converter</a>
            </li>
          </ul>
          <ul className={styles.footer__contentLinks}>
            <li>Let Us Help You</li>
            <li>
              <a href="#">Amazon and COVID-19</a>
            </li>
            <li>
              <a href="#">Shipping Rates & Policies</a>
            </li>
            <li>
              <a href="#">Returns & Replacements</a>
            </li>
            <li>
              <a href="#">Manage Your Devices</a>
            </li>
            <li>
              <a href="#">Amazon Assistant</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__logoContainer}>
            <Image src={Logo} layout="fill" alt="logo" />
          </div>

          <p className={styles.footer__copyright}>
            &copy; 2022 | Developed by{" "}
            <a href="https://github.com/abubakarMana01">Abubakar Mana</a>
          </p>

          <div className={styles.footer__dropdownContainer}>
            <Dropdown options={["English", "French", "German", "Italian"]} />
            <Dropdown
              options={["$ - USD", "₹ - INR", "£ - GBP", "€ - EUR", "¥ - JPY"]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
