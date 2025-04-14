/** @format */
"use client";

import { useState, ChangeEvent } from "react";
import styles from "./PriceSlider.module.scss";

type Props = {
  min: number; // минимальная цена
  max: number; // максимальная цена
  value: [number, number]; // текущие значения [minValue, maxValue]
  onChange: (range: [number, number]) => void; // колбэк при изменении
};

export const PriceSlider = ({
  min,
  max,
  value,
  onChange,
}: Props) => {
  // Локальное состояние для управления ползунками (и полями ввода)
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  // Рассчитываем позицию бегунков в процентах для подсветки промежутка
  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  /**
   * Обработчик изменения нижнего значения
   */
  const handleMinChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const val = Number(e.target.value);
    // Не даём нижней границе выходить за верхнюю
    if (val <= localMax) {
      setLocalMin(val);
      onChange([val, localMax]);
    }
  };

  /**
   * Обработчик изменения верхнего значения
   */
  const handleMaxChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const val = Number(e.target.value);
    // Не даём верхней границе быть меньше нижней
    if (val >= localMin) {
      setLocalMax(val);
      onChange([localMin, val]);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      {/* Верхняя панель с переключением (как в скриншоте: PRICE (₸) | PRICE (∇)) */}
      <div className={styles.header}>
        <span className={styles.selected}>PRICE (₸)</span>
        <span className={styles.divider}>|</span>
        <span className={styles.alt}>PRICE (∇)</span>
      </div>

      {/* Обёртка для двух range-ползунков и линии */}
      <div className={styles.rangeContainer}>
        {/* Основная серая линия */}
        <div className={styles.sliderTrack} />

        {/* Подсветка от localMin до localMax */}
        <div
          className={styles.sliderHighlight}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Ползунок для нижнего значения */}
        <input
          type='range'
          min={min}
          max={max}
          value={localMin}
          onChange={handleMinChange}
          className={`${styles.range} ${styles.rangeMin}`}
        />

        {/* Ползунок для верхнего значения */}
        <input
          type='range'
          min={min}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          className={`${styles.range} ${styles.rangeMax}`}
        />
      </div>

      {/* Блок с числовыми полями (3000 to 350000 и т.д.) */}
      <div className={styles.inputs}>
        <input
          type='number'
          value={localMin}
          min={min}
          max={localMax}
          onChange={handleMinChange}
          className={styles.numberInput}
        />
        <span className={styles.to}>to</span>
        <input
          type='number'
          value={localMax}
          min={localMin}
          max={max}
          onChange={handleMaxChange}
          className={styles.numberInput}
        />
      </div>
    </div>
  );
};
