import * as StripPlot from "./StripPlot";

export default { title: "Components/StripPlot" };

const Datapoints = () => (
  <>
    <StripPlot.Datapoint value={20} opacity={0.5} r="5px" fill="red">
      <circle r="5" fill="red" />
    </StripPlot.Datapoint>
    <StripPlot.Datapoint value={0} opacity={0.5} r="5px" fill="red">
      <circle r="5" fill="red" />
    </StripPlot.Datapoint>
    <StripPlot.Datapoint value={50} opacity={0.5} r="5px" fill="red">
      <circle r="5" fill="red" />
    </StripPlot.Datapoint>
    <StripPlot.Datapoint value={100} opacity={0.5} r="5px" fill="red">
      <circle r="5" fill="red" />
    </StripPlot.Datapoint>
  </>
);

export const Default = () => (
  <StripPlot.Root range={[0, 100]}>
    <StripPlot.Axis />
    <Datapoints />
  </StripPlot.Root>
);

export const Line = () => (
  <StripPlot.Root range={[0, 100]}>
    <StripPlot.Axis />
    <Datapoints />
  </StripPlot.Root>
);

export const Vertical = () => (
  <StripPlot.Root height="200px" range={[0, 100]} orientation="vertical">
    <StripPlot.Axis />
    <Datapoints />
  </StripPlot.Root>
);
