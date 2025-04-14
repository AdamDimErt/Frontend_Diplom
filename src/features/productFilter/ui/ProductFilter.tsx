/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getColors } from "@/entities/color/api/colorApi";
import { getBrands } from "@/entities/brand/api/brandApi";

import { BrandFilter } from "@/entities/brand/ui/BrandFilter";

import { useState, useEffect, SetStateAction } from "react";
import { ColorPalette } from "@/entities/color/ui/ColorPalette";
import { PriceSlider } from "@/entities/price/PriceSlider";

type Props = {
  onChange: (filters: {
    brandId?: string;
    colorIds?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) => void;
};

const ProductFilter = ({ onChange }: Props) => {
  const { data: colors = [] } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const [selectedColor, setSelectedColor] =
    useState<string>();
  const [selectedBrand, setSelectedBrand] =
    useState<string>();
  const [priceRange, setPriceRange] = useState<
    [number, number]
  >([1000, 100000]);

  // Обновляем фильтры
  // useEffect(() => {
  //   onChange({
  //     colorIds: selectedColor ? [selectedColor] : undefined,
  //     brandId: selectedBrand,
  //     minPrice: priceRange[0],
  //     maxPrice: priceRange[1],
  //   });
  // }, [selectedColor, selectedBrand, priceRange]);

  return (
    <div>
      <h2>Фильтры</h2>
      <PriceSlider
        min={0}
        max={500000}
        value={priceRange}
        onChange={(range) => {
          console.log("Текущий диапазон цен:", range);
          setPriceRange(range);
        }}
      />

      <BrandFilter
        selectedBrand={selectedBrand}
        onChange={setSelectedBrand}
      />
      <ColorPalette
        colors={colors}
        selectedColor={selectedColor}
        onColorClick={(
          color: SetStateAction<string | undefined>,
        ) =>
          setSelectedColor(
            color === selectedColor ? undefined : color,
          )
        }
      />
    </div>
  );
};

export default ProductFilter;
