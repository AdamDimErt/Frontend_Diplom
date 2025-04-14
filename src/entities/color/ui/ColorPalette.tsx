/** @format */
"use client";

import React from "react";
import styles from "./Colors.module.scss";
import { ColorPaletteProps } from "../types/types";

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  onColorClick,
  selectedColor,
}) => {
  const handleClick = (
    colorCode: string,
    disabled?: boolean,
  ) => {
    if (!disabled && onColorClick) {
      onColorClick(colorCode);
    }
  };

  return (
    <div className={styles.colorPalette}>
      <h2>COLOUR</h2>
      <div className={styles.swatches}>
        {colors.map((colorItem) => {
          const isSelected =
            selectedColor === colorItem.code;
          return (
            <div
              key={colorItem.id}
              className={`
              ${styles.swatch}
              ${colorItem.disabled ? styles.disabled : ""}
              ${isSelected ? styles.selected : ""}
            `}
              style={{ backgroundColor: colorItem.code }}
              onClick={() =>
                handleClick(
                  colorItem.code,
                  colorItem.disabled,
                )
              }
              title={colorItem.label || colorItem.code}
            >
              {isSelected && (
                <span className={styles.cross}>x</span>
              )}

              {colorItem.disabled && (
                <span className={styles.disabledIcon}>
                  x
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
