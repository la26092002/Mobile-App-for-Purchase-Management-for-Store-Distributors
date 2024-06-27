import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  DataTable,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../../Model/database";
import { useDataContext } from "../../Context/DataContext";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="package-variant-closed" />
);
export default function PackSelect() {
  const { state, dispatch } = useDataContext();

  const [name, setName] = React.useState("");
  const [quantite, setQuantite] = React.useState("");
  const [prix, setPrix] = React.useState("");

  let theme = useTheme();
  const [produit, setProduit] = useState("");
  const [idProduit, setIdProduit] = useState(null);

  const [pack, setPack] = useState(true);

  let ajouterPack = async () => {
    if (idProduit !== null && quantite.length > 0 && prix.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertPack(db, idProduit, quantite, prix);
        //data.push({ id_fournisseur: reslt+1, nom_fournisseur: name });
        dispatch({
          type: "addPack",
          payload: {
            id_pack: reslt,
            nom_produit: produit,
            quantite_pack: quantite,
            prix: prix,
          },
        });
        //console.log(reslt)
        setName("");
        setQuantite("");
        setPrix("");
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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nom_produit}</Text>
        {item.nom_produit === produit && (
          <MaterialIcons name="category" size={20} color="black" />
        )}
      </View>
    );
  };

  let supprimmerPack = async (index,id_pack) => {
    //console.log("hhh",id_produit ,idCategory, category,name,price);
    //console.log(selectedProduct);
    //modifierProduit = async (db, id_produit, nom_produit, prix_produit, id_category)
    try {
        let db = await database.openDatabase();
        let pack = await database.suprimmerPack(db, id_pack);
  
       
      //  dispatch({ type: "removeTheProduct", payload: item });

        // Update the state and context
        dispatch({
          type: "removePack",
          payload: index,
        });
        console.log(state.pack)
        //update in context
        //setVisible(false)
     
    } catch (error) {
      console.error("Error select products:", error);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.Bodyiew}>
        <ScrollView style={styles.scrollView}>
          {pack && <Button onPress={() => setPack(!pack)}>Ajouter Pack</Button>}
          {!pack && (
            <Card style={styles.Card}>
              <Card.Title title="Ajouter un Pack" left={LeftContent} />

              <Dropdown
                style={[
                  styles.dropdown,
                  { backgroundColor: theme.colors.surfaceVariant },
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
                placeholder={
                  produit.length > 0 ? produit : "Sélectionner le Produit"
                }
                searchPlaceholder="Search..."
                value={produit}
                onChange={(item) => {
                  setProduit(item.nom_produit);
                  setIdProduit(item.id_produit);
                }}
                renderLeftIcon={() => (
                  <MaterialIcons name="category" size={20} color="black" />
                )}
                renderItem={renderItem}
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
                <Button onPress={() => setPack(!pack)}>Cancel</Button>
                <Button onPress={ajouterPack}>Ajouter</Button>
              </Card.Actions>
            </Card>
          )}


          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Quantite</DataTable.Title>

              <DataTable.Title>Prix</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {state.pack.map((pack, index) => (
              <DataTable.Row key={pack.id_pack}>
                <DataTable.Cell>{pack.nom_produit} </DataTable.Cell>
                <DataTable.Cell>{pack.quantite_pack}</DataTable.Cell>
                <DataTable.Cell>{pack.prix}</DataTable.Cell>

                <DataTable.Cell>
                  <Button
                    icon="eyedropper-variant"
                    mode="text"
                    onPress={() => supprimmerPack(index, pack.id_pack)}
                  >
                    Suprimmer
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
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});
