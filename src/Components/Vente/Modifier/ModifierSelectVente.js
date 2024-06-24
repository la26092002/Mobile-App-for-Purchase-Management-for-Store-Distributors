import { View } from "react-native";
import { DataTable, Button, Text } from "react-native-paper";
import React, { useEffect } from "react";
import { useDataContext } from "../../../Context/DataContext";

export default function ModifierSelectVente() {
  const { state, dispatch } = useDataContext();

  const packs = state.Modifier && state.Modifier.packs ? JSON.parse(state.Modifier.packs) : [];
  const produits = state.Modifier && state.Modifier.produits ? JSON.parse(state.Modifier.produits) : [];

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pack</DataTable.Title>
          <DataTable.Title>Quantité</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {packs.length > 0 ? (
          packs.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.nomPack}</DataTable.Cell>
              <DataTable.Cell>{item.quantitePack}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="delete"
                  onPress={() => {
                    dispatch({ type: "deleteVentePack", payload: index });
                  }}
                >
                  Supprimer
                </Button>
              </DataTable.Cell>
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
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {produits.length > 0 ? (
          produits.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.nomProduit}</DataTable.Cell>
              <DataTable.Cell>{item.quantiteProduct}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="delete"
                  onPress={() => {
                    dispatch({ type: "deleteVenteProduit", payload: index });
                  }}
                >
                  Supprimer
                </Button>
              </DataTable.Cell>
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
    </>
  );
}
