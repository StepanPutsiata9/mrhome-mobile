import * as React from "react"
import Svg, {  G, Path, Defs, ClipPath } from "react-native-svg"
const TrashBin = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <G fill="#E60000" clipPath="url(#a)">
      <Path d="M56 10.667h-8.267A13.358 13.358 0 0 0 34.667 0h-5.334a13.357 13.357 0 0 0-13.066 10.667H8A2.667 2.667 0 1 0 8 16h2.666v34.667A13.35 13.35 0 0 0 24 64h16a13.35 13.35 0 0 0 13.333-13.333V16H56a2.667 2.667 0 0 0 0-5.333ZM29.333 5.333h5.334a8.016 8.016 0 0 1 7.544 5.334H21.789a8.016 8.016 0 0 1 7.544-5.334ZM48 50.667a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8V16h32v34.667Z" />
      <Path d="M26.667 47.998a2.667 2.667 0 0 0 2.666-2.666v-16a2.667 2.667 0 1 0-5.333 0v16a2.667 2.667 0 0 0 2.667 2.666ZM37.333 47.998A2.667 2.667 0 0 0 40 45.332v-16a2.667 2.667 0 1 0-5.334 0v16a2.667 2.667 0 0 0 2.667 2.666Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h64v64H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TrashBin
