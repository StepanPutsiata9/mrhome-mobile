import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SwitchOutline = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.333 7.667h13.334v16.666H9.333V7.667ZM20 10.333h-8v11.334h8V10.333Z"
      clipRule="evenodd"
    />
    <Path fill={color} d="M14.333 12.667h3.334v3h-3.334v-3Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M0 3.333C0 1.333 1.333 0 3.333 0h25.334C30.667 0 32 1.333 32 3.333v25.334c0 2-1.333 3.333-3.333 3.333H3.333C1.333 32 0 30.667 0 28.667V3.333Zm29.333-.666H2.667v26.666h26.666V2.667Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SwitchOutline;
