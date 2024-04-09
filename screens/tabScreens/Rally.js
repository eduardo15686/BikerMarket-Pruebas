import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../credentials";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function Rally() {
  const auth = getAuth(firebaseAuth);
  const [userData, setUserData] = useState();
  const [todoData, setTodoData] = useState([]);

  const { navigate } = useNavigation();
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable onPress={() => navigate("Añadir Evento")}>
  //         <View style={{ alignContent: "center", alignItems: "center" }}>
  //           <FontAwesome
  //             style={{ marginRight: 1 }}
  //             name="plus-circle"
  //             size={24}
  //             color="#f15a24"
  //           />
  //         </View>
  //       </Pressable>
  //     ),
  //   });
  // }, []);

  return (
    <View>
      <Text>Rally</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
