/** @format */

export interface CartItem {
  id: string;
  quantity: number;
  product: {
    priceTenge: number;
    priceTon: number;
    images: string[];
    translations: {
      language: string;
      title: string;
    }[];
  };
}
