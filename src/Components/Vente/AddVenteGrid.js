import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useDataContext } from "../../Context/DataContext";

export default function AddVenteGrid() {
  const { state, dispatch } = useDataContext();
  const theme = useTheme();

  const [idproduct, setIdProduct] = useState(null);
  const [idPack, setIdPack] = useState(null);
  const [quantitePack, setQuantitePack] = useState("");
  const [quantiteProduct, setQuantiteProduct] = useState("");


  useEffect(() => {
    console.log("state.TheProducts: ", state.TheProducts);  // Check if pack data is loaded correctly
  }, [state.TheProducts]);


  const ajouterPack = async () => {
    if (quantitePack.length > 0 && idPack != null) {
      try {
        dispatch({
          type: "addVentePack",
          payload: { idPack, quantitePack }
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
    console.log("ajouterProduits function called");
    console.log(`idproduct: ${idproduct}, quantiteProduct: ${quantiteProduct}`);
    if (quantiteProduct.length > 0 && idproduct != null) {
      try {
        dispatch({
          type: "addVenteProduit",
          payload: { idproduct, quantiteProduct },
        });
        alert("Product added successfully");
        console.log(`Product added: ${idproduct}/${quantiteProduct}`);
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
            { backgroundColor: theme.colors.surfaceVariant, width: wp(46) },
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
          onChange={(item) => setIdPack(item.id_pack)}
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
            { backgroundColor: theme.colors.surfaceVariant, width: wp(46) },
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
          onChange={(item) => setIdProduct(item.id_produit)}
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
