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

// import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'


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
  const [vali, setVali] = useState("Unknown");
  const [certi, setCerti] = useState("Unkwon");

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

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(fotoEvento);
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
      const filename = fotoEvento.substring(fo.lastIndexOf('/') + 1);
      const ref = FIREBASE_APP.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert('Imagen guardada');
      setFotoEvento(null);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }



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
          <TouchableOpacity
            style={styles.buttonFoto}
            onPress={pickImage}>
              {!fotoEvento && <Text>Añadir evento</Text>}

            {fotoEvento && 
            <><Image source={{ uri: fotoEvento }} style={styles.fotoEvento} />
           <View style={styles.containerFoto}>
            </View> 
            </>
            }
          </TouchableOpacity>

        </View>

        {/* Registrar evento */}
        <View>
          {/* Agregar nombre del evento */}

          <View
            style={styles.containerEventoInfo}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey' }}>
              Nombre del evento
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <TextInput
                onChangeText={(text) => setNameEvent(text)}
                style={styles.inputEventosDesc} />
            </View>
          </View>

          {/* Agregar descripcion del evento */}

          <View
            style={styles.containerEventoInfo}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey' }}>
              Descripcion del evento
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <TextInput
                onChangeText={(text) => setDescEvent(text)}
                style={styles.inputEventosDesc}
                maxLength={200}
                multiline={true} />
            </View>
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
          {/* {isPickerShow && (
            // <DateTimePicker
            //   value={date}
            //   mode={"date"}
            //   display={Platform.OS === "ios" ? "spinner" : "spinner"}
            //   negative={{ label: "Cancel", textColor: "red" }}
            //   positiveButton="OK!"
            //   timeZoneName={"America/Mexico_City"}
            //   onChange={onChangeStart}
            // />
          )} */}

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
          {/* {isPickerShowEnd && (
            // <DateTimePicker
            //   value={endDate}
            //   mode={"date"}
            //   display={Platform.OS === "ios" ? "spinner" : "spinner"}
            //   onChange={onChangeEnd}
            // />
          )} */}
        </View>

        {/* Validaciones */}

        <View
          style={styles.containerValidaciones}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey' }}>
            ¿Validacion de evidencias? {'\n'}
            Por favor selecciona "SI" o "NO"
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Picker
              mode="dropdown"
              selectedValue={vali}
              onValueChange={(value, index) =>
                setVali(value)}
                style={styles.dropDown} >
              <Picker.Item label="Abrir" value="Unknown" />
              <Picker.Item label="SI" value="siVali" />
              <Picker.Item label="NO " value="noVali" />
            </Picker>
          </View>
        </View>

        <View
          style={styles.containerValidaciones}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey' }}>
            ¿Entrega de certificados? {'\n'}
            Por favor selecciona "SI" o "NO"
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
             <Picker
              mode="dropdown"
              selectedValue={certi}
              onValueChange={(value, index) =>
                setCerti(value)}
                style={styles.dropDown} >
              <Picker.Item label="Abrir" value="Unknown" />
              <Picker.Item label="SI" value="siCerti" />
              <Picker.Item label="NO " value="noCerti" />
            </Picker>
          </View>
        </View>

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  buttonFoto: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderWidth: 3,
    borderRadius: 75,
    borderColor: 'grey',
  },
  fotoEvento: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    resizeMode: 'cover',
  },
  containerFoto: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 7
  },
  containerEventoInfo: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
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
  inputEventosDesc: {
    flex: -1,
    width: '100%',
    textAlignVertical: 'top',
    margin: 5,
    padding: 5,
    borderBottomColor: '#FAC3AE',
    borderBottomWidth: 3.5
  },
  containerFechaEvento: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    borderTopColor: '#FAC3AE',
    borderTopWidth: 5
  },
  containerValidaciones: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    borderTopColor: '#FAC3AE',
    borderTopWidth: 5
  },
  dropDown:{
    flex: 1,
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
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
