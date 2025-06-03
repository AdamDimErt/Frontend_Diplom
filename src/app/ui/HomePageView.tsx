/** @format */

// 📄 Файл: src/app/ui/HomePageView.tsx

/** @format */

import styles from "../page.module.css";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import ProductFilter from "@/features/productFilter/ui/ProductFilter";
import { MainHero } from "@/features/mainHero/MainHero";
import { Product } from "@/entities/product/model/types";

interface HomePageViewProps {
  products: Product[]; 
  isLoading: boolean;
  setFilters: (filters: Record<string, any>) => void;
}

export const HomePageView = ({
  products,
  isLoading,
  setFilters,
}: HomePageViewProps) => (
  <div className={styles.page}>
    <MainHero />

    <div className={styles.catalogGrid}>
      <ProductFilter onChange={setFilters} />
      <div className={styles.catalogGridProducts}>
        {isLoading && <div>Загрузка...</div>}
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);
