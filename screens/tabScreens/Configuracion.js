import { View, Text } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";

export default function Configuracion() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Text>Esto solo va en developer</Text>
    </View>
  );
}
