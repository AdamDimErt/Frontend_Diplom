/** @format */

"use client";

import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.links}>
          <div>
            <h4>{t("sections.shop")}</h4>
            <ul>
              <li>{t("items.speakers")}</li>
              <li>{t("items.sensors")}</li>
              <li>{t("items.lamps")}</li>
              <li>{t("items.cameras")}</li>
              <li>{t("items.routers")}</li>
            </ul>
          </div>
          <div>
            <h4>{t("sections.about")}</h4>
            <ul>
              <li>{t("items.story")}</li>
              <li>{t("items.mission")}</li>
              <li>{t("items.team")}</li>
              <li>{t("items.partners")}</li>
            </ul>
          </div>
          <div>
            <h4>{t("sections.contacts")}</h4>
            <ul>
              <li>{t("items.phone1")}</li>
              <li>{t("items.phone2")}</li>
              <li>{t("items.phone3")}</li>
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
          <a href='#'>{t("policy.privacy")}</a>
          <a href='#'>{t("policy.terms")}</a>
          <a href='#'>{t("policy.cookies")}</a>
        </div>
        <p>{t("policy.copyright")}</p>
      </div>
    </footer>
  );
};
