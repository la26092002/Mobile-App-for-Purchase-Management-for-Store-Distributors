import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, DataTable } from "react-native-paper";
import { useDataContext } from "../../Context/DataContext";

export default function SelectFournisseur({setStatus}) {
  const { state, dispatch } = useDataContext();

  const [fournisseur, setFournisseur] = useState(null);
  let presser = (id_fournisseur) => {
    setFournisseur(id_fournisseur)
    dispatch({
        type: "addVenteFournisseur",
        payload: fournisseur,
      });
      setStatus(3)
  }
  useEffect(() => {
    console.log("fournisseur : "+fournisseur)
  }, [fournisseur])
  
  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {state.products.map((fournisseur) => (
          <DataTable.Row key={fournisseur.id_fournisseur}>
            <DataTable.Cell>{fournisseur.nom_fournisseur}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eyedropper-variant"
                mode="text"
                onPress={() => presser(fournisseur.id_fournisseur)}
              >
                Selectionner
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
}
