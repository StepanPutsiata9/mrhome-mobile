import * as React from "react"
import Svg, {Path, Circle } from "react-native-svg"
const SvgComponentLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={69}
    fill="none"
    {...props}
  >
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={4.5}
      d="m2.42 35.167 7.519-7.192m57.642 7.192-7.519-7.192m0 0L35 4 9.94 27.975m50.123 0V57M9.94 65.088V27.975M10.565 36.58H35M10.565 50.155h33.938M59.436 43.368H25.498M60 57H25"
    />
    <Path
      fill="#4C82FF"
      fillRule="evenodd"
      d="M44.45 22.932a13.363 13.363 0 0 0-18.897 0 1.145 1.145 0 0 1-1.62-1.62c6.113-6.114 16.025-6.114 22.138 0a1.146 1.146 0 1 1-1.62 1.62Zm-3.239 3.239a8.78 8.78 0 0 0-12.419 0 1.145 1.145 0 0 1-1.619-1.619 11.072 11.072 0 0 1 15.657 0 1.145 1.145 0 0 1-1.618 1.619Zm-3.24 3.24a4.2 4.2 0 0 0-5.94 0 1.144 1.144 0 1 1-1.618-1.62 6.49 6.49 0 0 1 9.178 0 1.145 1.145 0 0 1-1.619 1.62m-4.319 1.618a1.908 1.908 0 0 1 2.7 0 1.145 1.145 0 0 1 0 1.619l-.542.542a1.145 1.145 0 0 1-1.618 0l-.541-.54a1.145 1.145 0 0 1 0-1.62"
      clipRule="evenodd"
    />
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={4.5}
      d="M35 31.829v4.751"
    />
    <Circle
      cx={24.31}
      cy={43.198}
      r={2.813}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={1.5}
    />
    <Circle
      cx={24.31}
      cy={57.106}
      r={2.813}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={1.5}
    />
    <Circle
      cx={45.691}
      cy={50.325}
      r={2.813}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={1.5}
    />
    <Path
      stroke="#4C82FF"
      strokeLinecap="round"
      strokeWidth={4.5}
      d="M10.565 65.088h33.938"
    />
    <Circle
      cx={45.691}
      cy={65.19}
      r={2.813}
      fill="#fff"
      stroke="#4C82FF"
      strokeWidth={1.5}
    />
  </Svg>
)
export default SvgComponentLogo;