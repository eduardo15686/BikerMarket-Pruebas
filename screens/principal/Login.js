import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Funcionalidades from "../../components/Funcionalidades";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Login() {
  const { navigate } = useNavigation();
  const [showPwd, setShowPwd] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <LinearGradient
          // Background Linear Gradient
          colors={["#FB8558", "#F9A384", "#FAC3AE"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.topLogo}
        >
          <Image
            source={require("../../assets/bikerlogo.png")}
            style={styles.logo}
          ></Image>
        </LinearGradient>
        <View style={styles.tarjeta}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              color: "#f15a24",
              textAlign: "center",
            }}
          >
            INICIAR SESIÓN
          </Text>
          <View
            style={{ marginVertical: 10, paddingLeft: 10, paddingRight: 10 }}
          >
            <Text style={styles.text}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="gray"
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#f15a24",
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            Contraseña
          </Text>
          <View style={styles.cajaTexto}>
            {showPwd ? (
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="gray"
                style={styles.inputStyle}
                secureTextEntry={showPwd}
                onChangeText={(text) => setPassword(text)}
              />
            ) : (
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="gray"
                style={styles.inputStyle}
                onChangeText={(text) => setPassword(text)}
              />
            )}

            {showPwd ? (
              <FontAwesome5
                style={styles.iconStyle}
                name="eye-slash"
                size={19}
                color="#f15a24"
                onPress={() => setShowPwd(!showPwd)}
              />
            ) : (
              <FontAwesome5
                style={styles.iconStyle}
                name="eye"
                size={19}
                color="#f15a24"
                onPress={() => setShowPwd(!showPwd)}
              />
            )}
          </View>
          <Text style={{ color: "#FA9772", fontSize: 16, textAlign: "right" }}>
            ¿Olvidaste tu contraseña?
          </Text>
          <Funcionalidades
            password={password}
            email={email}
            title={"Ingresar"}
            callFunction={"handleSingIn"}
          />
          <TouchableOpacity
            onPress={() => {
              navigate("Register");
            }}
          >
            <Text
              style={{ color: "#f15a24", fontSize: 16, textAlign: "center" }}
            >
              ¿No tienes una cuenta?
              <Text
                style={{ color: "#f15a24", fontSize: 16, textAlign: "center" }}
              >
                {" "}
                Registrate
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: "center", fontSize: 19, fontWeight: "bold" }}>
          O
        </Text>
        <View style={styles.tarjetaInferior}>
          <Text style={{ color: "#f15a24", fontSize: 16, textAlign: "center" }}>
            INICIA SESIÓN CON
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ padding: 10 }}>
              <FontAwesome5 name="facebook" size={40} color="#f15a24" />
            </View>
            <View style={{ padding: 10 }}>
              <FontAwesome5 name="google" size={40} color="#f15a24" />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  topLogo: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: Dimensions.get("window").height * 0.31,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 120,
    width: 180,
    marginLeft: 30,
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
  },
  tarjetaInferior: {
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    marginTop: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#f15a24",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  boton: {
    borderRadius: 100,
    width: 170,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  iconStyle: {
    paddingBottom: 5,
    // paddingRight: 15,
  },
  cajaTexto: {
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    borderBottomColor: "#f15a24",
    borderBottomWidth: 1,
    paddingVertical: 0,
    // marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#f15a24",
  },
  input: {
    borderBottomColor: "#f15a24",
    borderBottomWidth: 1,
    paddingVertical: 0,
    marginTop: 10,
  },
});
