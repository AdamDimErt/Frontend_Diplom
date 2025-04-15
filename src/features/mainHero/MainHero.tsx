/** @format */

// src/features/mainHero/ui/MainHero.tsx
import styles from "./styles/MainHero.module.css";
import handImage from "./assets/hand.png";
import tonImage from "./assets/ton.png";

export const MainHero = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h1>Digital comfort</h1>
            <p>
              Transform your home with smart devices for a
              simpler, smarter life
            </p>
            <button className={styles.cta}>Shop Now</button>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src={handImage.src}
              alt='Robot Hand'
              className={styles.hand}
            />
            <img
              src={tonImage.src}
              alt='TON Coin'
              className={styles.ton}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
