/** @format */

import { getProductById } from "@/entities/product/api/productApi";
import { notFound } from "next/navigation";
import Image from "next/image";

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

  console.log(product);

  const mainImage =
    product.images?.[0] &&
    (product.images[0].startsWith("http") ||
      product.images[0].startsWith("/"))
      ? product.images[0]
      : "/400x400.png";

  return (
    <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/* Левая часть: изображение */}
      <div>
        <Image
          src={mainImage}
          alt={translation?.title || "Product"}
          width={500}
          height={500}
          className='rounded-lg object-contain bg-white'
        />
        <div className='flex gap-2 mt-2'>
          {/* Миниатюры изображений (если нужно) */}
          {/* {product.images?.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`thumb-${idx}`}
              width={80}
              height={80}
              className="rounded border"
            />
          ))} */}
        </div>
      </div>

      {/* Правая часть: описание товара */}
      <div>
        <h1 className='text-3xl font-bold mb-2'>
          {translation?.title ?? "Товар"}
        </h1>
        <p className='text-lg text-gray-500 mb-2'>
          {product.brand?.name ?? "Без бренда"}
        </p>
        <p className='text-blue-600 text-2xl font-semibold mb-4'>
          {product.priceTenge} ₸
        </p>

        <h2 className='text-md font-semibold'>
          Характеристики
        </h2>
        <ul className='list-disc pl-5 text-sm text-gray-600 mb-4'>
          {product.specifications?.map((spec, index) => (
            <li key={index}>ID спецификации: {spec.id}</li>
          ))}
        </ul>

        {/* Действия */}
        <div className='flex flex-wrap gap-4'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Добавить в корзину
          </button>
          <button className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100'>
            Купить сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
