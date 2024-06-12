import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper';
import { useDataContext } from "../../Context/DataContext";
import { database } from "../../Model/database";
import ProduitSelect from "./ProduitSelect";


const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="archive-arrow-down-outline" />
);


export default function ProductAdd({ setPart }) {
  const { state, dispatch } = useDataContext();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  
  const [category, setCategory] = useState("");
  const [idCategory, setIdCategory] = useState(null);

  const [produitStatus, setProduitStatus] = useState(true);
  

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nom_category}</Text>
        {item.nom_category === category && (
         <MaterialIcons name="category" size={20} color="black" />
        )}
      </View>
    );
  };

  let theme = useTheme();

  useEffect(() => {
    console.log(theme.colors.primary)
  }, [])
  

  let ajouterProduit = async () => {
    if (name.length > 0 && price.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertProduct(db, name, price, idCategory);
        console.log('Product inserted with id:', reslt);
        dispatch({
          type: "addTheProduct",
          payload: {
            id_produit: reslt,
            nom_produit: name,
            prix_produit: price,
            nom_category: category,
          },
        });
        setName("");
        setPrice("");
        setIdCategory(null);
      } catch (error) {
        console.error("Error inserting produit:", error);
      }
    }
  };



  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        {
        produitStatus && <Button onPress={() => setProduitStatus(!produitStatus)}>Ajouter Produit</Button>
       } 
       {
        !produitStatus && (
          <Card style={styles.Card}>
          <Card.Title title="Ajouter un Produit" left={LeftContent} />
          <TextInput
            label="Nom"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            label="Prix"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
          <Dropdown
            style={[styles.dropdown, { backgroundColor: theme.colors.surfaceVariant }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={state.category}
            search
            maxHeight={300}
            labelField="nom_category"
            valueField="id_category"
            placeholder={category.length > 0 ? category : "Sélectionner la Catégorie"}
            searchPlaceholder="Search..."
            value={category}
            onChange={(item) => {
              setCategory(item.nom_category);
              setIdCategory(item.id_category);
            }}
            renderLeftIcon={() => (
              <MaterialIcons name="category" size={20} color="black" />
            )}
            renderItem={renderItem}
          />
          <Card.Actions>
          <Button onPress={() => setProduitStatus(true)}>Cancel</Button>
            <Button onPress={ajouterProduit}>Ajouter</Button>
          </Card.Actions>
        </Card>
        )
       }
         
          <ProduitSelect />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
  dropdown: {
    margin: 0,
    height: 60,
    borderRadius: 0,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  scrollView: {
    marginHorizontal: 10,
    height: hp(60),
  },
});
