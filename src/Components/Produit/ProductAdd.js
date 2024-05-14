import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LeftContent = (props) => <Avatar.Icon {...props} icon="archive-arrow-down-outline" />;
export default function ProductAdd({setPart}) {

    const [name, setName] = React.useState("");
  return (
    <>
      <Card style={styles.Card}>
            <Card.Title title="Ajouter un Produit" left={LeftContent} />
            <TextInput
              label="Nom"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              label="Prix"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              label="Categorie"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Card.Actions>
              <Button onPress={() => alert(name)}>Ajouter</Button>
            </Card.Actions>
          </Card>
    </>
  )
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