import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MoveOn = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <Path
      fill={color}
      d="m58.235 40.765-7.155-3.578a10.944 10.944 0 0 1-6.08-9.84V20a3 3 0 0 0-3-3A11.013 11.013 0 0 1 31 6a3 3 0 0 0-4.813-2.39L6.938 18.212l-.075.058a5 5 0 0 0-.39 7.422l28.42 28.43a2.999 2.999 0 0 0 2.123.878H56a5 5 0 0 0 5-5v-4.765a4.97 4.97 0 0 0-2.765-4.47ZM55 49H38.25L11.52 22.262l3.215-2.44 10.3 10.3a3.005 3.005 0 0 0 4.25-4.25l-9.723-9.71 6.31-4.784A17.06 17.06 0 0 0 39 22.734v4.613a16.905 16.905 0 0 0 9.398 15.205L55 45.855V49Zm-41.127-3H8a3 3 0 1 1 0-6h5.873a3 3 0 0 1 0 6Zm12 6a3 3 0 0 1-3 3H12a3 3 0 1 1 0-6h10.872a3 3 0 0 1 3 3Z"
    />
  </Svg>
)
export default MoveOn
