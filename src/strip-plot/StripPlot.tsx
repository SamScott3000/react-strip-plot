import type * as Polymorphic from "@radix-ui/react-polymorphic";
import React, {
  createContext,
  SVGAttributes,
  SVGLineElementAttributes,
  useMemo,
} from "react";

import { getPositionValue } from "./StripPlot.utils";

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
   * @default "100%"
   */
  width?: string | number;

  /**
   * The range of the strip plot.
   * @default [0, 100]
   */
  range?: [number, number];

  /**
   * A scale function that maps a value to a position based on the `range`.
   * @default (value) => value
   */
  scaleFunction?: (value: number) => number;
}

const StripPlotContext = createContext<
  Required<Pick<StripPlotProps, "range" | "orientation" | "scaleFunction">>
>({
  range: [0, 100],
  orientation: "horizontal",
  scaleFunction: (v) => v,
});

const StripPlot = React.forwardRef(
  (props: StripPlotProps, forwardedRef: React.Ref<SVGSVGElement>) => {
    const {
      orientation = "horizontal",
      width = "100%",
      height = "1px",
      range = [0, 100],
      scaleFunction = (v) => v,
      overflow = "visible",
      ...stripPlotProps
    } = props;

    const state = useMemo(
      () => ({ orientation, range, scaleFunction }),
      [orientation, range, scaleFunction]
    );

    return (
      <StripPlotContext.Provider value={state}>
        <svg
          data-orientation={orientation}
          width={width}
          height={height}
          overflow={overflow}
          {...stripPlotProps}
          ref={forwardedRef}
        />
      </StripPlotContext.Provider>
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
 * Datapoint Component
 */

export type DataPointComponent = "circle" | "line" | "rect" | "path";

interface StripPlotDatapointProps {
  as?: DataPointComponent;
  value?: number;
}

type PolymorphicDatapoint = Polymorphic.ForwardRefComponent<
  "circle",
  StripPlotDatapointProps
>;

const StripPlotDatapoint = React.forwardRef((props, forwardedRef) => {
  const {
    as: Component = "circle",
    value = 0,
    children,
    ...stripPlotDatapointProps
  } = props;

  const { range, orientation, scaleFunction } =
    React.useContext(StripPlotContext);

  const [min, max] = useMemo(
    () => range.map((v) => scaleFunction && scaleFunction(v)),
    [range, scaleFunction]
  );

  const scaledValue = useMemo(
    () => ((scaleFunction(value) - min) / (max - min)) * 100,
    [scaleFunction, value, min, max]
  );

  const positionValue = getPositionValue(scaledValue, Component, orientation);

  return (
    <g>
      {children}
      <Component
        {...positionValue}
        data-orientation={orientation}
        {...stripPlotDatapointProps}
        ref={forwardedRef}
      />
    </g>
  );
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
