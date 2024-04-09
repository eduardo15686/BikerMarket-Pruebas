import { StyleSheet, Text, View, Pressable, Image, ScrollView } from "react-native";
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
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const getEvent = () => {
      const q = query(
        collection(FIREBASE_DB, "events"),
        where("status", "==", "Activo"));

      onSnapshot(q, (querySnapshot) => {
        const arrayEmpty = [];
        querySnapshot.forEach((doc) => {
          arrayEmpty.push({ id: doc.id, datos: doc.data() });
        });
        setTodoData(arrayEmpty);
      });
    };
    getEvent();
  }, []);


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
   <ScrollView>
    <View style={styles.container}>
      {todoData.map((item, index) => {
        return(
          <View key={index} style={styles.user}>
            <Image
                style={styles.image}
                source={{ uri: item.datos.eventPhoto }}
              />

              <View style={styles.userInfo}>
                <Text style={styles.title}>{item.datos.eventName}</Text>
                <Text style={styles.subTitle}>Descripcion:</Text>
                <Text style={styles.userText}>{item.datos.eventDesc.substring(0, 30)} ...</Text>
                <Text style={styles.subTitle}>
                  Fecha de inicio: {item.datos.dateInit}
                </Text>
              </View>
            
          </View>
        );
      })}
    </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "baseline",
    justifyContent: "center",
    textAlign: "justify",
    marginTop: 15,
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
