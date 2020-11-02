import { css } from "styled-components"

const is = (value: any) => typeof value !== "undefined"
const prop = (value: any) => (is(value) ? value : "initial")

export const mixins = (props: any) => css`
  align-content: ${prop(props.alignContent)};
  align-items: ${prop(props.align)};
  flex-basis: ${prop(props.basis)};
  flex-grow: ${prop(props.grow)};
  flex-shrink: ${prop(props.shrink)};
  justify-content: ${prop(props.justify)};
  order: ${prop(props.order)};
  padding: ${prop(props.padding)};
  width: ${prop(props.width)};
`