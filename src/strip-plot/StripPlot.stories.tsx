import * as React from "react";

import * as StripPlot from "./StripPlot";

export default { title: "Components/StripPlot" };

export const Default = () => (
  <StripPlot.Root range={[0, 100]}>
    <StripPlot.Axis />
    <StripPlot.Datapoint value={0} as="circle" r="5px" fill="red" />
    <StripPlot.Datapoint value={30} as="circle" r="5px" fill="red" />
    <StripPlot.Datapoint value={20} as="circle" r="5px" fill="red" />
    <StripPlot.Datapoint value={50} as="circle" r="5px" fill="red" />
    <StripPlot.Datapoint value={100} as="circle" r="5px" fill="red" />
  </StripPlot.Root>
);

export const Line = () => (
  <StripPlot.Root height="50px" range={[0, 100]}>
    <StripPlot.Axis />
    <StripPlot.Datapoint y1="20" y2="0" value={0} as="line" stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={30} as="line" stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={20} as="line" stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={50} as="line" stroke="black" />
    <StripPlot.Datapoint y1="20" y2="0" value={100} as="line" stroke="black" />
  </StripPlot.Root>
);
