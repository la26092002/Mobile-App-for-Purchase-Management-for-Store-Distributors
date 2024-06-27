import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput, shadow, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useDataContext } from "../../../Context/DataContext";

export default function ModifierAddVente() {

  const { state, dispatch } = useDataContext();
  const theme = useTheme();

  const [idproduct, setIdProduct] = useState(null);
  const [idPack, setIdPack] = useState(null);
  const [quantitePack, setQuantitePack] = useState("");
  const [quantiteProduct, setQuantiteProduct] = useState("");

  const [nomProduitSelect, setNomProduitSelect] = useState("");
  const [prixProduitSelect, setPrixProduitSelect] = useState(null);

  const [nomPackSelect, setNomPackSelect] = useState("");
  const [prixPackSelect, setPrixPackSelect] = useState(null);



  useEffect(() => {
    console.log("state : ",state.AllVentes)
  }, [])

 {
  /*
   {"id_fournisseur": 2,
   "id_vente": 1,
    "nom_fournisseur": "Moh",
     "packs": "",
     "prixTotal": "100", 
     "produits": "",
   "status": 0}
  */
 }
  const ajouterPack = async () => {
    if (quantitePack.length > 0 && idPack != null) {
      try {
        const packs = state.Modifier && state.Modifier.packs ? JSON.parse(state.Modifier.packs) : [];
        
        // Create the new pack object
        const newPack = {
          idPack,
          quantitePack,
          nomPack: nomPackSelect,
          prix: prixPackSelect
        };
        
        // Push the new pack object into the packs array
        packs.push(newPack);
        dispatch({
          type: "ModifieraddVentePack",
          payload: JSON.stringify(packs)
        });
        setQuantitePack("");
        setIdPack(null);
      } catch (error) {
        console.error("Error inserting produit:", error);
      }
    } else {
      console.log("Invalid input: Please provide both pack and quantity.");
    }
  };

  const ajouterProduits = async () => {
    if (quantiteProduct.length > 0 && idproduct != null) {
      try {
        const produits = state.Modifier && state.Modifier.produits ? JSON.parse(state.Modifier.produits) : [];

        const newProduit = {
          idproduct,
            quantiteProduct,
            nomProduit: nomProduitSelect,
            prix: prixProduitSelect,
        };
        produits.push(newProduit);
        dispatch({
          type: "ModifieraddVenteProduit",
          payload: JSON.stringify(produits),
        });
        setQuantiteProduct("");
        setIdProduct(null);
      } catch (error) {
        console.error("Error inserting produit:", error);
      }
    } else {
      console.log("Invalid input: Please provide both pack and quantity.");
    }
  };

  const renderItem = (item) => (
    <View style={styles.itemR}>
      <Text style={styles.textItem}>{item.nom_produit}</Text>
      {item.id_pack === idPack && (
        <MaterialIcons name="category" size={20} color="black" />
      )}
    </View>
  );

  const renderItem2 = (item) => (
    <View style={styles.itemR}>
      <Text style={styles.textItem}>{item.nom_produit}</Text>
      {item.id_produit === idproduct && (
        <MaterialIcons name="category" size={20} color="black" />
      )}
    </View>
  );

  return (
    <>
      <View style={styles.app}>
        <Dropdown
          style={[
            styles.dropdown,
            styles.item,
            {
              backgroundColor: theme.colors.surfaceVariant,
              width: wp(46),
              borderBottomWidth: 0.7,
              borderBottomColor: theme.colors.primary,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={state.pack}
          search
          maxHeight={300}
          labelField="nom_produit"
          valueField="id_pack"
          placeholder="Pack Select"
          searchPlaceholder="Search..."
          value={idPack}
          onChange={(item) => {
            setIdPack(item.id_pack);
            setNomPackSelect(item.nom_produit);
            setPrixPackSelect(item.prix);
          }}
          renderLeftIcon={() => (
            <MaterialIcons name="category" size={20} color="black" />
          )}
          renderItem={renderItem}
        />
        <TextInput
          style={styles.item}
          label="Quantite Pack"
          value={quantitePack}
          onChangeText={setQuantitePack}
        />
      </View>
      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        icon="plus"
        mode="contained"
        onPress={ajouterPack}
      >
        Add Pack
      </Button>

      <View style={styles.app}>
        <Dropdown
          style={[
            styles.dropdown,
            styles.item,
            {
              backgroundColor: theme.colors.surfaceVariant,
              width: wp(46),
              borderBottomWidth: 0.7,
              borderBottomColor: theme.colors.primary,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={state.TheProducts}
          search
          maxHeight={300}
          labelField="nom_produit"
          valueField="id_produit"
          placeholder="Produit Select"
          searchPlaceholder="Search..."
          value={idproduct}
          onChange={(item) => {
            setIdProduct(item.id_produit);
            setNomProduitSelect(item.nom_produit);
            setPrixProduitSelect(item.prix_produit);
          }}
          renderLeftIcon={() => (
            <MaterialIcons name="category" size={20} color="black" />
          )}
          renderItem={renderItem2}
        />
        <TextInput
          style={styles.item}
          label="Quantite Produit"
          value={quantiteProduct}
          onChangeText={setQuantiteProduct}
        />
      </View>
      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        icon="plus"
        mode="contained"
        onPress={ajouterProduits}
      >
        Add Produit
      </Button>
    </>
  );
}

const styles = {
  app: {
    marginHorizontal: "auto",
    width: wp(92),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    minWidth: wp(46),
    maxWidth: wp(46),
  },
  dropdown: {
    margin: 0,
    height: 60,
    borderRadius: 5,
    padding: 12,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  itemR: {
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
    border: 0,
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
};
