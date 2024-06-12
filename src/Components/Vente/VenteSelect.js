import { View } from "react-native";
import { DataTable, Button, Text } from "react-native-paper";
import React, { useEffect } from "react";
import { useDataContext } from "../../Context/DataContext";

export default function VenteSelect() {
  const { state } = useDataContext();

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Pack</DataTable.Title>
          <DataTable.Title>Quantité</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {state.Ventes.pack && state.Ventes.pack.length > 0 ? (
          state.Ventes.pack.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.idPack}</DataTable.Cell>
              <DataTable.Cell>{item.quantitePack}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="delete"
                  onPress={() => {
                    console.log(`Deleting pack with id: ${item.idPack}`);
                    // Handle the delete action here
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
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Aucun pack disponible</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>

{
  //i need this part of product to modify
}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Produit</DataTable.Title>
          <DataTable.Title>Quantité</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {state.Ventes.pack && state.Ventes.pack.length > 0 ? (
          state.Ventes.pack.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.idPack}</DataTable.Cell>
              <DataTable.Cell>{item.quantitePack}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="delete"
                  onPress={() => {
                    console.log(`Deleting pack with id: ${item.idPack}`);
                    // Handle the delete action here
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
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Aucun pack disponible</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>
    </>
  );
}
