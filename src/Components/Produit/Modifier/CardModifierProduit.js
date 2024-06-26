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

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="account-hard-hat" />
);

export default function CardModifierProduit({selectedProduct}) {
  const { state, dispatch } = useDataContext();
  let theme = useTheme();

  const [category, setCategory] = useState("");
  const [idCategory, setIdCategory] = useState(null);
  const [name, setName] = useState(selectedProduct.nom_produit);
  const [price, setPrice] = useState(""+selectedProduct.prix_produit);

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

  let modifierFournisseur = () => {
    console.log("hhh", idCategory, category,name,price);
    console.log(selectedProduct);
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
          <Button onPress={modifierFournisseur}>Modifier</Button>
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
