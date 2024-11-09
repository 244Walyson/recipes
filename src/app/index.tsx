import { Text, View } from "react-native";
import Home from "../pages/home";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Recipe from "../pages/recipe";

export default function Index() {
  return (
    <>
      <Recipe />
    </>
  );
}
