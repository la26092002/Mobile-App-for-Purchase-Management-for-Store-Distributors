import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, Avatar, Button, Card, Text, TextInput, Modal, Portal, Provider as PaperProvider } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from '../../Model/database';
import { useDataContext } from '../../Context/DataContext';
import CardModifierProduit from './Modifier/CardModifierProduit';

export default function ProduitSelect() {
  const { state, dispatch } = useDataContext();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [item, setItem] = useState(null);
  
  const showModal = (product,index) => {
    setSelectedProduct(product);
    setItem(index)

    setVisible(true);
  };
  const hideModal = () => setVisible(false);

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
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          {selectedProduct && (
            <>
              <CardModifierProduit item={item} setVisible={setVisible} selectedProduct={selectedProduct}/>
            </>
          )}
        </Modal>
      </Portal>

      <DataTable style={styles.Bodyiew}>
        <DataTable.Header>
          <DataTable.Title>Nom</DataTable.Title>
          <DataTable.Title>Prix</DataTable.Title>
          <DataTable.Title>Categorie</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>
        {state.TheProducts.map((product, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{product.nom_produit}</DataTable.Cell>
            <DataTable.Cell>{product.prix_produit}</DataTable.Cell>
            <DataTable.Cell>{product.nom_category}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eyedropper-variant"
                mode="text"
                onPress={() => showModal(product,index)}
              >
                Modifier
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  input: {
    marginBottom: 10,
  },
  Card: {
    marginHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    height: hp(70),
  },
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
});
