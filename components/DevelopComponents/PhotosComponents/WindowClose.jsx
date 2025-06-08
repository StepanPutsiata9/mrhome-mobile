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
      stroke={color}
      d="M33.5.5v47H.5V.5h33ZM2 46h30V2H2v44ZM29.5 4.5v39h-25v-39h25Zm-24 38h11v-17h-11v17Zm12 0h11v-17h-11v17Zm-12-18h11v-19h-11v19Zm12 0h11v-19h-11v19Z"
    />
  </Svg>
)
export default SvgComponent
