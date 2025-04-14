import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShtoraClose = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    viewBox="0 0 53 48"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5 5v37.5H2.5A2.5 2.5 0 0 0 0 45v.5A2.5 2.5 0 0 0 2.5 48h48a2.5 2.5 0 0 0 2.5-2.5V45a2.5 2.5 0 0 0-2.5-2.5H48V5a5 5 0 0 0-5-5H10a5 5 0 0 0-5 5Zm38 0v37.5H10V5h33Z"
      clipRule="evenodd"
    />
    <Path fill={color} d="M24 5v37.5h5V5h-5Z" />
  </Svg>
)
export default ShtoraClose;
