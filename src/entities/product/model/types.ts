/** @format */

export interface Product {
  id: string | number;
  title: string;
  price: number;
  currency: string; // например, "₸", "₽", "USD" и т.д.
  description: string;
  imageSrc: string; // путь к изображению
  specs: {
    connectors: string;
    frequencyRange: string;
    speakerPower: number;
  };
  colors: string[]; // доступные цвета
}
