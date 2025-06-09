/** @format */
// src/app/profile/orders/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/entities/order/api/orderApi";
import { useTranslations } from "next-intl";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  const t = useTranslations("profile.orders");
  const { data: orders = [], isLoading } = useQuery<any[]>({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });

  if (isLoading) return <div>{t("loading")}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>

      {orders.length === 0 ? (
        <p className={styles.empty}>{t("none")}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("orderNumber")}</th>
              <th>{t("product")}</th>
              <th>{t("quantity")}</th>
              <th>{t("sum")}</th>
              <th>{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) =>
              order.items.map((item: any) => (
                <tr key={`${order.id}-${item.id}`}>
                  <td>{order.id}</td>
                  <td>
                    {item.product.translations?.[0]
                      ?.title ||
                      item.product.title ||
                      "—"}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.product.priceTenge &&
                    item.quantity
                      ? item.product.priceTenge *
                          item.quantity +
                        " ₸"
                      : "—"}
                  </td>
                  <td>{order.status}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
