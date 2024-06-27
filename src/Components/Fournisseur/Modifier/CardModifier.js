import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  DataTable,
  Modal,
  Portal,
  Text,
  Provider as PaperProvider,
  Card,
  Avatar,
  TextInput,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../../../Model/database";
import { useDataContext } from "../../../Context/DataContext";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="account-hard-hat" />
);
export default function CardModifier({
  setModifierVisible,
  selectedFournisseur,
}) {
  const [name, setName] = useState("");

  const { state, dispatch } = useDataContext();
  useEffect(() => {
    console.log(selectedFournisseur.id_fournisseur);
    console.log(selectedFournisseur.nom_fournisseur);
    setName(selectedFournisseur.nom_fournisseur);

    console.log(state.products);
  }, [selectedFournisseur]);

  let modifierFournisseur = async () => {
    console.log("hhh");
    try {
      if (name.length > 0) {
        let db = await database.openDatabase();
        let fournisseur = await database.updateFournisseur(
          db,
          selectedFournisseur.id_fournisseur,
          name
        );
        dispatch({
          type: "updateFournisseur",
          payload: {
            index: selectedFournisseur.index,
            id_fournisseur: selectedFournisseur.id_fournisseur,
            name,
          },
        });
        setModifierVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let supprimmerFournisseur = async () => {
    try {
      let db = await database.openDatabase();
      let fournisseur = await database.suprimmerFournisseur(
        db,
        selectedFournisseur.id_fournisseur
      );

      dispatch({
        type: "removeFournisseur",
        payload: selectedFournisseur.index,
      });
      setModifierVisible(false);
    } catch (error) {
      console.error("Error select products:", error);
    }
  };
  return (
    <View>
      <Card style={styles.Card}>
        <Card.Title title="Modifier un Fournisseur" left={LeftContent} />
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Card.Actions>
          <Button onPress={() => supprimmerFournisseur()}>Supprimer</Button>
          <Button onPress={() => modifierFournisseur()}>Modifier</Button>
        </Card.Actions>
      </Card>
    </View>
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
