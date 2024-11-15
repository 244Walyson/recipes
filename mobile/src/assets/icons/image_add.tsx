import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgImageAdd = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 14.5 11zm3.5 3.234-.513-.57a2 2 0 0 0-2.976 0l-.656.731L9 9l-3 3.333V6h7V4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h-2v3.234z" />
  </Svg>
);
export default SvgImageAdd;
