import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../../Model/database";
import { useDataContext } from "../../Context/DataContext";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="package-variant-closed" />
);
export default function PackSelect() {
  const { state, dispatch } = useDataContext();

  const [name, setName] = React.useState("");
  const [quantite, setQuantite] = React.useState("");
  const [prix, setPrix] = React.useState("");

  let ajouterPack = async () => {
    if (name.length > 0 && quantite.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertPack(db, name, quantite,prix);
        //data.push({ id_fournisseur: reslt+1, nom_fournisseur: name });
        dispatch({
          type: "addPack",
          payload: {
            id_pack: reslt,
            nom_pack: name,
            quantite_pack: quantite,
            prix: prix,
          },
        });
        //console.log(reslt)
        setName("");
        setQuantite("");
        setPrix("")
      } catch (error) {
        console.error("Error inserting fournisseur:", error);
      }
    }
  };

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let packs = await database.getPacks(db);
        //setData(categories);
        dispatch({
          type: "getPack",
          payload: packs,
        });
        // console.log(await database.getFournisseur(db))
      } catch (error) {
        console.error("Error Get packs:", error);
      }
    }
    load();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.Bodyiew}>
        <ScrollView style={styles.scrollView}>
          <Card style={styles.Card}>
            <Card.Title title="Ajouter un Pack" left={LeftContent} />
            <TextInput
              label="Nom de Pack"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              label="Quantite"
              value={quantite}
              onChangeText={(text) => setQuantite(text)}
            />

            <TextInput
              label="Prix"
              value={prix}
              onChangeText={(text) => setPrix(text)}
            />

            <Card.Actions>
              <Button onPress={ajouterPack}>Ajouter</Button>
            </Card.Actions>
          </Card>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Quantite</DataTable.Title>

              <DataTable.Title>Prix</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {state.pack.map((pack, index) => (
              <DataTable.Row key={pack.id_pack}>
                <DataTable.Cell>{pack.nom_pack} </DataTable.Cell>
                <DataTable.Cell>{pack.quantite_pack}</DataTable.Cell>
                <DataTable.Cell>{pack.prix}</DataTable.Cell>

                <DataTable.Cell>
                  <Button
                    icon="eyedropper-variant"
                    mode="text"
                    onPress={() => alert("Pressed")}
                  >
                    Modifier
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});
