import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import firebaseAuth from "../credentials";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_DB } from "../credentials";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";

import AñadirEvento from "../screens/tabScreens/rallyStack/AñadirEvento";
import EventRegister from "../screens/draweGroup/EventRegister";

import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIREBASE_APP } from "../credentials";
export default function funcionalidades(props) {
  const auth = getAuth(firebaseAuth);

  const handleSingIn = () => {
    signInWithEmailAndPassword(auth, props.email, props.password)
      .then(() => {
        Alert.alert("Iniciando Sesion", "Accediendo");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("iniciar sesion");
  };

  async function handleRegister() {
    if (props.email === "" || props.password === "") {
      console.log("usuario y contraseña obligatorios");
      return;
    }
    try {
      if (props.password == props.confirmPassword) {
        await createUserWithEmailAndPassword(
          auth,
          props.email,
          props.password
        ).then((userCredentials) => {
          const user = userCredentials.user;
          setDoc(doc(FIREBASE_DB, "users", `${userCredentials.user.uid}`), {
            nombre: props.infoUser.nombre,
            rol: "usuario",
            foto_url: "",
          });
          console.log(user);
        });
      } else {
        console.log("las contraseñas no coinciden");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <View>
      <LinearGradient
        colors={["#f15a24", "#F07346", "#F28760"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 100,
          width: 170,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 10,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (props.callFunction == "handleSingIn") {
              handleSingIn();
            }
            if (props.callFunction == "handleRegister") {
              handleRegister();
            }
            if (props.callFunction == "handleRegisterEvent") {
              handleRegisterEvent();

            }
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontSize: 19 }}>{props.title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );



  ///Registrar evento  
  async function handleRegisterEvent() {

    const storage = getStorage(FIREBASE_APP);
    if (props.eventName === "" || props.eventDesc === "" || props.validation === "" || props.certification === "") {
      Alert.alert("Error", "Por favor, llene todos los cambios");
      return;
    }
    if (props.validation == "unknown" || props.certification == "unknown") {
      Alert.alert("No olvide seleccionar la certificacion o validacion");
      return;

    }
    try {
      const { uri } = await FileSystem.getInfoAsync(props.eventPhoto);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const filename = props.eventPhoto.substring(props.eventPhoto.lastIndexOf('/') + 1);

      //const ref = FIREBASE_APP.storage().ref().child(filename);

      const storageRef = ref(storage, "foto-evento/" + `${filename}`);
      await uploadBytes(storageRef, blob).then((snapshot) => { });
      const url = await getDownloadURL(storageRef);
      
      const setData = await addDoc(collection(FIREBASE_DB, "events"), {
        eventPhoto: url,
        userID: props.UID,
        eventName: props.eventName,
        eventDesc: props.eventDesc,
        dateInit: props.dateInit,
        dateEnd: props.dateEnd,
        validation: props.validation,
        certification: props.certification
      }
      )
      Alert.alert("¡Evento registrado!")
    } catch (error) {
      console.log(error);
    }
  }


}
