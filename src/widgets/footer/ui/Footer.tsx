/** @format */

import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.links}>
          <div>
            <h4>Shop</h4>
            <ul>
              <li>Speakers</li>
              <li>Sensors</li>
              <li>Lamps</li>
              <li>Cameras</li>
              <li>Routers</li>
            </ul>
          </div>
          <div>
            <h4>About Us</h4>
            <ul>
              <li>Our Story</li>
              <li>Mission & Vision</li>
              <li>Our Team</li>
              <li>Partnerships</li>
            </ul>
          </div>
          <div>
            <h4>Contacts</h4>
            <ul>
              <li>87022385580</li>
              <li>87019999999</li>
              <li>24-58-89</li>
            </ul>
          </div>
        </div>

        <div className={styles.brand}>
          <h2>SmartSphere</h2>
          <div className={styles.social}>
            <FaFacebookF />
            <FaInstagram />
            <FaTelegramPlane />
            <FaWhatsapp />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.policy}>
          <a href='#'>Privacy Policy</a>
          <a href='#'>Terms of Service</a>
          <a href='#'>Cookie Settings</a>
        </div>
        <p>© 2025 Company. All rights reserved.</p>
      </div>
    </footer>
  );
};
