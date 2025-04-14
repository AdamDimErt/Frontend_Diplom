/** @format */

// ❗ Убедись: БЕЗ 'use client' в этом файле

import { getProductById } from "@/entities/product/api/productApi";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({
  params,
}: Props) {
  const product = await getProductById(params.id).catch(
    () => null,
  );

  if (!product) return notFound();

  const translation = product.translations?.find(
    (t) => t.language === "RU",
  );
  console.log(product); 

  return (
    <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div>
        <Image
          src={
            product.images?.[0]?.startsWith("http") ||
            product.images?.[0]?.startsWith("/")
              ? product.images[0]
              : "/400x400.png"
          }
          alt={translation?.title || "Product"}
          width={500}
          height={500}
          className='rounded-lg'
        />
        <div className='flex gap-2 mt-2'>
          {/* {product.images?.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`thumb-${idx}`}
              width={80}
              height={80}
              className='rounded border'
            />
          ))} */}
        </div>
      </div>

      <div>
        <h1 className='text-3xl font-bold mb-2'>
          {translation?.title}
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

        <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4'>
          Добавить в корзину
        </button>
        <button className='px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100'>
          Купить сейчас
        </button>
      </div>
    </div>
  );
}
