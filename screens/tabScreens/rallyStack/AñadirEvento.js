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
import { React, useState, useEffect } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

import { getStorage } from "firebase/storage";
import firebaseAuth from "../../../credentials";
import { FIREBASE_APP } from "../../../credentials";
import Funcionalidades from "../../../components/Funcionalidades";

import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseAuth);
const storage = getStorage(FIREBASE_APP);

export default function AñadirEvento(props) {
  const [userData, setUserData] = useState([
    {
      eventName: "",
      eventDescription: "",
      vali: "empty",
      certi: "empty",
    },
  ]);

  const [dates, setDates] = useState({
    dateStart: new Date(),
    endDate: new Date(),
    createdAt: new Date()
  });

  const [fotoEvento, setFotoEvento] = useState(null);

  const [userID, setUserID] = useState(auth.currentUser.uid);

  const [isPickerShow, setIsPickerShow] = useState(false); //useState para activar datePicker:  fecha inicio
  const [isPickerShowEnd, setIsPickerShowEnd] = useState(false); //useState para activar datePicker:  fecha fin

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

  const showDatePicker = () => {
    setIsPickerShow(true);
  };
  const hideDatePicker = () => {
    setIsPickerShow(false);
  };


  const showDatePickerEnd = () => {
    setIsPickerShowEnd(true);
  };

  const hideDatePickerEnd = () => {
    setIsPickerShowEnd(false);
  };


  const handleConfirm = (date) => {
    setDates({ ...dates, dateStart: date });
    hideDatePicker();
  };



  const handleConfirmEnd = (date) => {
    setDates({ ...dates, endDate: date });
    hideDatePickerEnd();
  };

  return (
    <ScrollView>
      <View style={styles.containerPrincipal}>
        {/* <Text style={styles.tituloEvento}>Añadir Evento</Text> */}

        {/* Agregar foto del evento  */}
        <View style={[styles.containerFoto, { marginTop: 20 }]}>
          <TouchableOpacity style={styles.buttonFoto} onPress={pickImage}>
            {!fotoEvento && <Text>Agregar foto </Text>}

            {fotoEvento && (
              <>
                <Image source={{ uri: fotoEvento }} style={styles.fotoEvento} />
                <View style={styles.containerFoto}></View>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Registrar evento */}
        <View>
          {/* Agregar nombre del evento */}

          <View style={styles.containerEventoInfo}>
            <Text style={{ fontSize: 16, color: "#f15a24" }}>
              Nombre del evento
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) =>
                  setUserData({ ...userData, eventName: text })
                }
                style={styles.inputEventosDesc}
              />
            </View>
          </View>

          {/* Agregar descripcion del evento */}

          <View style={styles.containerEventoInfo}>
            <Text style={{ fontSize: 16, color: "#f15a24" }}>
              Descripcion del evento
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(text) => setUserData({ ...userData, eventDescription: text})}
                style={styles.inputEventosDesc}
                maxLength={200}
                multiline={true}
              />
            </View>
          </View>
        </View>

        {/* Fechas del evento */}
        <View style={styles.containerFechaEvento}>
          {/* Fecha de inicio */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text
              style={{ fontSize: 14, color: "#f15a24", textAlign: "center" }}
            >
              <Text style={{ fontWeight: "bold" }}>Fecha de inicio: </Text>
              <Text>
                {dates.dateStart.toLocaleDateString("es-Mx", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </Text>
          </View>
          <Button title="Seleccionar Fecha"
            color="#FE895C"
            onPress={showDatePicker} />
          <DateTimePickerModal
            maximumDate={new Date(2030, 10, 20)}
            minimumDate={new Date(2024, 0, 1)}
            isVisible={isPickerShow}
            mode="date"
            locale="es-Es"
            display="spinner"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={new Date()}
          />

          {/* Fecha de finalizacion */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text
              style={{ fontSize: 14, color: "#f15a24", textAlign: "center" }}
            >
              <Text style={{ fontWeight: "bold" }}>Fecha en que termina: </Text>{" "}
              {dates.endDate.toLocaleDateString("es-Mx", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <Button title="Seleccionar Fecha"
            color="#FE895C"
            onPress={showDatePickerEnd} />
          <DateTimePickerModal
            maximumDate={new Date(2030, 10, 20)}
            minimumDate={new Date(2024, 0, 1)}
            isVisible={isPickerShowEnd}
            mode="date"
            locale="es-Es"
            display="spinner"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            onConfirm={handleConfirmEnd}
            onCancel={hideDatePickerEnd}
            date={new Date()}
          />

        </View>

        {/*  validaciones */}

        <View
          style={{
            marginVertical: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#f15a24",
              textAlign: "center",
            }}
          >
            ¿Validacion de evidencias? {"\n"}
            Por favor selecciona "SI" o "NO"
          </Text>
          <RNPickerSelect
            style={{ width: 100, flex: 1, viewContainer: true }}
            doneText="Aceptar"
            value={userData.vali}
            placeholder={{
              value: null,
              label: "Selecciona una opcion",
            }}
            onValueChange={(value) =>
              setUserData({
                ...userData,
                vali: value,
              })
            }
            items={[
              { label: "SI", value: "SI" },
              { label: "NO", value: "NO" },
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
          <Text
            style={{
              fontSize: 16,
              color: "#f15a24",
              textAlign: "center",
            }}
          >
            ¿Entrega de certificados? {"\n"}
            Por favor selecciona "SI" o "NO"
          </Text>
          <RNPickerSelect
            style={{ width: 100, flex: 1, viewContainer: true }}
            doneText="Aceptar"
            value={userData.certi}
            placeholder={{
              value: null,
              label: "Selecciona una opcion",
            }}
            onValueChange={(value) =>
              setUserData({
                ...userData,
                certi: value,
              })
            }
            items={[
              { label: "SI", value: "SI" },
              { label: "NO", value: "NO" },
            ]}
          />
        </View>

        <Funcionalidades
          title={"Registrar evento"}
          editPhoto={fotoEvento}
          userID={userID}
          eventName={userData.eventName}
          eventDescription={userData.eventDescription}
          dateStart={dates.dateStart}
          dateEnd={dates.endDate}
          createdAt={dates.createdAt}
          validation={userData.vali}
          certification={userData.certi}
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
  },
  buttonFoto: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderWidth: 3,
    borderRadius: 75,
    borderColor: "grey",
  },
  fotoEvento: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "cover",
  },
  containerFoto: {
    alignContent: "center",
    alignItems: "center",
  },
  containerEventoInfo: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  tituloEvento: {
    alignSelf: "center",
    fontSize: 20,
    color: "#f15a24",
  },
  textEvento: {
    fontSize: 16,
    color: "#f15a24",
    marginTop: 10,
    marginBottom: 10,
  },
  inputEventosDesc: {
    flex: -1,
    width: "100%",
    textAlignVertical: "top",
    margin: 5,
    padding: 5,
    borderBottomColor: "#FAC3AE",
    borderBottomWidth: 3.5,
  },
  containerFechaEvento: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    borderTopColor: "#FAC3AE",
    borderTopWidth: 5,
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
