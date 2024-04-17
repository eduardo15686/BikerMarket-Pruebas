// import { StyleSheet, Text, View, Button } from "react-native";
// import React, { useState, useEffect } from "react";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import QRCode from "react-native-qrcode-svg";
// import { getAuth } from "firebase/auth";
// import firebaseAuth from "../../credentials";
// import { FIREBASE_DB } from "../../credentials";
// import { doc, getDoc } from "firebase/firestore";
// import * as Device from "expo-device";

// export default function Registrado() {
//   const auth = getAuth(firebaseAuth);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [datos, setDatos] = useState([
//     { data: "Eduardo Rivas Soria; vamos a ver;id: 123", mode: "Byte" },
//   ]);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     const myFunc = async () => {
//       const deviceId = Device.osInternalBuildId;
//       console.log("Device ID:", deviceId);
//     };

//     myFunc();

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanned(true);
//     const docRef = doc(FIREBASE_DB, "users", data);
//     const docSnap = await getDoc(docRef);
//     console.log(docSnap.data());
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View>
//       <View style={styles.container}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//         {scanned && (
//           <Button
//             title={"Tap to Scan Again"}
//             onPress={() => setScanned(false)}
//           />
//         )}
//       </View>
//       <QRCode value={auth.currentUser.uid} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     width: 150,
//     height: 150,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../credentials";
import { getAuth } from "firebase/auth";
import firebaseAuth from "../../credentials";
export default function Registrado() {
  const auth = getAuth(firebaseAuth);
  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    const getRegistrosUser = () => {
      const q = query(
        collection(FIREBASE_DB, "registers"),
        where("status", "==", "Activo"),
        where("user_id", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        const arrayEmpty = [];
        querySnapshot.forEach((doc) => {
          arrayEmpty.push(doc.data());
        });
        setRegistro(arrayEmpty);
      });
    };
    getRegistrosUser();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {registro.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.user}>
              <Image
                style={styles.image}
                source={{ uri: item.evento_info.eventPhoto }}
              />

              <View style={styles.userInfo}>
                <Text style={styles.title}>{item.evento_info.nombre}</Text>
                <Text style={styles.subTitle}>Descripcion:</Text>
                <Text style={styles.userText}>
                  {item.evento_info.descripcion.substring(0, 30)} ...
                </Text>
                <Text style={styles.subTitle}>
                  {/* Fecha de inicio: {item.created_at} */}
                </Text>
              </View>
            </TouchableOpacity>
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
