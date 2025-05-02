import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CPU = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#4C82FF"
      d="M10 0a1 1 0 0 1 1 1v3h2V1a1 1 0 1 1 2 0v3h2V1a1 1 0 1 1 2 0v3h2V1a1 1 0 1 1 2 0v3a5 5 0 0 1 5 5h3a1 1 0 1 1 0 2h-3v2h3a1 1 0 1 1 0 2h-3v2h3a1 1 0 1 1 0 2h-3v2h3a1 1 0 1 1 0 2h-3a5 5 0 0 1-5 5v3a1 1 0 1 1-2 0v-3h-2v3a1 1 0 1 1-2 0v-3h-2v3a1 1 0 1 1-2 0v-3h-2v3a1 1 0 1 1-2 0v-3a5 5 0 0 1-5-5H1a1 1 0 1 1 0-2h3v-2H1a1 1 0 1 1 0-2h3v-2H1a1 1 0 1 1 0-2h3v-2H1a1 1 0 1 1 0-2h3a5 5 0 0 1 5-5V1a1 1 0 0 1 1-1ZM9 6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H9Zm1 7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-6Zm3-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6Z"
    />
  </Svg>
)
export default CPU;
