import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DataTable } from "react-native-paper";
import { database } from "../Model/database";
import { useDataContext } from "../Context/DataContext";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="account-hard-hat" />
);

export default function Fournisseur() {
  const [fournis, setFournis] = React.useState(false);
  const [name, setName] = React.useState("");

  const [data, setData] = React.useState([]);
  const { state, dispatch } = useDataContext();
  let ajouterFournisseur = async () => {
    if (name.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertFournisseur(db, name);
        data.push({ id_fournisseur: reslt, nom_fournisseur: name });
        dispatch({
          type: "addProduct",
          payload: { id_fournisseur: reslt, nom_fournisseur: name },
        });
        //console.log(reslt)
        setName("");
      } catch (error) {
        console.error("Error inserting fournisseur:", error);
      }
    }
  };

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let fournisseurs = await database.getFournisseur(db);
        setData(fournisseurs);
        dispatch({
          type: "getProducts",
          payload: fournisseurs,
        });
        // console.log(await database.getFournisseur(db))
      } catch (error) {
        console.error("Error select fournisseur:", error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    console.log(state.products);
  }, [state.products]);

  return (
    <View>
      {!fournis && (
        <Button onPress={() => setFournis(true)}>Ajouter Fournisseur</Button>
      )}
      {fournis && (
        <Card style={styles.Card}>
          <Card.Title title="Ajouter un Fournisseur" left={LeftContent} />
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Card.Actions>
            <Button onPress={() => setFournis(false)}>Cancel</Button>
            <Button onPress={ajouterFournisseur}>Ajouter</Button>
          </Card.Actions>
        </Card>
      )}

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {state.products.map((fournisseur) => (
              <DataTable.Row key={fournisseur.id_fournisseur}>
                <DataTable.Cell>{fournisseur.nom_fournisseur}</DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    icon="eyedropper-variant"
                    mode="text"
                    onPress={() => alert("Pressed")}
                  >
                    Modifier
                  </Button>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button
                    icon="eyedropper-variant"
                    mode="text"
                    onPress={() => alert("Pressed")}
                  >
                    Vente
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    marginHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    height: hp(50),
  },
});
