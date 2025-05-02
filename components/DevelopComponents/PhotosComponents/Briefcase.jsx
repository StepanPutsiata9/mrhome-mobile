import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Briefcase = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#4C82FF"
      d="M13 0a3 3 0 0 0-3 3v1H3a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-7V3a3 3 0 0 0-3-3h-6Zm0 2h6c.553 0 1 .45 1 1.001V4h-8V3a1 1 0 0 1 1-1Zm3.773 13.829L30 12.302V23a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V12.302l13.227 3.527a3 3 0 0 0 1.546 0ZM3 6h26a1 1 0 0 1 1 1v3.232l-13.742 3.664a.999.999 0 0 1-.516 0L2 10.232V7a1 1 0 0 1 1-1Z"
    />
  </Svg>
)
export default Briefcase
