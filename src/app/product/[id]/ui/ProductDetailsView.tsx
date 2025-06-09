/** @format */
// src/app/product/[id]/ui/ProductDetailsView.tsx

"use client";

import React from "react";
import styles from "../ProductDetails.module.scss";
import { ProductActions } from "@/features/productActions/ui/ProductActions";
import { getTranslationForLocale } from "@/shared/i18n/getTranslationForLocale";
import type {
  Product,
  ProductTranslation,
  SpecificationTranslation,
} from "@/entities/product/model/types";

export function ProductDetailsView({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  // 1) Перевод названия
  const translation =
    getTranslationForLocale<ProductTranslation>(
      product.translations,
      locale,
    );

  // 2) Спецификации в нужной локали
  const specs = product.specifications?.map((spec) => {
    const t =
      getTranslationForLocale<SpecificationTranslation>(
        spec.translations,
        locale,
      );
    return {
      id: spec.id,
      name: t?.name,
      value: t?.value,
    };
  });

  // 3) Гарантируем хотя бы одну картинку
  const images =
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images
      : ["/400x400.png"];

  return (
    <article className={styles.container}>
      <section className={styles.gallery}>
        {/* здесь у вас уже был <Image />, 
            теперь при желании можно поставить ProductCarousel */}
        <img
          src={images[0]}
          alt={translation?.title ?? "Product"}
          width={500}
          height={500}
        />
      </section>

      <section className={styles.details}>
        <h1>{translation?.title ?? "Product"}</h1>
        <p className={styles.color}>
          {product.brand?.name ?? "No brand"}
        </p>

        {specs?.length ? (
          <section className={styles.spec}>
            <h2>Specifications</h2>
            <ul>
              {specs.map((s:any) =>
                s.name ? (
                  <li key={s.id}>
                    {s.name}: {s.value ?? "—"}
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        <ProductActions productId={product.id} />

        {specs?.length ? (
          <section className={styles.specTableWrapper}>
            <h3>Technical details</h3>
            <table className={styles.specTable}>
              <tbody>
                {specs.map((s:any) =>
                  s.name ? (
                    <tr key={s.id}>
                      <td>{s.name}</td> 
                      <td>{s.value ?? "—"}</td>
                    </tr>
                  ) : null,
                )}
              </tbody>
            </table>
          </section>
        ) : null}
      </section>
    </article>
  );
}
