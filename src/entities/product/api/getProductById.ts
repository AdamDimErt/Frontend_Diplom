// src/entities/product/api/getProductById.ts
import { Product } from "../model/types"

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    cache: 'no-store', // 👈 или 'force-cache' / 'revalidate' если надо
    credentials: 'include',
  })

  if (!res.ok) throw new Error("Product not found")

  return res.json()
}
