import { View, Text } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";

export default function Configuracion() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Text>Hello World!</Text>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        useNativeAndroidPickerStyle={false}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
    </View>
  );
}
