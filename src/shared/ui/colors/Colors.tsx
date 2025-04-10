/** @format */

"use client";

import React from "react";
import styles from "./Colors.module.scss";
import { ColorPaletteProps } from "./types/types";


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
      {colors.map((colorItem) => (
        <div
          key={colorItem.code}
          className={`
            ${styles.swatch}
            ${colorItem.disabled ? styles.disabled : ""}
            ${
              selectedColor === colorItem.code
                ? styles.selected
                : ""
            }
          `}
          style={{ backgroundColor: colorItem.code }}
          onClick={() =>
            handleClick(colorItem.code, colorItem.disabled)
          }
          title={colorItem.label || colorItem.code}
        >
          {colorItem.disabled && (
            <span className={styles.disabledIcon}>x</span>
          )}
        </div>
      ))}
    </div>
  );
};
