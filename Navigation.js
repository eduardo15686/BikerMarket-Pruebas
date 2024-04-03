import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Rally from "./screens/tabScreens/Rally";
import Bandeja from "./screens/tabScreens/Bandeja";
import Configuracion from "./screens/tabScreens/Configuracion";
import Market from "./screens/tabScreens/Market";
import Detalles from "./screens/tabScreens/rallyStack/Detalles";
import Login from "./screens/principal/Login";
import Register from "./screens/principal/Register";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const auth = getAuth(firebaseAuth);

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
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FAC3AE" } }}
    >
      <Stack.Screen name="Eventos Activos" component={Rally} />
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
  const [isLogged, setIsLogged] = useState(auth.currentUser.uid);

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
