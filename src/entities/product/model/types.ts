/** @format */

export type Product = {
  id: string;
  images: string[];
  priceTenge: number;
  brand: { name: string };
  translations: {
    language: string;
    title: string;
    description: string;
  }[];
  specifications?: {
    id: string;
  }[];
};
