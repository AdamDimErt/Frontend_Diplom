/** @format */

export interface ProductTranslation
  extends Record<string, unknown> {
  language: string;
  title: string;
  description: string;
}

export interface SpecificationTranslation
  extends Record<string, unknown> {
  language: string;
  name: string;
  value: string;
}

export interface Specification {
  id: string;
  key: string;
  value: string;
  translations: SpecificationTranslation[];
}

export interface Product {
  colors: any;
  category: any;
  quantity: number | undefined;
  availableColors: string[];
  id: string;
  priceTon: number;
  priceTenge: number;
  images: string[];
  brand: {
    id: string;
    name: string;
  };
  translations: ProductTranslation[];
  specifications?: Specification[];
}
