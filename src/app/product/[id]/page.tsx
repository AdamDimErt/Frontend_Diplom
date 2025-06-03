/** @format */

// src/app/product/[id]/page.tsx

import { getProductById } from "@/entities/product/api/productApi";
import { notFound } from "next/navigation";
import { ProductDetailsView } from "./ui/ProductDetailsView";
import { getDictionary } from "@/shared/i18n/dictionary";
import type { Metadata } from "next";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict.product.title,
    description: dict.product.metaDescription,
  };
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  const product = await getProductById(params.id).catch(
    () => null,
  );
  if (!product) return notFound();

  return (
    <ProductDetailsView
      product={product}
      locale={params.locale}
    />
  );
}
