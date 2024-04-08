import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Rally from "./screens/tabScreens/Rally";
import Bandeja from "./screens/tabScreens/Bandeja";
import Configuracion from "./screens/tabScreens/Configuracion";
import Market from "./screens/tabScreens/Market";
import Detalles from "./screens/tabScreens/rallyStack/Detalles";
import Login from "./screens/principal/Login";
import Register from "./screens/principal/Register";
import {
  Button,
  useColorScheme,
  Pressable,
  Text,
  View,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import firebaseAuth from "./credentials";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import AñadirEvento from "./screens/tabScreens/rallyStack/AñadirEvento";
import EventRegister from "./screens/draweGroup/EventRegister";
import RallyAdmin from "./screens/tabScreens/RallyAdmin";
import EditarEvento from "./EditarEvento";
import Registrado from "./screens/draweGroup/Registrado";
import { FIREBASE_DB } from "./credentials";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const auth = getAuth(firebaseAuth);

const TopTap = createMaterialTopTabNavigator();

function TopTabGroup() {
  return (
    <TopTap.Navigator>
      <TopTap.Screen name="todos los eventos" component={Rally} />
      <TopTap.Screen name="eventos registrado" component={Registrado} />
    </TopTap.Navigator>
  );
}

function PaginaPrincipal() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

//Admin
function AdminGroup() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FAC3AE" } }}
    >
      <Stack.Screen name="Eventos Admin" component={RallyAdmin} />
      <Stack.Screen name="Detalles" component={Detalles} />
      <Stack.Screen
        name="Añadir Evento"
        component={AñadirEvento}
        options={{}}
      />
      <Stack.Screen
        name="Registro para Eventos"
        component={EventRegister}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

//Usuario
function StackGroup() {
  const [fotoPerfil, setFotoPerfil] = useState("");
  const { navigate } = useNavigation();
  const [isLogged, setIsLogged] = useState(auth.currentUser.uid);

  const getDocument = async () => {
    const docRef = doc(FIREBASE_DB, "users", `${isLogged}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFotoPerfil(docSnap.data().foto_url);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  getDocument();

  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FAC3AE" } }}
    >
      <Stack.Screen
        name="Eventos Activos"
        component={TopTabGroup}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigate("Registro para Eventos", {
                  user: isLogged,
                })
              }
            >
              {fotoPerfil == "" ? (
                <View style={{ alignContent: "center", alignItems: "center" }}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      marginBottom: 7,
                    }}
                    source={require("./assets/defaultProfile.webp")}
                  />
                </View>
              ) : (
                <View style={{ alignContent: "center", alignItems: "center" }}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      marginBottom: 7,
                    }}
                    source={{
                      uri: fotoPerfil,
                    }}
                  />
                </View>
              )}
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="Detalles" component={Detalles} />
      <Stack.Screen
        name="Añadir Evento"
        component={AñadirEvento}
        options={{}}
      />
      <Stack.Screen name="Editar evento" component={EditarEvento} />
      <Stack.Screen
        name="Registro para Eventos"
        component={EventRegister}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
//admin
const rol = "user";
//usuarios
function TabGroup() {
  if (rol == "admin") {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Eventos") {
              iconName = "motorcycle";
            } else if (route.name === "Market") {
              iconName = "shopping-cart";
            } else if (route.name === "Bandeja") {
              iconName = "folder-open";
            } else if (route.name === "Configuración") {
              iconName = "gear";
            }
            return <FontAwesome name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Market" component={Market} />
        <Tab.Screen
          name="Eventos"
          component={AdminGroup}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Bandeja" component={AñadirEvento} />
        <Tab.Screen name="Configuración" component={Configuracion} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Eventos") {
              iconName = "motorcycle";
            } else if (route.name === "Market") {
              iconName = "shopping-cart";
            } else if (route.name === "Bandeja") {
              iconName = "folder-open";
            } else if (route.name === "Configuración") {
              iconName = "gear";
            }
            return <FontAwesome name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Market" component={Market} />
        <Tab.Screen
          name="Eventos"
          component={StackGroup}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Bandeja" component={AñadirEvento} />
        <Tab.Screen name="Configuración" component={Configuracion} />
      </Tab.Navigator>
    );
  }
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  const [isLogged, setIsLogged] = useState(null);
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setIsLogged(authUser.uid);
        } else {
          setIsLogged(null);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const tipoUsuario = "admin";
  if (isLogged == null) {
    return (
      <NavigationContainer
        theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <StatusBar
          theme={currentTheme == "dark" ? DarkTheme : DefaultTheme}
        ></StatusBar>
        <PaginaPrincipal />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer
        theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <StatusBar
          theme={currentTheme == "dark" ? DarkTheme : DefaultTheme}
        ></StatusBar>
        <TabGroup />
      </NavigationContainer>
    );
  }
}
