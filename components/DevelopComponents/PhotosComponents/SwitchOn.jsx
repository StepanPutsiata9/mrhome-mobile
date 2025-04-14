import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SwitchOn = ({props,color}) => (
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
      d="M14 11.5h20v25H14v-25Zm16 4H18v17h12v-17Z"
      clipRule="evenodd"
    />
    <Path fill={color} d="M21.5 19h5v4.5h-5V19Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M0 5c0-3 2-5 5-5h38c3 0 5 2 5 5v38c0 3-2 5-5 5H5c-3 0-5-2-5-5V5Zm44-1H4v40h40V4Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SwitchOn;
