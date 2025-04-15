/** @format */

import React from "react";
import styles from "./Profile.module.scss";
import avatar from "../assets/avatar.png";

export const Profile = () => {
  return (
    <div>
      <img className={styles.avatar} src={avatar.src} alt='avatar' />
    </div>
  );
};
