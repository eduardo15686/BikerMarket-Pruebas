import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { getAuth } from "firebase/auth";
import { FIREBASE_DB } from "../../credentials";
import FIREBASE_APP from "../../credentials";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import RNPickerSelect from "react-native-picker-select";

const auth = getAuth();
const storage = getStorage(FIREBASE_APP);

export default function EventRegister({ route }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRegister, setUserRegister] = useState({
    fecha_nacimiento: Date(),
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.log("A date has been picked: ", date);
    const fecha = Date(date);
    const NewDate = moment(date).format("DD/MM/YYYY");
    setUserRegister({ ...userRegister, fecha_nacimiento: NewDate });
    hideDatePicker();
    console.log(NewDate);
  };

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
      <ScrollView>
        <View>
          <View style={styles.tarjeta}>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 150, height: 150, borderRadius: 100 }}
                source={{
                  uri: userData.foto_url,
                }}
              />
              <Text style={{ fontWeight: "bold", marginTop: 15 }}>Editar</Text>
            </View>
            {/* inputs */}
            <View style={{ marginTop: 15 }}>
              <Text
                style={{ textAlign: "center", color: "#F15A24", fontSize: 20 }}
              >
                INFORMACIÓN PERSONAL
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 25,
                }}
              >
                <Text style={styles.text}>Nombre Completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre Apellido"
                  placeholderTextColor="gray"
                  autoCapitalize={"characters"}
                  value={userData.nombre}
                ></TextInput>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Apodo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Apodo"
                  placeholderTextColor="gray"
                  autoCapitalize={"characters"}
                  value={userData.apodo}
                ></TextInput>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Número de celular</Text>
                <TextInput
                  style={styles.input}
                  maxLength={10}
                  placeholder="Celular"
                  keyboardType="numeric"
                  placeholderTextColor="gray"
                  autoCapitalize={"characters"}
                  value={userData.apodo}
                ></TextInput>
              </View>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Fecha de nacimiento</Text>
                <Text>{userRegister.fecha_nacimiento}</Text>
                <Button title="Selecionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  display="spinner"
                  cancelTextIOS="Cancelar"
                  confirmTextIOS="Confirmar"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  date={new Date()}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Estado</Text>
                <RNPickerSelect
                  style={{ width: 100, flex: 1 }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Baseball", value: "baseball" },
                    { label: "Hockey", value: "hockey" },
                  ]}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Municipio</Text>
                <RNPickerSelect
                  style={{ width: 100, flex: 1 }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Baseball", value: "baseball" },
                    { label: "Hockey", value: "hockey" },
                  ]}
                />
              </View>
            </View>
            {/* datos medicos */}
            <View style={{ marginTop: 15 }}>
              <Text
                style={{ textAlign: "center", color: "#F15A24", fontSize: 20 }}
              >
                DATOS MEDICOS
              </Text>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Tipo de Sangre</Text>
                <RNPickerSelect
                  style={{ width: 100, flex: 1 }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Baseball", value: "baseball" },
                    { label: "Hockey", value: "hockey" },
                  ]}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Seguro Medico</Text>
                <RNPickerSelect
                  style={{ width: 100, flex: 1 }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "Football", value: "football" },
                    { label: "Baseball", value: "baseball" },
                    { label: "Hockey", value: "hockey" },
                  ]}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>Institución Médica</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Institución Médica"
                  placeholderTextColor="gray"
                  autoCapitalize={"characters"}
                  value={userData.apodo}
                ></TextInput>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text style={styles.text}>No. Poliza/ No. Afiliación</Text>
                <TextInput
                  style={styles.input}
                  placeholder="No. Poliza/ No. Afiliación"
                  placeholderTextColor="gray"
                  autoCapitalize={"characters"}
                  value={userData.apodo}
                ></TextInput>
              </View>
            </View>
            {/* boton para subir información */}
            <View style={{ marginTop: 30 }}>
              <Button title="Subir Información" color={"#F15A24"}></Button>
            </View>
          </View>
        </View>
      </ScrollView>
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  tarjeta: {
    elevation: 10,
    backgroundColor: "white",
    shadowColor: "#f15a24",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 15,
    margin: 10,
    marginTop: -35,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    color: "#f15a24",
  },
  input: {
    borderBottomColor: "#f15a24",
    borderBottomWidth: 1,
    paddingVertical: 0,
    marginTop: 5,
  },
});
