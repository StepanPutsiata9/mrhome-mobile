import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SwitchOff = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M34 36.5H14v-25h20v25Zm-16-4h12v-17H18v17Z"
      clipRule="evenodd"
    />
    <Path fill={color} d="M26.5 29h-5v-4.5h5V29Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M48 43c0 3-2 5-5 5H5c-3 0-5-2-5-5V5c0-3 2-5 5-5h38c3 0 5 2 5 5v38ZM4 44h40V4H4v40Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SwitchOff
