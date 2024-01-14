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
          height={height}
          width={width}
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
   * The starting coordinate of the axis.
   * @default "0%"
   */
  start?: string | number;

  /**
   * The ending coordinate of the axis.
   * @default "100%"
   */
  end?: string | number;
}

const StripPlotAxis = React.forwardRef(
  (props: StripPlotAxisProps, forwardedRef: React.Ref<SVGLineElement>) => {
    const { start = "0%", end = "100%", ...stripPlotAxisProps } = props;

    const { orientation } = React.useContext(StripPlotContext);

    const coordinates =
      orientation === "horizontal"
        ? { x1: start, x2: end }
        : { y1: start, y2: end };

    return <line {...coordinates} {...stripPlotAxisProps} ref={forwardedRef} />;
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

export type { StripPlotProps, StripPlotAxisProps, StripPlotDatapointProps };
