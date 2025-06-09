/** @format */

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./CartButton.module.css";
import { useCartButton } from "../model/useCartButton";
import { CartItemView } from "./CartItemView";
import { useTranslations } from "next-intl";

interface Props {
  onClose: () => void;
}

export const CartModal = ({ onClose }: Props) => {
  const t = useTranslations("cart");
  const router = useRouter();

  // Забираем не только items и removeItem, но и createOrder из хука
  const {
    items,
    removeItem,
    createOrder, // <-- вот этот
    isCreating,
  } = useCartButton();

  const canProceed = items.length > 0;

  const handleProceedToCheckout = async () => {
    if (!canProceed) {
      return alert(t("empty"));
    }

    // 1) Создаём заказ (мутация внутри useCartButton)
    await createOrder();

    // 2) Закрываем модалку
    onClose();

    // 3) После успешного создания хук уже перекидывает на "/orders" в onSuccess
    //    (если вы в useCartButton.onSuccess делаете router.push("/orders"))
  };

  return (
    <div className={styles.modal}>
      <h3>{t("title")}</h3>

      {items.length === 0 ? (
        <p>{t("empty")}</p>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((item) => (
              <li
                key={item.id}
                className={styles.itemWrapper}
              >
                <CartItemView
                  item={item}
                  onRemove={() => removeItem(item.id)}
                />
              </li>
            ))}
          </ul>

          <button
            onClick={handleProceedToCheckout}
            className={styles.buyButton}
            disabled={!canProceed || isCreating}
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
