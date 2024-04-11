import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import firebaseAuth from "../credentials";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_DB } from "../credentials";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import * as FileSystem from "expo-file-system";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { FIREBASE_APP } from "../credentials";
export default function funcionalidades(props) {
  const auth = getAuth(firebaseAuth);

  const [hayFoto, setHayFoto] = useState(props.eventPhoto);

  useEffect(() => {
    if (!hayFoto) {
      const newPhoto = "https://wallpaperaccess.com/full/4194340.png";
      setHayFoto(newPhoto);
    } else {
      getUrl();
    }
  }, [setHayFoto]);

  const getUrl = async () => {
    const { uri } = await FileSystem.getInfoAsync(setHayFoto);
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
    const filename = setHayFoto.substring(setHayFoto.lastIndexOf("/") + 1);
    const storageRef = ref(storage, "foto-evento/" + `${filename}`);
    await uploadBytes(storageRef, blob).then((snapshot) => {});
    const url = await getDownloadURL(storageRef);
  };
  
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
            apodo: "",
            celular: "",
            estado: "",
            fecha_nacimiento: "",
            municipio: "",
            seguroMedico: "",
            tipoSangre: "",
            institucionMedica: "",
            poliza: "",
            nombre: props.infoUser.nombre,
            rol: "usuario",
            foto_url: "",
            estatus: "Activo",
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
            if (props.callFunction == "handlerEditEvent") {
              handlerEditEvent();
            }
            if (props.callFunction == "handlerDeleteEvent") {
              handlerDeleteEvent();
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
    if (props.eventName == "" || props.eventDesc == "") {
      Alert.alert("Error", "Por favor, llene todos los cambios");
      console.log(props.eventDesc);
      return;
    }
    if (props.validation === undefined || props.certification === undefined) {
      Alert.alert("No olvide seleccionar la certificacion o validacion");
      return;
    }
    try {
      if (!props.eventPhoto) {
        console.log("no hay foto: ", props.eventDesc);
        await addDoc(collection(FIREBASE_DB, "events"), {
          eventPhoto: hayFoto,
          status: "Activo",
          userID: props.UID,
          eventName: props.eventName,
          eventDesc: props.eventDesc,
          dateInit: props.dateInit,
          dateEnd: props.dateEnd,
          validation: props.validation,
          certification: props.certification,
        });
        Alert.alert("¡Evento registrado!");
      } else {
        const { uri } = await FileSystem.getInfoAsync(props.eventPhoto);
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
        const filename = props.eventPhoto.substring(
          props.eventPhoto.lastIndexOf("/") + 1
        );
        const storageRef = ref(storage, "foto-evento/" + `${filename}`);
        await uploadBytes(storageRef, blob).then((snapshot) => {});
        const url = await getDownloadURL(storageRef);
        await addDoc(collection(FIREBASE_DB, "events"), {
          eventPhoto: url,
          status: "Activo",
          userID: props.UID,
          eventName: props.eventName,
          eventDesc: props.eventDesc,
          dateInit: props.dateInit,
          dateEnd: props.dateEnd,
          validation: props.validation,
          certification: props.certification,
        });
        Alert.alert("¡Evento registrado!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  ///Editar evento
  async function handlerEditEvent() {
    const storage = getStorage(FIREBASE_APP);
    if (props.editName === "" || props.editDesc === "") {
      Alert.alert("Error", "Por favor, llene todos los cambios");
      return;
    }
    try {
      const dataEdit = doc(FIREBASE_DB, "events", props.UID);
      const imagenURL = getDoc(dataEdit);

      const pruebas = (await imagenURL).data().eventPhoto;

      if (pruebas != props.editPhoto) {
        const { uri } = await FileSystem.getInfoAsync(props.editPhoto);
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
        const filename = props.editPhoto.substring(
          props.editPhoto.lastIndexOf("/") + 1
        );
        const storageRef = ref(storage, "foto-evento/" + `${filename}`);
        await uploadBytes(storageRef, blob).then((snapshot) => {});
        const urlEdit = await getDownloadURL(storageRef);
        await updateDoc(dataEdit, {
          eventPhoto: urlEdit,
          eventName: props.editName,
          eventDesc: props.editDesc,
          dateInit: props.editInit,
          dateEnd: props.editEnd,
          validation: props.editVali,
          certification: props.editCerti,
        });
        Alert.alert("Evento editado!");
      } else {
        await updateDoc(dataEdit, {
          eventName: props.editName,
          eventDesc: props.editDesc,
          dateInit: props.editInit,
          dateEnd: props.editEnd,
          validation: props.editVali,
          certification: props.editCerti,
        });
        Alert.alert("¡Evento editado!");
      }
    } catch (error) {
      console.log("Desde editar", error);
    }
  }

  ///Eliminar evento
  async function handlerDeleteEvent() {
    try {
      const editStatus = doc(FIREBASE_DB, "events", props.UID);

      await updateDoc(editStatus, {
        status: "Inactivo",
      });
      Alert.alert("Eliminado con exito");
    } catch (error) {
      console.log(error);
    }
  }
}
