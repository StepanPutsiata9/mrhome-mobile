import * as React from "react"
import Svg, {  Path } from "react-native-svg"
const Back = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#4C82FF"
      d="m14.4 16 5.2 5.2c.244.245.367.556.367.933 0 .378-.122.69-.367.934-.244.244-.556.366-.933.366-.378 0-.69-.122-.934-.366L11.6 16.933a1.279 1.279 0 0 1-.4-.933c0-.355.133-.667.4-.933l6.133-6.134c.245-.244.556-.366.934-.366.377 0 .689.122.933.366.244.245.367.556.367.934 0 .377-.122.689-.367.933L14.4 16Z"
    />
  </Svg>
)
export default Back
