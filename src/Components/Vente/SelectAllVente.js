import React, { useEffect } from 'react'
import { Button, DataTable } from 'react-native-paper'
import { useDataContext } from '../../Context/DataContext';
import { database } from '../../Model/database';

export default function SelectAllVente() {
  const { state, dispatch } = useDataContext();

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let ventes = await database.getVentes(db);
        dispatch({
          type: "getToAllVentes",
          payload: ventes,
        });
      } catch (error) {
        console.error("Error select ventes:", error);
      }
    }
    load();
  }, []);
  return (
    <>
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
                  onPress={() => alert("Pressed : " +vente.id_vente)}
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