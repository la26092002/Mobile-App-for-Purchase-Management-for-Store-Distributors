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

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="account-hard-hat" />
);
export default function CardModifier({selectedFournisseur}) {
  const [name, setName] = useState("")
  useEffect(() => {
      console.log(selectedFournisseur.id_fournisseur)
      console.log(selectedFournisseur.nom_fournisseur)
      setName(selectedFournisseur.nom_fournisseur)
    
  }, [selectedFournisseur])
  
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
          <Button >Cancel</Button>
          <Button onPress={modifierFournisseur} >Modifier</Button>
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
