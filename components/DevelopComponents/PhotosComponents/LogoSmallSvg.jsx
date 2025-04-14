import * as React from "react"
import Svg, {Path, Circle } from "react-native-svg"
const LogoSmall = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={2}
      d="m1 15.265 3.23-3.06M29 15.264l-3.23-3.06m0 0L15 2 4.23 12.204m21.54 0V25M4.23 28V12.204M5 16h10M25 19H10"
    />
    <Path
      fill="#4C82FF"
      fillRule="evenodd"
      d="M18.867 9.414a5.469 5.469 0 0 0-7.733 0 .469.469 0 0 1-.663-.662 6.405 6.405 0 0 1 9.06 0 .469.469 0 1 1-.663.662Zm-1.325 1.326a3.594 3.594 0 0 0-5.083 0 .469.469 0 0 1-.662-.662 4.531 4.531 0 0 1 6.407 0 .469.469 0 0 1-.662.662Zm-1.326 1.326a1.719 1.719 0 0 0-2.431 0 .468.468 0 1 1-.662-.663 2.656 2.656 0 0 1 3.756 0 .47.47 0 0 1-.663.663m-1.767.662a.783.783 0 0 1 1.105 0 .469.469 0 0 1 0 .663l-.222.222a.469.469 0 0 1-.663 0l-.22-.222a.468.468 0 0 1 0-.662"
      clipRule="evenodd"
    />
    <Path stroke="#4C82FF" strokeLinecap="round" strokeWidth={2} d="M15 13v3" />
    <Circle
      cx={9.5}
      cy={19}
      r={1.25}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={0.5}
    />
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M25.7 25H10"
    />
    <Circle
      cx={9.5}
      cy={25}
      r={1.25}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={0.5}
    />
    <Path stroke="#4C82FF" strokeLinecap="round" strokeWidth={2} d="M20 22H5" />
    <Circle
      cx={20.5}
      cy={22}
      r={1.25}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={0.5}
    />
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M20 28H4.3"
    />
    <Circle
      cx={20.5}
      cy={28}
      r={1.25}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={0.5}
    />
  </Svg>
)
export default LogoSmall;
