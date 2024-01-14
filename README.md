# React Strip Plot

A react strip plot implementation in the style of [Radix Primitives](https://github.com/radix-ui/primitives)

## Installation

```shell
yarn add @radix-ui/react-accordion

# or

npm install @radix-ui/react-accordion
```

## Usage

```tsx
import * as StripPlot from "@datum-ui/react-strip-plot";

export default () => (
  <StripPlot.Root>
    <StripPlot.Axis />
    <StripPlot.Datapoint />
  </StripPlot.Root>
);
```

## API Reference

### Root

This extends a `<svg />` element and accepts all props that a `<svg />` element accepts.

| Prop            | Description                                                            | Type                           | Default            |
| --------------- | ---------------------------------------------------------------------- | ------------------------------ | ------------------ |
| `orientation`   | The orientation of the strip plot                                      | `"horizontal"` \| `"vertical"` | `horizontal`       |
| `range`         | The range of strip plot values                                         | `[number, number]`             | `[0, 100]`         |
| `scaleFunction` | A scale function that maps a value to a position based on the `range`. | `(value: number) => number`    | `(value) => value` |

### Axis

This extends a `<line />` element and accepts all props that a `<line />` element accepts.

| Prop    | Description                                             | Type                 | Default |
| ------- | ------------------------------------------------------- | -------------------- | ------- |
| `start` | Set's either x1 or y1 depending on `Root`'s orientation | `number` \| `string` | `0%`    |
| `end`   | Set's either x2 or y2 depending on `Root`'s orientation | `number` \| `string` | `100%`  |

### Datapoint

This extends a `<g />` element and accepts all props that a `<g />` element accepts.

| Prop    | Description                | Type     | Default |
| ------- | -------------------------- | -------- | ------- |
| `value` | The value of the datapoint | `number` | `0`     |
