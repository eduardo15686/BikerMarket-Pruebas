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
import { FontAwesome } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { getAuth } from "firebase/auth";
import { FIREBASE_DB } from "../../credentials";
import FIREBASE_APP from "../../credentials";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  orderBy,
  whereEqualTo,
} from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import estados from "../../estados.json";

import RNPickerSelect from "react-native-picker-select";

const auth = getAuth();
const storage = getStorage(FIREBASE_APP);

export default function EventRegister({ route }) {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({ fecha_nacimiento: new Date() });
  const [municipios, setMunicipios] = useState([]);
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
    // new Date(route.params.data.datos.dateInit.seconds * 1000)
    hideDatePicker();
    setUserData({
      ...userData,
      fecha_nacimiento: new Date(date),
    });
  };

  // Listen to onAuthStateChanged

  const usuario = route.params.user;
  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(FIREBASE_DB, "users", `${usuario}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({
            ...docSnap.data(),
            fecha_nacimiento: new Date(
              docSnap.data().fecha_nacimiento.seconds * 1000
            ),
          });
        } else {
          setUserData(null);
          console.log("No document!");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDocument();
  }, []);

  const tempData = [];

  estados.forEach((data) => {
    tempData.push({ label: `${data.nombre}`, value: `${data.nombre}` });
  });

  const getEstados = async (valor) => {
    getMunicipios(valor);
  };

  const getMunicipios = async (valor) => {
    const q = query(
      collection(FIREBASE_DB, "municipios"),
      where("estado_id", "==", valor),
      orderBy("nombre", "asc")
    );
    const arrayEmpty = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrayEmpty.push({
          label: `${doc.data().nombre}`,
          value: `${doc.data().nombre}`,
        });
      });
      setMunicipios(arrayEmpty);
    });
  };

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

  const valiSeguroMedico = (value) => {
    setUserData({ ...userData, seguroMedico: value });
  };

  editarCambios = () => {
    updateDoc(doc(FIREBASE_DB, "users", `${usuario}`), {
      apodo: userData.apodo,
      celular: userData.celular,
      estado: userData.estado,
      fecha_nacimiento: userData.fecha_nacimiento,
      foto_url: userData.foto_url,
      municipio: userData.municipio,
      nombre: userData.nombre,
      seguroMedico: userData.seguroMedico,
      tipoSangre: userData.tipoSangre,
      institucionMedica: userData.institucionMedica,
      poliza: userData.poliza,
    });
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
            {userData.foto_url == "" ? (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 100 }}
                  source={require("../../assets/defaultProfile.webp")}
                />
              </View>
            ) : (
              <View style={{ alignContent: "center", alignItems: "center" }}>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 100 }}
                  source={{
                    uri: userData.foto_url,
                  }}
                />
                <Text style={{ fontWeight: "bold", marginTop: 15 }}>
                  Editar
                </Text>
              </View>
            )}

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
                  onChangeText={(text) =>
                    setUserData({ ...userData, nombre: text })
                  }
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
                  onChangeText={(text) =>
                    setUserData({ ...userData, apodo: text })
                  }
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
                  value={userData.celular}
                  onChangeText={(text) =>
                    setUserData({ ...userData, celular: text })
                  }
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
                <Text style={styles.text}>Fecha de nacimiento 2 3 4</Text>
                <Text>
                  {userData.fecha_nacimiento.toLocaleDateString("es-Mx", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  locale="es-Es"
                  display="spinner"
                  cancelTextIOS="Cancelar"
                  confirmTextIOS="Confirmar"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  date={userData.fecha_nacimiento}
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
                <Text style={[{ marginBottom: 5 }, styles.text]}>Estado</Text>
                <RNPickerSelect
                  doneText="Aceptar"
                  placeholder={{ value: null, label: "Selecciona un Estado" }}
                  style={{ width: 100, flex: 1 }}
                  value={userData.estado}
                  onValueChange={(value) => {
                    getEstados(value),
                      setUserData({ ...userData, estado: value });
                  }}
                  items={tempData}
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
                <Text style={[{ marginBottom: 5 }, styles.text]}>
                  Municipio
                </Text>
                <RNPickerSelect
                  doneText="Aceptar"
                  placeholder={{
                    value: null,
                    label: "Selecciona un Municipio",
                  }}
                  value={userData.municipio}
                  style={{
                    width: 100,
                    flex: 1,
                  }}
                  onValueChange={(value) =>
                    setUserData({ ...userData, municipio: value })
                  }
                  items={municipios}
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
                <Text style={[{ marginBottom: 5 }, styles.text]}>
                  Tipo de Sangre
                </Text>
                <RNPickerSelect
                  style={{ width: 100, flex: 1, viewContainer: true }}
                  doneText="Aceptar"
                  value={userData.tipoSangre}
                  placeholder={{
                    value: null,
                    label: "Selecciona un tipo de sangre",
                  }}
                  onValueChange={(value) =>
                    setUserData({ ...userData, tipoSangre: value })
                  }
                  items={[
                    { label: "A+", value: "A+" },
                    { label: "A-", value: "A-" },
                    { label: "B+", value: "B+" },
                    { label: "B-", value: "B-" },
                    { label: "AB+", value: "AB+" },
                    { label: "AB-", value: "AB-" },
                    { label: "O+", value: "O+" },
                    { label: "O-", value: "O-" },
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
                <Text style={[{ marginBottom: 5 }, styles.text]}>
                  Seguro Medico
                </Text>
                <RNPickerSelect
                  doneText="Aceptar"
                  value={userData.seguroMedico}
                  placeholder={{
                    value: null,
                    label: "¿Cuenta con seguro Medico?",
                  }}
                  style={{ width: 100, flex: 1 }}
                  onValueChange={(value) => {
                    valiSeguroMedico(value);
                  }}
                  items={[
                    { label: "Si", value: "Si" },
                    { label: "No", value: "No" },
                  ]}
                />
              </View>
              {userData.seguroMedico == "Si" ? (
                <View>
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
                      value={userData.institucionMedica}
                      onChangeText={(text) =>
                        setUserData({ ...userData, institucionMedica: text })
                      }
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
                      value={userData.poliza}
                      onChangeText={(text) =>
                        setUserData({ ...userData, poliza: text })
                      }
                    ></TextInput>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            {/* boton para subir información */}
            <View style={{ marginTop: 30 }}>
              <Button
                title="Subir Información"
                color={"#F15A24"}
                onPress={editarCambios}
              ></Button>
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
