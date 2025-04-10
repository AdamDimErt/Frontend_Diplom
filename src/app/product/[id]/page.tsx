/** @format */

import { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/Product";

// Моковый товар. Можно заменить на реальный fetch по `params.id`
const mockProduct: Product = {
  id: "1",
  title: "Smart speaker Yandex Station Mini",
  price: 29990,
  currency: "₸",
  description:
    "Компактная умная колонка с Алисой для дома.",
  imageSrc: "/400x400.png",
  specs: {
    connectors: "USB Type C",
    frequencyRange: "50–60 Гц",
    speakerPower: 5,
  },
  colors: ["Белый", "Чёрный", "Фиолетовый", "Зелёный"],
};

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  // Здесь можно выполнить запрос за данными:
  // const productData = await fetchProductById(params.id);

  // Для примера используем mock
  const productData: Product = {
    ...mockProduct,
    id: params.id, // подставим актуальный id из URL
  };

  return (
    <section style={{ padding: "20px" }}>
      <ProductCard product={productData} />
    </section>
  );
}
