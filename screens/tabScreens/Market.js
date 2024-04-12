import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAuth from "../../credentials";
import { SearchBar } from "@rneui/themed";



export default function Market() {
  const [search, setSearch] = useState("");


  const auth = getAuth(firebaseAuth);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("cerrando sesion");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <ScrollView>
      <View>

        <Text onPress={handleLogOut}>Cerrar Sesion</Text>

        <SearchBar
          style={{}}
          platform="ios"
          inputStyle={{ backgroundColor: 'white' }}
          containerStyle={{
            backgroundColor: 'white',
            aspectRatio: 9, borderWidth: 3, borderRadius: 150
          }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          placeholderTextColor={'grey'}
          placeholder={'Buscar'}
          lightTheme
          onChangeText={newVal => setSearch(newVal)}
          onClearText={() => console.log(onClearText())}
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => console.log(onCancel())}
          value={search} />

        <View style={styles.containerProduct}>

          <Image
            source={{ uri: 'https://i.pinimg.com/564x/82/da/d6/82dad60343b1015e3cf4bbf8d1231cd8.jpg' }}
            style={styles.imageProduct}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productText}>Italika</Text>
            <Text style={styles.productText}>$150,000</Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={{ marginTop: -5 }}> Contactar al vendedor</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.boxContainer}>
          <View style={styles.contRow}>
            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contRow}>
            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contRow}>
            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerCard}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
                source={{ uri: 'https://i.pinimg.com/564x/fc/0c/f4/fc0cf416dc10d5459d5a7ace49544660.jpg' }}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.productTextCard}>Italika</Text>
                <Text style={styles.productTextCard}>$150,000</Text>
                <TouchableOpacity style={styles.contactButtonCard}>
                  <Text style={{ marginTop: -5 }}> Contactar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerProduct: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: 'white'
  },
  imageProduct: {
    width: '45%',
    aspectRatio: 1,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10

  },
  productText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: "left",
    textAlignVertical: 'top'
  },
  contactButton: {
    padding: 6,
    margin: 6,
    borderWidth: 3,
    borderRadius: 6,
    alignItems: 'center',
    borderColor: 'grey'
  },
  containerCard: {
    width: '48%',
    flexDirection: 'column',
    padding: 5,
    margin: 5,
    alignItems: "center",
    backgroundColor: 'white'
  },
  cardInfo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  productTextCard: {
    fontWeight: "bold",
    fontStyle: 'italic',
    fontSize: 14,
    padding: 6
  },
  contactButtonCard: {
    padding: 9,
    margin: 15,
    borderWidth: 3,
    borderRadius: 6,
    alignItems: 'center',
    borderColor: 'grey'
  },
  boxContainer: {
    width: '100%',
    height: '85%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})