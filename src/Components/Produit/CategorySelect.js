import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../../Model/database";
import { useDataContext } from "../../Context/DataContext";

const LeftContent = (props) => <Avatar.Icon {...props} icon="shape" />;
export default function CategorySelect({}) {
  const [name, setName] = React.useState("");
  const [categorieStatus, setCategorieStatus] = React.useState(true);

  const { state, dispatch } = useDataContext();
  async function addCategorie() {
    if (name.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertCategorie(db, name);
        //data.push({ id_fournisseur: reslt+1, nom_fournisseur: name });
        dispatch({
          type: "addCategorie",
          payload: { id_category: reslt, nom_category: name },
        });
        //console.log(reslt)
        setName("");
      } catch (error) {
        console.error("Error inserting Category:", error);
      }
    }
  }

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let categories = await database.getCategories(db);
        //setData(categories);
        dispatch({
          type: "getCategories",
          payload: categories,
        });
        // console.log(await database.getFournisseur(db))
      } catch (error) {
        console.error("Error inserting fournisseur:", error);
      }
    }
    load();
  }, []);


  let supprimmerCategorie = async (index,id_category) => {
    //console.log("hhh",id_produit ,idCategory, category,name,price);
    //console.log(selectedProduct);
    //modifierProduit = async (db, id_produit, nom_produit, prix_produit, id_category)
    try {
        let db = await database.openDatabase();
        let pack = await database.suprimmerCategory(db, id_category);
  
       
      //  dispatch({ type: "removeTheProduct", payload: item });

        // Update the state and context
        dispatch({
          type: "removeCategorie",
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
          {categorieStatus && (
            <Button onPress={() => setCategorieStatus(!categorieStatus)}>
              Ajouter Produit
            </Button>
          )}
          {!categorieStatus && (
            <Card style={styles.Card}>
              <Card.Title title="Ajouter une Categorie" left={LeftContent} />
              <TextInput
                label="Nom de Categorie"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <Card.Actions>
                <Button onPress={() => setCategorieStatus(!categorieStatus)}>
                  Cancel
                </Button>
                <Button onPress={addCategorie}>Ajouter</Button>
              </Card.Actions>
            </Card>
          )}

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Categorie</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {state.category.map((category, index) => (
              <DataTable.Row key={category.id_category}>
                <DataTable.Cell>{category.nom_category}</DataTable.Cell>

                <DataTable.Cell>
                  <Button
                    icon="eyedropper-variant"
                    mode="text"
                    onPress={() => supprimmerCategorie(index,category.id_category)}
                  >
                    Supprimer
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
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});
