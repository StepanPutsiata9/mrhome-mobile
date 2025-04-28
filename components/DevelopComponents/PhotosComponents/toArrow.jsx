import * as React from "react"
import Svg, {Path } from "react-native-svg"
const ToArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m14.3 13-4.225-4.225a1.027 1.027 0 0 1-.298-.758c0-.307.1-.56.298-.759.199-.198.451-.298.758-.298s.56.1.759.298l4.983 4.984c.217.216.325.47.325.758 0 .289-.108.542-.325.758l-4.983 4.984a1.027 1.027 0 0 1-.759.298c-.307 0-.56-.1-.758-.298a1.027 1.027 0 0 1-.298-.759c0-.307.1-.56.298-.758L14.3 13Z"
    />
  </Svg>
)
export default ToArrow
