import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

export default function RegistroUserEvento({ route }) {
  const auth = getAuth(firebaseAuth);
  const [registro, setRegistro] = useState();

  useEffect(() => {
    const getEvent = () => {
      const q = query(
        collection(FIREBASE_DB, "registers"),
        where("status", "==", "Activo"),
        where("evento_info.event_id", "==", route.params.data.id),
        where("user_id", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setRegistro(doc.data());
        });
      });
    };
    getEvent();
  }, []);

  async function registrarse() {
    console.log(route.params);
    await addDoc(collection(FIREBASE_DB, "registers"), {
      evento_info: {
        nombre: route.params.data.datos.eventName,
        descripcion: route.params.data.datos.eventDesc,
        eventPhoto: route.params.data.datos.eventPhoto,
        event_id: route.params.data.id,
      },
      user_id: auth.currentUser.uid,
      status: "Activo",
      created_at: new Date(),
      updated_at: new Date(),
      // created_by: "id del usuario con la sesion iniciada",
      // updated_by: "id del usuario con la sesion iniciada",
    });
  }
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "INFORMACIÓN DEL EVENTO",
    });
  });

  return (
    <ScrollView>
      <View style={styles.tarjeta}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {route.params.data.datos.eventName}
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            style={{ width: "100%", aspectRatio: 1 }}
            source={{ uri: route.params.data.datos.eventPhoto }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Descripción:</Text>
          <Text style={{ textAlign: "justify", fontSize: 15 }}>
            {route.params.data.datos.eventDesc}
          </Text>
        </View>
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}
          >
            Lugares a visitar
          </Text>
          <ScrollView
            style={{ backgroundColor: "#DDDDDD", borderRadius: 10, margin: 10 }}
            // snapToInterval={ScreenWidth}
            decelerationRate={"normal"}
            alwaysBounceHorizontal={"true"}
            horizontal
          >
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "justify", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: route.params.data.datos.eventPhoto }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Nombre del Lugar
              </Text>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            padding: 7,
            backgroundColor: "#FAC3AE",
            borderRadius: 30,
            marginTop: 15,
          }}
        >
          {route.params.data.datos.validation != "SI" ? (
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              <Text>Este evento </Text>
              <Text style={{ fontWeight: "bold" }}>ES DE ASISTENCIA UNICA</Text>
              <Text> para la entrega del certificado.</Text>
            </Text>
          ) : (
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              <Text>Este evento </Text>
              <Text style={{ fontWeight: "bold" }}>PIDE</Text>
              <Text>
                {" "}
                que se suban evidencias para poder entregar el certificado del
                evento.
              </Text>
            </Text>
          )}
        </View>
        {/* <View
              style={{
                padding: 7,
                backgroundColor: "#FAC3AE",
                marginTop: 5,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 14, textAlign: "center" }}>
                <Text>Este evento </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {route.params.data.datos.validation}
                </Text>
                <Text>
                  {" "}
                  pide que se suban evidencias para poder entregar el certificado
                  del evento.
                </Text>
              </Text>
            </View> */}
        {registro != null ? (
          <View>
            <Text>USTED YA ESTA REGISTRADO PARA ESTE EVENTO</Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                registrarse();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                REGISTRARSE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    elevation: 1,
    backgroundColor: "white",
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
    marginTop: 15,
  },
  boton: {
    borderRadius: 100,
    width: 170,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#f15a24",
  },
});