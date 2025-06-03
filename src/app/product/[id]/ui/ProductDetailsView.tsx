/** @format */

// src/app/product/[id]/ui/ProductDetailsView.tsx

import Image from "next/image";
import styles from "../ProductDetails.module.scss";
import { ProductActions } from "@/features/productActions/ui/ProductActions";
import { getTranslationForLocale } from "@/shared/i18n/getTranslationForLocale";
import type {
  Product,
  ProductTranslation,
  SpecificationTranslation,
} from "@/entities/product/model/types";

interface Props {
  product: Product;
  locale: string;
}

export function ProductDetailsView({
  product,
  locale,
}: Props) {
  const translation =
    getTranslationForLocale<ProductTranslation>(
      product.translations,
      locale,
    );

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

  const image =
    product.images?.[0] &&
    (product.images[0].startsWith("http") ||
      product.images[0].startsWith("/"))
      ? product.images[0]
      : "/400x400.png";

  return (
    <article className={styles.container}>
      <section className={styles.gallery}>
        <Image
          src={image}
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
              {specs.map((s) =>
                s.name ? (
                  <li key={s.id}>
                    {s.name}: {s.value || "—"}
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
                {specs.map((s) =>
                  s.name ? (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.value || "—"}</td>
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
