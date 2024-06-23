import React, { useEffect, useState } from "react";
import {
  Button,
  DataTable,
  Modal,
  Portal,
  Text,
  PaperProvider,
  Card,
  Avatar,
} from "react-native-paper";
import { useDataContext } from "../../../Context/DataContext";
import { database } from "../../../Model/database";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ModifierVente from "../Modifier/ModifierSelectVente";
import ModifierAddVente from "../Modifier/ModifierAddVente";
import ModifierSelectVente from "../Modifier/ModifierSelectVente";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="archive-arrow-down-outline" />
);

export default function SelectAllVente() {
  const { state, dispatch } = useDataContext();
  const [visible, setVisible] = useState(false);
  const [modifierVisible, setModifierVisible] = useState(false);

  const [selectedVente, setSelectedVente] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let ventes = await database.getVentes(db);
        console.log("Fetched Ventes:", ventes); // Debug fetched data
        dispatch({
          type: "getToAllVentes",
          payload: ventes,
        });
      } catch (error) {
        console.error("Error select ventes:", error);
      }
    }
    load();
  }, [dispatch]);

  const showModal = (vente) => {
    console.log("Show Modal for Vente:", vente); // Debug vente data
    setSelectedVente(vente);
    setVisible(true);
  };

  const showModifierModal = (vente) => {
    console.log("Show Modifier Modal for Vente:", vente); // Debug vente data
    setSelectedVente(vente);
    setModifierVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedVente(null);
  };

  const hideModifierModal = () => {
    setModifierVisible(false);
    setSelectedVente(null);
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Card style={styles.Card}>
              <Card.Title title="Afficher une Vente" left={LeftContent} />
              <Text>Details for Vente ID: {selectedVente?.id_vente}</Text>
              <Text>Nom Fournisseur: {selectedVente?.nom_fournisseur}</Text>
              <Text>Prix Total: {selectedVente?.prixTotal}</Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Pack</DataTable.Title>
                  <DataTable.Title>Quantité</DataTable.Title>
                </DataTable.Header>

                {selectedVente?.packs && selectedVente?.packs.length > 0 ? (
                  JSON.parse(selectedVente.packs).map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{item.nomPack}</DataTable.Cell>
                      <DataTable.Cell>{item.quantitePack}</DataTable.Cell>
                    </DataTable.Row>
                  ))
                ) : (
                  <DataTable.Row>
                    <DataTable.Cell>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>Aucun pack disponible</Text>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Produit</DataTable.Title>
                  <DataTable.Title>Quantité</DataTable.Title>
                </DataTable.Header>

                {selectedVente?.produits &&
                selectedVente?.produits.length > 0 ? (
                  JSON.parse(selectedVente.produits).map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{item.nomProduit}</DataTable.Cell>
                      <DataTable.Cell>{item.quantiteProduct}</DataTable.Cell>
                    </DataTable.Row>
                  ))
                ) : (
                  <DataTable.Row>
                    <DataTable.Cell>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>Aucun Produit disponible</Text>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable>
              <Button onPress={hideModal}>Imprimer</Button>
              <Button onPress={hideModal}>Close</Button>
            </Card>
          </ScrollView>
        </Modal>

        <Modal
          visible={modifierVisible}
          onDismiss={hideModifierModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Card style={styles.Card}>
              <Card.Title title="Modifier une Vente" left={LeftContent} />
              <ModifierAddVente />
              <ModifierSelectVente />
              {/* Add form fields to modify the selected vente here */}
              <Button onPress={hideModifierModal}>Save</Button>
              <Button onPress={hideModifierModal}>Cancel</Button>
            </Card>
          </ScrollView>
        </Modal>
      </Portal>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nom</DataTable.Title>
          <DataTable.Title>Prix Total</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>
        {state.AllVentes.map((vente) => (
          <DataTable.Row key={vente.id_vente}>
            <DataTable.Cell>{vente.nom_fournisseur}</DataTable.Cell>
            <DataTable.Cell>{vente.prixTotal}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eyedropper-variant"
                mode="text"
                onPress={() => showModal(vente)}
              >
                Afficher
              </Button>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eyedropper-variant"
                mode="text"
                onPress={() => showModifierModal(vente)}
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
  scrollView: {
    height: hp(80),
  },
  Card: {
    marginHorizontal: wp(0),
  },
});
