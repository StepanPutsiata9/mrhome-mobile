import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LightOff = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13.38 26.1A36.001 36.001 0 0 0 12 36c0 10.146 4.2 19.32 10.956 25.86 1.218 1.176 2.154 2.4 2.718 3.714l4.572 10.614A3 3 0 0 0 33 78a3 3 0 0 0 0 6 3 3 0 0 0 0 6l1.344 2.682A6 6 0 0 0 39.708 96h16.584a6 6 0 0 0 5.364-3.318L63 90a3 3 0 0 0 0-6 3 3 0 0 0 0-6 3 3 0 0 0 1.728-.546L59.268 72H34.98l-3.792-8.802a18 18 0 0 0-4.056-5.646 29.88 29.88 0 0 1-8.73-26.43L13.38 26.1Zm9.528-15.918 4.248 4.242a30 30 0 0 1 42.42 42.42l4.242 4.242A36 36 0 0 0 48.236.078a36.014 36.014 0 0 0-25.328 10.104ZM9.876 9.876a3 3 0 0 1 4.248 0l72 72a3.004 3.004 0 1 1-4.248 4.248l-72-72a3 3 0 0 1 0-4.248Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default LightOff
