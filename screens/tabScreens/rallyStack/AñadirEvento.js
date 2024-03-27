import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";
import { React, useState } from "react";

import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

export default function AñadirEvento() {
  const [isChecked, setChecked] = useState(false);

  const setDate = (event, date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };

  return (
    <View style={styles.containerPrincipal}>


      <Text style={styles.tituloEvento}>
        AñadirEvento
      </Text>


      <Text style={styles.textEvento}>
        Nombre del evento:
      </Text>
      <TextInput
        style={styles.inputEventos}
        placeholder="nombre del evento..."
      >
      </TextInput>

      <Text style={styles.textEvento}>
        Descripcion del evento:
      </Text>
      <TextInput
        style={styles.inputEventos}
        placeholder="descripcion del evento..."
        maxLength={200}
      >
      </TextInput>





      <View styles={styles.containerFechas}>

        <Text>
          Fecha de inicio:

        </Text>
        <DateTimePicker
          mode="date"
          maximumDate={new Date(2030, 10, 20)}
          value={new Date()}
          display={"spinner"}
          textColor="#FAC3AE"
          onChange={this.setDate}
        />

        <Text>
          Fecha en que termina:
        </Text>
        <DateTimePicker
          mode="date"
          maximumDate={new Date(2030, 10, 20)}
          value={new Date()}
          display={"spinner"}
          textColor="#FAC3AE"
          onChange={this.setDate}
        />

      </View>


      <View>
        <Text>
          ¿Validacion de evidencias?
        </Text>


        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}>
        </Checkbox>


        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}>
        </Checkbox>
      </View>


      <View>
        <Text>
          ¿Entrega de certificados?
        </Text>


        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}>
        </Checkbox>


        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}>
        </Checkbox>
      </View>


      <TouchableOpacity
        style={{
          width: 150,
          
          borderColor: 'red',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        
      >
        <Text style={{ color: '#000000' }}>Guardar evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 8,
    borderColor: '#FE895C'
  },
  tituloEvento: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textEvento: {

  },
  inputEventos: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#FAC3AE',
    backgroundColor: '#F6F6F6',
    margin: 10,
    padding: 5
  },
  buttonEnviar: {
    backgroundColor: '#FAC3AE',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
  }
});

