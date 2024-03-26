import {
  View,
  Text,
  Pressable,
  useColorScheme,
  NativeModules,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";
import { StatusBar } from "expo-status-bar";

export default function Rally() {
  const auth = getAuth(firebaseAuth);
  const [userLogged, setUserLogged] = useState();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("cerrando sesion");
        NativeModules.DevSettings.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.setOptions({
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigate("Registro para Eventos", {
                  user: user.uid,
                })
              }
            >
              <Image
                source={require("../../assets/defaultProfile.webp")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginBottom: 7,
                }}
              />
            </Pressable>
          ),
        });
      }
    });
  }, []);

  const theme = useColorScheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            style={styles.image}
            source={require("../../assets/bikerlogo.png")}
          />
          <View style={styles.userInfo}>
            <Text style={styles.title}>RODANDO A LO GRANDE</Text>
            <Text style={styles.subTitle}>Descripcion:</Text>
            <Text style={styles.userText}>
              {
                "Una prueba de todo lo que lleva este ejmplo de card de no más de 100 caracteres "
              }
            </Text>
            <Text style={[{}, styles.subTitle]}>
              Fecha de inicio: 10/12/2024
            </Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
    // <ScrollView style={{ marginTop: 15 }}>
    //   <View>
    //     <Text
    //       onPress={() => {
    //         handleLogOut();
    //       }}
    //       style={{ color: theme === "dark" ? "#FFF" : "#000" }}
    //     >
    //       pruebas para si
    //     </Text>
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "baseline",
    justifyContent: "center",
    textAlign: "justify",
  },
  image: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#F15A24",
    backgroundColor: "#F7E8DF",
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
  },
  userText: {
    color: "black",
    textAlign: "left",
  },
});
