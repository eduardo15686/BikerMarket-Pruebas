import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";
import { FIREBASE_DB } from "../../credentials";
import FIREBASE_APP from "../../credentials";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const auth = getAuth();
const storage = getStorage(FIREBASE_APP);

export default function EventRegister({ route }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);

  // Listen to onAuthStateChanged
  const usuario = route.params.user;
  useEffect(() => {
    const getDocument = async () => {
      setLoading(true);
      try {
        const docRef = doc(FIREBASE_DB, "users", `${usuario}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
          console.log("No document!");
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getDocument();
  }, []);

  const uploadImage = async () => {
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const storageRef = ref(storage, "foto-perfil/" + `${filename}`);
      await uploadBytes(storageRef, blob).then((snapshot) => {});
      const url = await getDownloadURL(storageRef);
      updateDoc(doc(FIREBASE_DB, "users", `${usuario}`), {
        foto_url: url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (userData === null) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#f15a24" />
      </View>
    );
  } else {
    return (
      <View>
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={{
            uri: userData.foto_url,
          }}
        />
        <Text>hello {userData.nombre}</Text>
      </View>
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   {/* <Text>Bienvenido {userData.nombre}</Text> */}
      //   {image && (
      //     <Image
      //       source={{ uri: image }}
      //       style={{ width: 200, height: 200, borderRadius: 100 }}
      //     />
      //   )}
      //   <Button title="Foto de Perfil" onPress={pickImage} />
      //   <Button title="Subir Imagen" onPress={uploadImage} />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
