import * as React from "react";

import * as StripPlot from "./StripPlot";

export default { title: "Components/StripPlot" };

export const Styled = () => (
  <StripPlot.Root>
    <StripPlot.Axis />
    <StripPlot.Datapoint as="circle" r="50px" fill="red" />
  </StripPlot.Root>
);
