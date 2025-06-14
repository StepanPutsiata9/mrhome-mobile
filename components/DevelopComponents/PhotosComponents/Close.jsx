import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Close = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M17.75 2.013 15.988.25 9 7.237 2.013.25.25 2.013 7.237 9 .25 15.988l1.763 1.762L9 10.762l6.988 6.988 1.762-1.762L10.762 9l6.988-6.987Z"
    />
  </Svg>
)
export default Close
