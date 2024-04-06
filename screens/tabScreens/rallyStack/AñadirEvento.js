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

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import { getStorage } from "firebase/storage";
import firebaseAuth from "../../../credentials";
import { FIREBASE_APP } from "../../../credentials";
import Funcionalidades from "../../../components/Funcionalidades";

import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseAuth);
const storage = getStorage(FIREBASE_APP);


export default function AñadirEvento(props) {
  const [fotoEvento, setFotoEvento] = useState(null);
  const [nameEvent, setNameEvent] = useState("");
  const [descEvent, setDescEvent] = useState("");

  const [isPickerShow, setIsPickerShow] = useState(false); //useState para activar datePicker:  fecha inicio
  const [isPickerShowEnd, setIsPickerShowEnd] = useState(false); //useState para activar datePicker:  fecha fin

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [vali, setVali] = useState("unknown");
  const [certi, setCerti] = useState("unknown");


  const [userID, setUserID] = useState(auth.currentUser.uid);

  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoEvento(result.assets[0].uri);
    }
  };



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


  const status = "Activo";

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
                onChangeText={(text) => setNameEvent({ text })}
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
                onChangeText={(text) => setDescEvent({  text })}
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
            <Text style={{ fontSize: 15, color: "grey", textAlign: 'center' }}>
              <Text style={{ fontWeight: "bold" }}>Fecha de inicio: </Text>
              {date.toUTCString()}
            </Text>
          </View>
          {!isPickerShow && (
            <View style={{ padding: 15 }}>
              <Button

                title="Seleccionar fecha de inicio del evento"
                color="#FE895C"
                onPress={showPicker}
              />
            </View>
          )}
          {isPickerShow && (
            <DateTimePicker
              maximumDate={new Date(2030, 10, 20)}
              minimumDate={new Date(2024, 0, 1)}
              value={new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "spinner"}
              negative={{ label: "Cancel", textColor: "red" }}
              positiveButton="OK!"
              timeZoneName={"America/Mexico_City"}
              locale="es-ES"
              onChange={onChangeStart}
            />
          )}

          {/* Fecha de finalizacion */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text style={{ fontSize: 15, color: "grey", textAlign: 'center' }}>
              <Text style={{ fontWeight: "bold" }}>Fecha en que termina: </Text>
              {endDate.toUTCString()}
            </Text>
          </View>
          {!isPickerShowEnd && (
            <View style={{ padding: 15 }}>
              <Button
                title="Seleccionar fecha en que termina el evento"
                color="#FE895C"
                onPress={showPickerEnd}
              />
            </View>
          )}
          {isPickerShowEnd && (
            <DateTimePicker
              maximumDate={new Date(2030, 10, 20)}
              minimumDate={new Date(2024, 0, 1)}
              value={new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "spinner"}
              negative={{ label: "Cancel", textColor: "red" }}
              positiveButton="OK!"
              timeZoneName={"America/Mexico_City"}
              locale="es-ES"
              onChange={onChangeEnd}
            />
          )}
        </View>

        {/*  validaciones */}
        
        <View
          style={styles.containerValidaciones}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
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
              <Picker.Item label="Abrir" value="unknown" />
              <Picker.Item label="SI" value="sivali" />
              <Picker.Item label="NO " value="novali" />
            </Picker>
          </View>
        </View>

        <View
          style={styles.containerValidaciones}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
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
              <Picker.Item label="Abrir" value="unknown" />
              <Picker.Item label="SI" value="sicerti" />
              <Picker.Item label="NO " value="nocerti" />
            </Picker>
          </View>
        </View>


        <Funcionalidades
          title={"Registrar evento"}
          status={status}
          eventPhoto={fotoEvento}
          UID={userID}
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
    borderRadius: 100,
    resizeMode: 'cover',
  },
  containerFoto: {
    alignContent: "center",
    alignItems: "center"
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
  dropDown: {
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

{/* 
<View>
          <View
            style={styles.containerValidaciones}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
              Verifique su validacion {'\n'}
              Por favor seleccione "SI" o "NO"
            </Text>
            <RNPickerSelect
              value={vali}
              style={styles.dropDown}
              onValueChange={(value, index) =>
                setVali({  value })}
              items={[
                { label: 'SI', value: 'sivali' },
                { label: 'NO', value: 'novali' },
              ]}
            />

          </View>

          <View
            style={styles.containerValidaciones}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
              Verifique su certificacion {'\n'}
              Por favor seleccione "SI" o "NO"
            </Text>
            <RNPickerSelect
              value={certi}
              style={styles.dropDown}
              onValueChange={(value, index) =>
                setCerti({  value })}
              items={[
                { label: 'SI', value: 'sicerti' },
                { label: 'NO', value: 'nocerti' },
              ]}
            />
          </View>
        </View>*/}