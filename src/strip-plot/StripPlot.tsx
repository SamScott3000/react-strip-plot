import type * as Polymorphic from "@radix-ui/react-polymorphic";
import React, { SVGAttributes, SVGLineElementAttributes } from "react";

/**
 * Strip Plot Component
 */
interface StripPlotProps extends SVGAttributes<SVGSVGElement> {
  /**
   * The orientation of the strip plot.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The width of the strip plot.
   * @default "100%"
   */
  width?: string | number;
}

const StripPlot = React.forwardRef(
  (props: StripPlotProps, forwardedRef: React.Ref<SVGSVGElement>) => {
    const {
      orientation = "horizontal",
      width = "100%",
      ...stripPlotProps
    } = props;

    return (
      <svg
        data-orientation={orientation}
        width={width}
        {...stripPlotProps}
        ref={forwardedRef}
      />
    );
  }
);

/**
 * Axis Component
 */

interface StripPlotAxisProps extends SVGLineElementAttributes<SVGLineElement> {
  /**
   * The starting x coordinate of the axis.
   * @default "0%"
   */
  x1?: string | number;

  /**
   * The ending x coordinate of the axis.
   * @default "100%"
   */
  x2?: string | number;

  /**
   * The color of the axis.
   * @default "black"
   */
  stroke?: string;
}

const StripPlotAxis = React.forwardRef(
  (props: StripPlotAxisProps, forwardedRef: React.Ref<SVGLineElement>) => {
    const {
      x1 = "0%",
      x2 = "100%",
      stroke = "black",
      ...stripPlotAxisProps
    } = props;

    return (
      <line
        x1={x1}
        x2={x2}
        stroke={stroke}
        {...stripPlotAxisProps}
        ref={forwardedRef}
      />
    );
  }
);

/**
 * Axis Component
 */

interface StripPlotDatapointProps {
  as?: "circle" | "line" | "rect" | "path";
}

type PolymorphicDatapoint = Polymorphic.ForwardRefComponent<
  "circle",
  StripPlotDatapointProps
>;

const StripPlotDatapoint = React.forwardRef((props, forwardedRef) => {
  const { as: Component = "circle", ...stripPlotDatapointProps } = props;

  return <Component {...stripPlotDatapointProps} ref={forwardedRef} />;
}) as PolymorphicDatapoint;

const Root = StripPlot;
const Axis = StripPlotAxis;
const Datapoint = StripPlotDatapoint;

export {
  Axis,
  Datapoint,
  Root,
  //
  StripPlot,
  StripPlotAxis,
  StripPlotDatapoint,
};

export type { StripPlotAxisProps, StripPlotDatapointProps, StripPlotProps };
