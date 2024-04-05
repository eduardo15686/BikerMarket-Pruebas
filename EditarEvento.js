import React from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";





export default function EditarEvento({ route }) {
  const event = route.params.data.eventName;
  const desc = route.params.data.eventDesc;
  return (
    <View style={styles.container}>
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
              style={styles.inputEventosDesc}
            >
              {event}
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
              style={styles.inputEventosDesc}
              maxLength={200}
              multiline={true}
            >
              {desc}
            </TextInput>
          </View>
        </View>
      </View>
    </View>
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
    }
});