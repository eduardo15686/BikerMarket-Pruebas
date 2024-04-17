import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import Funcionalidades from "././components/Funcionalidades";

export default function EditarEvento({ route }) {
  const [info, setInfo] = useState({

    updatedBy: route.params.data.id,
    updateAt: new Date(),

    deletedBy: route.params.data.id,
    deletedAt: new Date(),

    image: route.params.data.datos.url_photo,
    nameEdit: route.params.data.datos.name,
    descriptionEdit: route.params.data.datos.description,
    validationEdit: route.params.data.datos.validation,
    certificationEdit: route.params.data.datos.certification,
    
    
  });

  const [isPickerShow, setIsPickerShow] = useState(false); //useState para activar datePicker:  fecha inicio
  const [isPickerShowEnd, setIsPickerShowEnd] = useState(false); //useState para activar datePicker:  fecha fin

  const [date, setDate] = useState(
    new Date(route.params.data.datos.date_start.seconds * 1000)
  );
  const [endDate, setEndDate] = useState(
    new Date(route.params.data.datos.date_end.seconds * 1000)
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setInfo({ ...info, image: result.assets[0].uri });
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
                onChangeText={(text) => setInfo({ ...info, nameEdit: text })}
                style={styles.inputEventosDesc}
              >
                {info.nameEdit}
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
                onChangeText={(text) => setInfo({ ...info, descriptionEdit: text })}
                style={styles.inputEventosDesc}
                maxLength={200}
                multiline={true}
              >
                {info.descriptionEdit}
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
              {date.toLocaleDateString("es-Mx", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
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
              maximumDate={new Date(2030, 10, 20)}
              minimumDate={new Date(2024, 0, 1)}
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
              {endDate.toLocaleDateString("es-Mx", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
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
              maximumDate={new Date(2030, 10, 20)}
              minimumDate={new Date(2024, 0, 1)}
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
          <View style={styles.containerValidaciones}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "grey",
                textAlign: "center",
              }}
            >
              Verifique su validacion {"\n"}
              Por favor seleccione "SI" o "NO"
            </Text>
            <RNPickerSelect
              value={info.validationEdit}
              style={styles.dropDown}
              onValueChange={(value, index) =>
                setInfo({ ...info, validationEdit: value })
              }
              items={[
                { label: "SI", value: "SI" },
                { label: "NO", value: "NO" },
              ]}
            />
          </View>

          <View style={styles.containerValidaciones}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "grey",
                textAlign: "center",
              }}
            >
              Verifique su certificacion {"\n"}
              Por favor seleccione "SI" o "NO"
            </Text>
            <RNPickerSelect
              value={info.certificationEdit}
              style={styles.dropDown}
              onValueChange={(value, index) =>
                setInfo({ ...info, certificationEdit: value })
              }
              items={[
                { label: "SI", value: "SI" },
                { label: "NO", value: "NO" },
              ]}
            />
          </View>
        </View>
        <Funcionalidades
          title={"Guardar"}
          updatedBy={info.updatedBy}
          updateAt={info.updateAt}

          editPhoto={info.image}
          editName={info.nameEdit}
          editDescription={info.descriptionEdit}
          editStart={date}
          editEnd={endDate}
          editValidation={info.validationEdit}
          editCertification={info.certificationEdit}
          callFunction={"handlerEditEvent"}
        />
        <Funcionalidades
          deletedBy={info.deletedBy}
          deletedAt={info.deletedAt}
          title={"Eliminar Evento"}
          callFunction={"handlerDeleteEvent"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  containerEventoInfo: {
    padding: 10,
    marginBottom: 15,
    marginEnd: -1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  inputEventosDesc: {
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
  containerValidaciones: {
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
});
