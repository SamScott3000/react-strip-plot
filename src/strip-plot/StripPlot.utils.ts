import { DataPointComponent } from "./StripPlot";

export const getPositionValue = (
  value: number,
  dataPointComponent: DataPointComponent,
  orientation: "horizontal" | "vertical"
) => {
  // Switch statement to determine which property to use
  switch (dataPointComponent) {
    case "circle":
      return orientation === "horizontal"
        ? { cx: `${value}%` }
        : { cy: `${value}%` };
    case "rect":
      return orientation === "horizontal"
        ? { x: `${value}%` }
        : { y: `${value}%` };
    case "line":
      return orientation === "horizontal"
        ? { x1: `${value}%`, x2: `${value}%` }
        : { y1: `${value}%`, y2: `${value}%` };
    default:
      return orientation === "horizontal"
        ? { x: `${value}%` }
        : { y: `${value}%` };
  }
};
