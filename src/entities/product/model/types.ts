/** @format */

export type Product = {
  priceTon: any;
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
    translations: any;
    value: string;
    key: string;
    id: string;
  }[];
};
