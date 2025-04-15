/** @format */

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCartItems,
  removeFromCart,
} from "@/entities/cart/api/cartApi";
import { useRouter } from "next/navigation";
import { createOrder } from "@/entities/order/api/orderApi";
import styles from "./CartButton.module.css";
import cart from "../assets/Cart.png";
import { useState } from "react";

export const CartButton = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const items = data?.items ?? [];

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(
    "г. Алматы, ул. Абая 15",
  );
  const [amountTon, setAmountTon] = useState(0.5); // 🔁 Можно динамически

  const removeMutation = useMutation({
    mutationFn: (id: string) => removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert("✅ Заказ успешно создан!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/orders"); // ✅ Перенаправление на страницу заказов
    },
  });

  const handleBuy = () => {
    createMutation.mutate({
      shippingAddress: address,
      amountTon: amountTon,
    });
  };

  return (
    <>
      <div
        className={styles.cartIcon}
        onClick={() => setOpen(!open)}
      >
        <img src={cart.src} alt='Cart Icon' />
        {items.length > 0 && (
          <span className={styles.count}>
            {items.length}
          </span>
        )}
      </div>

      {open && (
        <div className={styles.modal}>
          <h3>Корзина</h3>

          {items.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <>
              {items.map((item: any) => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.product?.images?.[0]}
                    alt={
                      item.product?.translations?.[0]?.title
                    }
                    className={styles.image}
                  />
                  <div className={styles.info}>
                    <p className={styles.title}>
                      {
                        item.product?.translations?.[0]
                          ?.title
                      }
                    </p>
                    <p className={styles.price}>
                      {item.quantity} x{" "}
                      {item.product?.priceTenge} ₸
                    </p>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() =>
                      removeMutation.mutate(item.id)
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}

              <input
                type='text'
                placeholder='Адрес доставки'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.addressInput}
              />

              <button
                className={styles.buyButton}
                onClick={handleBuy}
              >
                Купить
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
