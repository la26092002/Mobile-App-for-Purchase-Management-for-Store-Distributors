import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { DataTable,Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { database } from '../../Model/database';
import { useDataContext } from '../../Context/DataContext';

export default function ProduitSelect() {
  const { state, dispatch } = useDataContext();
  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let products = await database.getProducts(db);
        
        dispatch({
          type: "getTheProduct",
          payload: products,
        });
        // console.log(await database.getFournisseur(db))
      } catch (error) {
        console.error("Error select products:", error);
      }
    }
    load();
  }, []);
  return (
    <>
      
        
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Prix</DataTable.Title>
              <DataTable.Title>Categorie</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {state.TheProducts.map((product) => (
            <DataTable.Row key={product.id_produit}>
              <DataTable.Cell>{product.nom_produit}</DataTable.Cell>
              <DataTable.Cell>{product.prix_produit}</DataTable.Cell>
              <DataTable.Cell>{product.id_category}</DataTable.Cell>
              
              <DataTable.Cell>
                <Button
                  icon="eyedropper-variant"
                  mode="text"
                  onPress={() => alert("Pressed")}
                >
                  Modifier
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
))}
          </DataTable>
        
    </>
  )
}


const styles = StyleSheet.create({
    Card: {
      marginHorizontal: 10
    },
    scrollView: {
      marginHorizontal: 10,
      height: hp(70),
    },
  });