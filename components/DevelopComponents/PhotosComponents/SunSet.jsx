import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SunSet = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      fill="#4C82FF"
      d="M15.293 7.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L17 4.586V1a1 1 0 1 0-2 0v3.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3ZM4.686 6.687a1 1 0 0 1 1.415 0l2.828 2.828a1 1 0 1 1-1.414 1.414L4.686 8.1a1 1 0 0 1 0-1.415Zm22.628 0a1 1 0 0 1 0 1.413l-2.829 2.829a1 1 0 1 1-1.414-1.414L25.9 6.686a1 1 0 0 1 1.415 0ZM16 12a6 6 0 0 1 5.198 9H10.802A6 6 0 0 1 16 12Zm7.418 9a8 8 0 1 0-14.836 0H1a1 1 0 1 0 0 2h30a1 1 0 1 0 0-2h-7.582ZM0 18a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm26 0a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
    />
  </Svg>
)
export default SunSet
