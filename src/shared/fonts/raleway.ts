/** @format */

// src/shared/fonts/raleway.ts
import { Raleway } from "next/font/google";

// Инициализируем шрифт со списком нужных параметров:
export const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-raleway", // CSS-переменная
  display: "swap", // Как шрифт отображается во время загрузки
});
