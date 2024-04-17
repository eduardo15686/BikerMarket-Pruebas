import "react-native-gesture-handler";
import Navigation from "./Navigation";
import React from "react";

export default function App() {
  return <Navigation onLayout={onLayoutRootView} />;
}
