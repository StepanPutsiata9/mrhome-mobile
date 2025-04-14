import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MoveOff = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    viewBox="0 0 56 52"
    {...props}
  >
    <Path
      fill={color}
      d="m7.158 10.126 9.94 9.942c.108-.006.217-.012.326-.02a17.06 17.06 0 0 0 8.485-2.993l3.262 3.262c1.441 1.45 6.567 4.95 12.036 8.134a16.907 16.907 0 0 1-7.168-11.836 7.787 7.787 0 0 1-.625-.54l-5.196-5.196a3 3 0 0 0-4.242 0c-.322.32-.661.62-1.016.895l1.236 1.235a3.005 3.005 0 0 1-4.25 4.25l-3.178-3.178a11.013 11.013 0 0 1-8.349-3.202 3 3 0 0 0-1.26-.753Z"
    />
    <Path
      fill={color}
      d="M19.946 17.259a3.005 3.005 0 1 0 4.25-4.25l-1.236-1.235a11.013 11.013 0 0 1-6.192 2.307l3.178 3.178Z"
    />
    <Path
      fill={color}
      d="M31.926 42.136h18.985a5 5 0 0 0 5-5v-4.765a4.97 4.97 0 0 0-2.765-4.47c-7.012-2.962-16.36-9.093-19.107-11.286a16.906 16.906 0 0 0 7.168 11.836c2.98 1.735 6.062 3.376 8.704 4.54v3.145h-16.75l-8.46.019-18.557-.003.548-3.998H21.258a3.005 3.005 0 0 0 0-6.01l-6.56.004-7.18.004.868-6.318.21-1.527a17.06 17.06 0 0 0 8.501 1.761l-9.939-9.942a3 3 0 0 0-3.832 2.465l-.263 1.918L.04 36.529l-.012.094A5 5 0 0 0 5 42.147l26.924-.01h.002Z"
    />
  </Svg>
)
export default MoveOff
