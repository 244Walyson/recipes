import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgBottomWaves = (props: SvgProps) => (
  <Svg width={411} height={230} fill="none" {...props}>
    <Path
      fill="#F6B100"
      d="M458.047 412.5a7 7 0 0 1-7.485 6.479l-547.58-39.459a7 7 0 0 1-6.479-7.485L-81.93 72.743c.282-3.911 5.839-4.38 6.773-.572 22.7 92.523 129.817 135.097 209.837 83.4l85.086-54.97c77.456-44.245 171.328-49.05 252.897-12.948l8.025 3.552a.77.77 0 0 1 .456.76L458.047 412.5Z"
    />
  </Svg>
);
export default SvgBottomWaves;
