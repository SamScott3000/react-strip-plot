import React, {
  createContext,
  Ref,
  SVGAttributes,
  SVGLineElementAttributes,
  useMemo,
} from "react";

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
      y1 = "0%",
      y2 = "100%",
      stroke = "black",
      ...stripPlotAxisProps
    } = props;

    const { orientation } = React.useContext(StripPlotContext);

    const coordinates = orientation === "horizontal" ? { x1, x2 } : { y1, y2 };

    return (
      <line
        {...coordinates}
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

interface StripPlotDatapointProps extends SVGAttributes<SVGGElement> {
  /**
   * The value of the datapoint.
   * @default 0
   */
  value?: number;
}

const StripPlotDatapoint = React.forwardRef(
  (props: StripPlotDatapointProps, forwardedRef: Ref<SVGGElement>) => {
    const { value = 0, ...stripPlotDatapointProps } = props;

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

    const transform =
      orientation === "horizontal" ? `${scaledValue}%,0` : `0,${scaledValue}%`;

    return (
      <g
        {...stripPlotDatapointProps}
        style={{ transform: `translate(${transform})` }}
        ref={forwardedRef}
        data-orientation={orientation}
      />
    );
  }
);

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
