import * as React from "react"
import Svg, {  Path } from "react-native-svg"
const Shtora = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.302 3.333v25H1.65c-.912 0-1.651.74-1.651 1.651v.365C0 31.261.74 32 1.65 32h31.7c.91 0 1.65-.74 1.65-1.65v-.366c0-.912-.74-1.65-1.65-1.65h-1.652v-25C31.698 1.51 30.22 0 28.396 0H6.604C4.78 0 3.302 1.51 3.302 3.333Zm25.094 0v25H6.604v-25H28.396Z"
      clipRule="evenodd"
    />
    <Path  fill={color} d="M15.85 3.333v25h3.3v-25h-3.3Z" />
  </Svg>
)
export default Shtora
