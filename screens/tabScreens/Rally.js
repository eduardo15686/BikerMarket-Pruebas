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
    <ScrollView style={{ marginTop: 15 }}>
      <View>
        <Text
          onPress={() => {
            handleLogOut();
          }}
          style={{ color: theme === "dark" ? "#FFF" : "#000" }}
        >
          pruebas para si
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    elevation: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 15,
    margin: 10,
    padding: 15,
    flexDirection: "row",
  },
});
