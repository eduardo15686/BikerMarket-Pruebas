import { View, Text } from "react-native";
import React from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";

export default function Market() {
  const auth = getAuth(firebaseAuth);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("cerrando sesion");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text onPress={handleLogOut}>Cerrar Sesion</Text>
    </View>
  );
}
