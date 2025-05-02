import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const Points = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={10}
    fill="none"
    {...props}
  >
    <Circle
      cx={2}
      cy={2}
      r={2}
      fill="#8B8B8B"
      transform="matrix(1 0 0 -1 0 7)"
    />
    <Circle
      cx={2}
      cy={2}
      r={2}
      fill="#8B8B8B"
      transform="matrix(1 0 0 -1 9 7)"
    />
    <Circle
      cx={2}
      cy={2}
      r={2}
      fill="#8B8B8B"
      transform="matrix(1 0 0 -1 18 7)"
    />
  </Svg>
)
export default Points
