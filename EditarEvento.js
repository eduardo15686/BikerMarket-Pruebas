import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';




export default function EditarEvento({ route }) {
const [info, setInfo] = useState({
  image: route.params.data.eventPhoto,
  name: route.params.data.eventName,
  desc: route.params.data.eventDesc,
  date: new Date(route.params.data.dateInit),
  endDate: new Date(route.params.data.dateEnd),
  vali: route.params.data.validation,
  certi: route.params.data.certification
})


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
      setInfo({...info, image: result.assets[0].uri});
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Editar imagen */}
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 100 }}
            source={{
              uri: info.image,
            }}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ fontWeight: "bold", marginTop: 15 }}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Editar nombre y descripcion */}
        <View>

          {/* Nombre */}

          <View style={styles.containerEventoInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "grey" }}>
              Nombre del evento
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
              onChangeText={(text) => setInfo({...info, name: text})}
                style={styles.inputEventosDesc}
              >
                {info.name}
              </TextInput>
            </View>
          </View>

          {/* Descripcion */}

          <View style={styles.containerEventoInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "grey" }}>
              Descripcion del evento
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
              onChangeText={(text) => setInfo({...info, desc: text})}
                style={styles.inputEventosDesc}
                maxLength={200}
                multiline={true}
              >
                {info.desc}
              </TextInput>
            </View>
          </View>

        </View>


        {/* Editar fechas */}
        <View style={styles.containerFechaEvento}>
          {/* Fecha de inicio */}
          <View style={{ fontSize: 20, color: "#FE895C" }}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              <Text style={{ fontWeight: "bold" }}>Fecha de inicio:</Text>
              {info.date.toUTCString()}
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
            <Text style={{ fontSize: 15, color: "grey" }}>
              <Text style={{ fontWeight: "bold" }}>Fecha en que termina:</Text>
              {info.endDate.toUTCString()}
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


        {/* Editar validaciones */}
        <View>
          <View
            style={styles.containerValidaciones}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
              Verifique su validacion {'\n'}
              Por favor selecciona "SI" o "NO"
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Picker
                mode="dropdown"
                selectedValue={info.vali}
                onValueChange={(value, index) =>
                  setInfo({...info, vali: value})}
                style={styles.dropDown} >
                <Picker.Item label="SI" value="sivali" />
                <Picker.Item label="NO " value="novali" />
              </Picker>
            </View>
          </View>

          <View
            style={styles.containerValidaciones}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'grey', textAlign: 'center' }}>
              Verifique su certificacion {'\n'}
              Por favor selecciona "SI" o "NO"
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Picker
                mode="dropdown"
                selectedValue={info.certi}
                onValueChange={(value, index) =>
                  setInfo({...info, certi: value})}
                style={styles.dropDown} >
                <Picker.Item label="SI" value="sicerti" />
                <Picker.Item label="NO " value="nocerti" />
              </Picker>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerEventoInfo: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputEventosDesc: {
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
  }
});