import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function Configuracion() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigate("Añadir Evento")}>
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <FontAwesome
              style={{ marginRight: 1 }}
              name="plus-circle"
              size={24}
              color="#f15a24"
            />
          </View>
        </Pressable>
      ),
      headerSearchBarOptions: {
        placeholder: "buscar",
      },
    });
  }, []);
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Text>Esto solo va en developer</Text>
    </View>
  );
}
