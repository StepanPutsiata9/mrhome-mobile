import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    viewBox="0 0 34 48"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M0 48V0h34v48H0Zm2.5-2.5v-43h29v43h-29Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M4 44V4h26v40H4ZM6 6v36h22V6H6Z"
      clipRule="evenodd"
    />
    <Path
      stroke={color}
      d="M33.5.5v47H.5V.5h33ZM2 46h30V2H2v44ZM29.5 4.5v39h-25v-39h25Zm-2 37h-21v-35h21v35Zm1-36h-23v37h23v-37Z"
    />
  </Svg>
)
export default SvgComponent
