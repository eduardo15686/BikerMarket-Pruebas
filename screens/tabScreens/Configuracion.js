import { View, Text } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Configuracion() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Text>Esto solo va en developer</Text>
    </View>
  );
}
