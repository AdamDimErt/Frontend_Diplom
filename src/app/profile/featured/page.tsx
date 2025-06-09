/** @format */
// src/app/profile/featured/page.tsx
"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getFavorites,
  removeFromFavorites,
  FavoriteItem,
} from "@/entities/favorite/api/favoriteApi";
import { useTranslations } from "next-intl";
import styles from "./FeaturedPage.module.css";

export default function FeaturedPage() {
  const t = useTranslations("profile.featured");
  const qc = useQueryClient();

  // 1) Получаем избранные товары
  const { data: favs = [], isLoading } = useQuery<
    FavoriteItem[]
  >({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // 2) Мутация удаления из избранного
  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      removeFromFavorites(productId),
    onSuccess: () => {
      // после удачного удаления перезапросим список
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  if (isLoading) {
    return (
      <div className={styles.loader}>{t("loading")}</div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>

      {favs.length === 0 ? (
        <p className={styles.empty}>{t("none")}</p>
      ) : (
        <ul className={styles.list}>
          {favs.map((f) => {
            const imgSrc =
              f.product.images?.[0] ?? "/400x400.png";
            const translation =
              f.product.translations?.[0]?.title ??
              t("noTitle");

            return (
              <li key={f.id} className={styles.item}>
                <img
                  src={imgSrc}
                  alt={translation}
                  className={styles.image}
                />
                <div className={styles.productTitle}>
                  {translation}
                </div>
                <div className={styles.price}>
                  {f.product.priceTenge.toLocaleString()} ₸
                </div>

                {/* 3) Кнопка удаления */}
                <button
                  className={styles.removeButton}
                  onClick={() =>
                    removeMutation.mutate(f.product.id)
                  }
                  disabled={removeMutation.isPending}
                >
                  {removeMutation.isPending
                    ? t("removing")
                    : t("remove")}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
