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
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";
import { StatusBar } from "expo-status-bar";
import { collection, setDoc, doc, getDoc, updateDoc, getDocs, query, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../credentials";
import  {ref, onValue} from "firebase/storage";

export default function Rally() {
  const auth = getAuth(firebaseAuth);
  const [userData, setUserData] = useState();

  const [todoData, setTodoData] = useState([]);

  useEffect (() => {
    const getEvent = () => {
    const q =  query(collection(FIREBASE_DB, "events"));
    const arrayEmpty = [];
    const sendData = onSnapshot(q, (querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        arrayEmpty.push(doc.data());
        console.log("Data: ", doc.data().userID);
      });
    });
    setTodoData(arrayEmpty);
    }
   getEvent();
  }, [])

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
        const getDocument = async () => {
          try {
            const docRef = doc(FIREBASE_DB, "users", `${user.uid}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData(docSnap.data());
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
                      source={{
                        uri: docSnap.data().foto_url,
                      }}
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
            } else {
              setUserData(null);
              console.log("No document!");
            }
          } catch (e) {
            console.log(e);
          }
        };
        getDocument();
      }
    });
  }, []);

  const theme = useColorScheme();

  return (
 
    <ScrollView>
      <View style={styles.container}>
       
      {todoData.map((item, index) => {
          return( 
            <View style={styles.user} key={index}>
                <Image
                style={styles.image}
                source={{uri: item.eventPhoto}} />
                <View style={styles.userInfo}>
                <Text style={styles.title}>{item.eventName}</Text>
                <Text style={styles.subTitle}>Descripcion:</Text>
                <Text style={styles.userText}>
                  {item.eventDesc}
                </Text>
                <Text style={ styles.subTitle}>
                  Fecha de inicio: {item.dateInit}
                </Text>
                </View>
              </View>
          );

        })}
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
