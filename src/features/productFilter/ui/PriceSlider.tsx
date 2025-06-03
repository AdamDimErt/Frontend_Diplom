/** @format */

"use client";

import { Range, getTrackBackground } from "react-range";

interface Props {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceSlider({
  min,
  max,
  step = 1000,
  value,
  onChange,
}: Props) {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={value}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            height: "4px",
            width: "100%",
            background: getTrackBackground({
              values: value,
              colors: ["#ddd", "#0d6efd", "#ddd"],
              min,
              max,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            backgroundColor: "#0d6efd",
          }}
        />
      )}
    />
  );
}
