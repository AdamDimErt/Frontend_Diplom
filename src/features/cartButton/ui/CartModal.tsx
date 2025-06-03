/** @format */

import styles from "./CartButton.module.css";
import { useCartButton } from "../model/useCartButton";
import { CartItemView } from "./CartItemView";
import { useTranslations } from "next-intl";

interface Props {
  onClose: () => void;
}

export const CartModal = ({ onClose }: Props) => {
  const t = useTranslations("cart");
  const {
    items,
    address,
    setAddress,
    handleBuy,
    isCreating,
  } = useCartButton();

  return (
    <div className={styles.modal}>
      <h3>{t("title")}</h3>

      {items.length === 0 ? (
        <p>{t("empty")}</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItemView key={item.id} item={item} />
          ))}

          <input
            type='text'
            placeholder={t("address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.addressInput}
          />

          <button
            onClick={handleBuy}
            className={styles.buyButton}
            disabled={isCreating}
          >
            {isCreating ? t("loading") : t("buy")}
          </button>
        </>
      )}

      <button onClick={onClose} className={styles.close}>
        ✕
      </button>
    </div>
  );
};
