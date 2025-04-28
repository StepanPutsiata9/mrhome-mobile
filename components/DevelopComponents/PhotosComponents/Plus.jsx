import * as React from "react"
import Svg, {  Path } from "react-native-svg"
const Plus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M22.577 10.718v2.483H.647v-2.483h21.93ZM12.843.501v23.291h-2.637V.501h2.637Z"
    />
  </Svg>
)
export default Plus
