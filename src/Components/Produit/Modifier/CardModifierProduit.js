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
  useTheme,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from '@expo/vector-icons';
import { useDataContext } from "../../../Context/DataContext";
import { database } from "../../../Model/database";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="account-hard-hat" />
);

export default function CardModifierProduit({item,setVisible,selectedProduct}) {
  const { state, dispatch } = useDataContext();
  let theme = useTheme();

  const [category, setCategory] = useState("");
  const [idCategory, setIdCategory] = useState(null);
  
  const [id_produit, setId_produit] = useState(selectedProduct.id_produit);
  const [name, setName] = useState(selectedProduct.nom_produit);
  const [price, setPrice] = useState(""+selectedProduct.prix_produit);

  useEffect(() => {
    console.log(selectedProduct)
  }, [])
  
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

  let modifierProduit = async () => {
    //console.log("hhh",id_produit ,idCategory, category,name,price);
    //console.log(selectedProduct);
    //modifierProduit = async (db, id_produit, nom_produit, prix_produit, id_category)
    try {
      if (category.length>0 && name.length>0 && price.length>0) {
        let db = await database.openDatabase();
        let products = await database.modifierProduit(db, id_produit, name, price, idCategory);
  
        let newProduct = {
          "id_produit": id_produit,
         "nom_category": category,
          "nom_produit": name, 
          "prix_produit": price
        }
          dispatch({ type: "updateTheProduct", payload: { item, newProduct } });

        console.log(state.TheProducts)
        //update in context
        setVisible(false)
      }
     
    } catch (error) {
      console.error("Error select products:", error);
    }
  };

  let supprimmerProduit = async () => {
    //console.log("hhh",id_produit ,idCategory, category,name,price);
    //console.log(selectedProduct);
    //modifierProduit = async (db, id_produit, nom_produit, prix_produit, id_category)
    try {
        let db = await database.openDatabase();
        let products = await database.suprimmerProduit(db, id_produit);
  
       
        dispatch({ type: "removeTheProduct", payload: item });

        console.log(state.TheProducts)
        //update in context
        setVisible(false)
     
    } catch (error) {
      console.error("Error select products:", error);
    }
  };

  
  return (
    <View>
      <Card style={styles.Card}>
        <Card.Title title="Modifier un Produit" left={LeftContent} />
        
        <TextInput
          label="Nom"
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Prix"
          value={price}
          style={styles.input}
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
        
          <Button onPress={supprimmerProduit}>supprimmer</Button>
          <Button onPress={modifierProduit}>Modifier</Button>
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
});
