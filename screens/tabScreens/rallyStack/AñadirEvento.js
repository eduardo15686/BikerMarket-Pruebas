import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { React, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { FIREBASE_APP } from "../../../credentials";
import Funcionalidades from "../../../components/Funcionalidades";

export default function AñadirEvento() {
  const [isPickerShow, setIsPickerShow] = useState(false); //useState para activar datePicker:  fecha inicio
  const [isPickerShowEnd, setIsPickerShowEnd] = useState(false); //useState para activar datePicker:  fecha fin
  const [date, setDate] = useState(new Date(Date.now())); //useState para tomar fecha y mostrarla: datePicker inicio
  const [endDate, setEndDate] = useState(new Date(Date.now())); //useState para tomar fecha y mostrarla: datePicker fin

  const [fotoEvento, setFotoEvento] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [nameEvent, setNameEvent] = useState("");
  const [descEvent, setDescEvent] = useState("");
  const [vali, setVali] = useState("");
  const [certi, setCerti] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFotoEvento(result.assets[0].uri);
    }
  };

  //subir imagen

  // const uploadMedia = async () => {
  //   setUploading(true);
  // }

  // try {
  //   const { uri } = await FileSystem.getInfoAsync(fotoEvento);
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = () => {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = (e) => {
  //       reject(new TypeError('Network request failed'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', uri, true);
  //     xhr.send(null);
  //   });
  //   const filename = fotoEvento.substring(fo.lastIndexOf('/') + 1);
  //   const ref = FIREBASE_APP.storage().ref().child(filename);

  //   await ref.put(blob);
  //   setUploading(false);
  //   Alert.alert('Imagen guardada');
  //   setFotoEvento(null);
  // } catch (error) {
  //   console.log(error);
  //   setUploading(false);
  // }

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const showPickerEnd = () => {
    setIsPickerShowEnd(true);
  };

  const onChangeStart = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChangeEnd = (event, value) => {
    setEndDate(value);
    if (Platform.OS === "android") {
      setIsPickerShowEnd(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerPrincipal}>
        <Text style={styles.tituloEvento}>Añadir Evento</Text>

        {/* Agregar foto del evento  */}
        <View style={styles.containerFoto}>
          <TouchableOpacity style={styles.buttonFoto} onPress={pickImage}>
            <Text>Agregar foto</Text>
          </TouchableOpacity>
          {fotoEvento && (
            <Image
              source={{ uri: fotoEvento }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>

        {/* Registrar evento */}
        <View>
          {/* Agregar nombre del evento */}

          <View style={styles.containerEventoInfo}>
            <Text style={styles.textEvento}>Nombre del evento:</Text>
            <TextInput
              style={styles.inputEventos}
              placeholder="nombre del evento..."
              onChangeText={(text) => setNameEvent(text)}
            />
          </View>

          {/* Agregar descripcion del evento */}

          <View style={styles.containerEventoInfo}>
            <Text style={styles.textEvento}>Descripcion del evento:</Text>
            <TextInput
              style={styles.inputEventosDesc}
              placeholder="descripcion del evento..."
              multiline={true}
              maxLength={200}
              onChangeText={(text) => setDescEvent(text)}
            />
          </View>
        </View>

        {/* Fechas del evento */}
        <View style={styles.containerFechaEvento}>
          {/* Fecha de inicio */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              <Text style={{ fontWeight: "bold" }}>Fecha de inicio:</Text>
              {date.toUTCString()}
            </Text>
          </View>
          {!isPickerShow && (
            <View style={{ padding: 15 }}>
              <Button
                title="Seleccionar fecha de inicio"
                color="#FE895C"
                onPress={showPicker}
              />
            </View>
          )}
          {isPickerShow && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "spinner"}
              negative={{ label: "Cancel", textColor: "red" }}
              positiveButton="OK!"
              timeZoneName={"America/Mexico_City"}
              onChange={onChangeStart}
            />
          )}

          {/* Fecha de finalizacion */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              <Text style={{ fontWeight: "bold" }}>Fecha en que termina:</Text>
              {endDate.toUTCString()}
            </Text>
          </View>
          {!isPickerShowEnd && (
            <View style={{ padding: 15 }}>
              <Button
                title="Seleccionar fecha en que termina"
                color="#FE895C"
                onPress={showPickerEnd}
              />
            </View>
          )}
          {isPickerShowEnd && (
            <DateTimePicker
              value={endDate}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "spinner"}
              onChange={onChangeEnd}
            />
          )}
        </View>

        {/* Validaciones */}

        <View style={styles.containerValidaciones}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "grey" }}>
            ¿Validacion de evidencias? {"\n"}
            Escribir unicamente si o no
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(text) => setVali(text)}
              style={styles.inputEvidencias}
              maxLength={2}
            />
          </View>
        </View>

        <View style={styles.containerValidaciones}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "grey" }}>
            ¿Entrega de certificados? {"\n"}
            Escribir unicamente si o no
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(text) => setCerti(text)}
              style={styles.inputEvidencias}
              maxLength={2}
            />
          </View>
        </View>

        {/* Boton para enviar evento 
      <TouchableOpacity
        style={styles.buttonEnviar}>
        <Text style={{ color: 'black' }}>Guardar evento</Text>
      </TouchableOpacity>*/}

        <Funcionalidades
          title={"Registrar evento"}
          eventName={nameEvent}
          eventDesc={descEvent}
          dateInit={date.toUTCString()}
          dateEnd={endDate.toUTCString()}
          validation={vali.toLowerCase()}
          certification={certi.toLowerCase()}
          callFunction={"handleRegisterEvent"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 4,
    borderRadius: 8,
    borderColor: "#FE895C",
  },
  buttonFoto: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 15,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 6,
    borderRightColor: "#FAC3AE",
    borderBottomColor: "#FAC3AE",
  },
  containerFoto: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  containerEventoInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  tituloEvento: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textEvento: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    marginTop: 10,
    marginBottom: 10,
  },
  inputEventos: {
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 6,
    borderRightColor: "#FAC3AE",
    borderBottomColor: "#FAC3AE",
    margin: 10,
    padding: 5,
  },
  inputEventosDesc: {
    flex: 1,
    height: 100,
    textAlignVertical: "top",
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 6,
    borderRightColor: "#FAC3AE",
    borderBottomColor: "#FAC3AE",
    margin: 10,
    padding: 5,
  },
  containerFechaEvento: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    borderTopColor: "#FAC3AE",
    borderTopWidth: 4.5,
  },
  containerValidaciones: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    borderTopColor: "#FAC3AE",
    borderTopWidth: 4.5,
  },
  inputEvidencias: {
    alignSelf: "center",
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 6,
    borderRightColor: "#FAC3AE",
    borderBottomColor: "#FAC3AE",
    margin: 10,
    padding: 5,
  },
  buttonEnviar: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 15,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 6,
    borderRightColor: "#FAC3AE",
    borderBottomColor: "#FAC3AE",
  },
});
