/** @format */

export interface IColorItem {
  code: string;
  disabled?: boolean;
  label?: string;
}

export interface ColorPaletteProps {
  colors: IColorItem[];
  onColorClick?: (colorCode: string) => void;
  // Если нужно что-то делать при клике
  selectedColor?: string;
  // Если нужно отмечать, какой цвет выбран
}
