import * as StripPlot from "./StripPlot";

export default { title: "Components/StripPlot" };

export const Default = () => (
  <StripPlot.Root range={[0, 100]}>
    <StripPlot.Axis />
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
  </StripPlot.Root>
);

export const Line = () => (
  <StripPlot.Root height="50px" range={[0, 100]}>
    <StripPlot.Axis />
    <StripPlot.Datapoint y1="20" y2="0" value={0} stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={30} stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={20} stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={50} stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={100} stroke="black" />
  </StripPlot.Root>
);
