import * as React from "react";
import "./IndicatorDot.css";

type IndicatorDotColor = "green" | "gray" | "red";

type IndicatorDotProps = {
  color: IndicatorDotColor;
};

const COLOR_MAP = {
  green: "rgb(161, 211, 15)",
  gray: "rgb(190, 190, 190)",
  red: "rgb(255, 2, 0)",
};

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ color }) => {
  return (
    <span
      className="in-class-student-indicator"
      style={{ backgroundColor: COLOR_MAP[color] }}
    />
  );
};
