import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LightOn = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M12 36a36 36 0 1 1 61.044 25.86c-1.218 1.176-2.154 2.4-2.718 3.714l-4.572 10.614A3 3 0 0 1 63 78a3 3 0 1 1 0 6 3 3 0 1 1 0 6l-1.344 2.682A6 6 0 0 1 56.292 96H39.708a6 6 0 0 1-5.364-3.318L33 90a3 3 0 0 1 0-6 3 3 0 0 1 0-6 3 3 0 0 1-2.76-1.812l-4.566-10.62a12.002 12.002 0 0 0-2.718-3.708A35.88 35.88 0 0 1 12 36ZM48 6a30 30 0 0 0-20.874 51.552c1.578 1.524 3.084 3.384 4.056 5.646L34.98 72h26.052l3.792-8.802c.972-2.262 2.478-4.122 4.056-5.646A30 30 0 0 0 48 6Z"
    />
  </Svg>
)
export default LightOn
