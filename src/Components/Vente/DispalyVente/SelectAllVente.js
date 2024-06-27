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

  const [item, setItem] = useState(null);
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

  const showModal = (vente, index) => {
    setItem(index);
    setSelectedVente(vente);
    setVisible(true);
  };

  const showModifierModal = (vente) => {
    dispatch({
      type: "Modifier",
      payload: vente,
    });
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





  const save = async () => {
    try {
      let packs = JSON.parse(state.Modifier.packs)
      let totalPrixPacks = packs.reduce((sum, pack) => {
        const prix = parseFloat(pack.prix);
        const quantite = parseFloat(pack.quantitePack);
        if (!isNaN(prix)) {
          return sum + (prix*quantite);
        } else {
          console.error(`Invalid price for pack ${pack.idPack}: ${pack.prix}`);
          return sum;
        }
      }, 0);
      let produits = JSON.parse(state.Modifier.produits)
      let totalPrixProducts = produits.reduce((sum, produit) => {
        const prix = parseFloat(produit.prix);
        const quantite = parseFloat(produit.quantiteProduct);
        if (!isNaN(prix)) {
          return sum + (prix*quantite);
        } else {
          console.error(`Invalid price for pack ${pack.idPack}: ${pack.prix}`);
          return sum;
        }
      }, 0);
      let db = await database.openDatabase();
      await database.modifierVente(
        db,
        state.Modifier.packs,
        state.Modifier.produits,
        totalPrixProducts+totalPrixPacks,
        state.Modifier.id_fournisseur,
        state.Modifier.id_vente
      );

      dispatch({
        type: "UpdateAllVentes",
        payload: {
          item,
          prixTotal:totalPrixProducts+totalPrixPacks,
          packs: state.Modifier.packs,
          produits: state.Modifier.produits,
        },
      });


      setModifierVisible(false);

      console.log("yes : ");
    } catch (error) {
      console.error("Error update vente:", error);
    }
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
              <Text>Vente ID: {selectedVente?.id_vente}</Text>
              <Text>Nom Fournisseur: {selectedVente?.nom_fournisseur}</Text>
              <Text>Prix Total: {selectedVente?.prixTotal}</Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Pack</DataTable.Title>
                  <DataTable.Title>Quantité</DataTable.Title>
                </DataTable.Header>
                {(() => {
                  try {
                    const packs = JSON.parse(selectedVente?.packs || "[]");
                    if (packs.length > 0) {
                      return packs.map((item, index) => (
                        <DataTable.Row key={index}>
                          <DataTable.Cell>{item.nomPack}</DataTable.Cell>
                          <DataTable.Cell>{item.quantitePack}</DataTable.Cell>
                        </DataTable.Row>
                      ));
                    } else {
                      return (
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
                      );
                    }
                  } catch (error) {
                    return (
                      <DataTable.Row>
                        <DataTable.Cell>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>Erreur de chargement des packs</Text>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }
                })()}
              </DataTable>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Produit</DataTable.Title>
                  <DataTable.Title>Quantité</DataTable.Title>
                </DataTable.Header>
                {(() => {
                  try {
                    const produits = JSON.parse(
                      selectedVente?.produits || "[]"
                    );
                    if (produits.length > 0) {
                      console.log(produits);
                      return produits.map((item, index) => (
                        <DataTable.Row key={index}>
                          <DataTable.Cell>{item.nomProduit}</DataTable.Cell>
                          <DataTable.Cell>
                            {item.quantiteProduct}
                          </DataTable.Cell>
                        </DataTable.Row>
                      ));
                    } else {
                      return (
                        <DataTable.Row>
                          <DataTable.Cell>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text>Aucun produit disponible</Text>
                            </View>
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    }
                  } catch (error) {
                    return (
                      <DataTable.Row>
                        <DataTable.Cell>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>Erreur de chargement des produits</Text>
                          </View>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }
                })()}
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
              <ModifierAddVente selectedVente={selectedVente} />
              <ModifierSelectVente selectedVente={selectedVente} />
              <Button onPress={() => save()}>Save</Button>
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
        {state.AllVentes.map((vente, index) => (
          <DataTable.Row key={vente.id_vente}>
            <DataTable.Cell>{vente.nom_fournisseur}</DataTable.Cell>
            <DataTable.Cell>{vente.prixTotal}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eyedropper-variant"
                mode="text"
                onPress={() => showModal(vente, index)}
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
