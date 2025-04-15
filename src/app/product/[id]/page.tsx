/** @format */
import { getProductById } from "@/entities/product/api/productApi";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./ProductDetails.module.scss";
import { ProductActions } from "@/features/productActions/ui/ProductActions";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id).catch(
    () => null,
  );

  if (!product) return notFound();

  const translation = product.translations?.find(
    (t) => t.language === "RU",
  );

  const mainImage =
    product.images?.[0] &&
    (product.images[0].startsWith("http") ||
      product.images[0].startsWith("/"))
      ? product.images[0]
      : "/400x400.png";

  return (
    <div className={styles.container}>
      {/* Левая часть: галерея */}
      <div className={styles.gallery}>
        <Image
          src={mainImage}
          alt={translation?.title || "Product"}
          width={500}
          height={500}
        />
      </div>

      {/* Правая часть: детали товара */}
      <div className={styles.details}>
        <h1>{translation?.title ?? "Товар"}</h1>
        <p className={styles.color}>
          {product.brand?.name ?? "Без бренда"}
        </p>

        {/* Краткие характеристики (заглушки или важные спецификации) */}
        <div className={styles.spec}>
          <p>Specifications:</p>
          <ul>
            {product.specifications?.map((spec) => {
              const ru = spec.translations.find(
                (t: any) => t.language === "RU",
              );
              if (!ru) return null;
              return (
                <li key={spec.id}>
                  {ru.name}: {ru.value || "—"}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Кнопки действий */}
        <ProductActions productId={product.id} />

        {/* Таблица спецификаций */}
        <h3>Технические характеристики</h3>
        <table className={styles.specTable}>
          <tbody>
            {product.specifications?.map((spec) => {
              const ru = spec.translations.find(
                (t: any) => t.language === "RU",
              );
              if (!ru) return null;
              return (
                <tr key={spec.id}>
                  <td>{ru.name}</td>
                  <td>{ru.value || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
