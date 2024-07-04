import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  DataTable,
  Modal,
  Portal,
  Text,
  Provider as PaperProvider,
  Card,
  Avatar,TextInput,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../Model/database";
import { useDataContext } from "../Context/DataContext";
import CardModifier from "../Components/Fournisseur/Modifier/CardModifier";

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
       // data.push({ id_fournisseur: reslt, nom_fournisseur: name });
        dispatch({
          type: "addProduct",
          payload: { id_fournisseur: reslt, nom_fournisseur: name },
        });
        setName("");
      } catch (error) {
        console.error("Error inserting fournisseur:", error);
      }
    }
  };

  const [modifierVisible, setModifierVisible] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);

  let Modifier = ( index,id_fournisseur, nom_fournisseur) => {
    console.log("Modifier called with:", { id_fournisseur, nom_fournisseur });
    setSelectedFournisseur({ index,id_fournisseur, nom_fournisseur });
    setModifierVisible(true);
  };
  

  const hideModifierModal = () => {
    setModifierVisible(false);
  };

  const save = () => {
    // Implement the save logic here
    setModifierVisible(false);
  };

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let fournisseurs = await database.getFournisseur(db);
        //setData(fournisseurs);
        dispatch({
          type: "getProducts",
          payload: fournisseurs,
        });
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
    <PaperProvider>
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

        <Portal>
          <Modal
            visible={modifierVisible}
            onDismiss={hideModifierModal}
            contentContainerStyle={styles.containerStyle}
          >
            <ScrollView>
              <CardModifier setModifierVisible={setModifierVisible} selectedFournisseur={selectedFournisseur} />
            </ScrollView>
          </Modal>
        </Portal>

        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Action</DataTable.Title>
              </DataTable.Header>

              {state.products.map((fournisseur,index) => (
                <DataTable.Row key={fournisseur.id_fournisseur}>
                  <DataTable.Cell>{fournisseur.nom_fournisseur}</DataTable.Cell>
                  <DataTable.Cell>
                    <Button
                      icon="eyedropper-variant"
                      mode="text"
                      onPress={() =>
                        Modifier(
                          index,
                          fournisseur.id_fournisseur,
                          fournisseur.nom_fournisseur
                        )
                      }
                    >
                      Modifier
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  Card: {
    marginHorizontal: 0,
  },
  scrollView: {
    marginHorizontal: 10,
    height: hp(50),
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  },
});
