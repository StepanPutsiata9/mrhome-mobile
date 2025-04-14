import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Light = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M4 12a12 12 0 1 1 20.348 8.62c-.406.392-.718.8-.906 1.238l-1.524 3.538A1 1 0 0 1 21 26a1 1 0 0 1 0 2 1 1 0 0 1 0 2l-.448.894A2 2 0 0 1 18.764 32h-5.528a2 2 0 0 1-1.788-1.106L11 30a1 1 0 0 1 0-2 1 1 0 0 1 0-2 1 1 0 0 1-.92-.604l-1.522-3.54a4.001 4.001 0 0 0-.906-1.236A11.96 11.96 0 0 1 4 12ZM16 2a10 10 0 0 0-6.958 17.184c.526.508 1.028 1.128 1.352 1.882L11.66 24h8.684l1.264-2.934c.324-.754.826-1.374 1.352-1.882A10 10 0 0 0 16 2Z"
    />
  </Svg>
)
export default Light;
