import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, DataTable } from "react-native-paper";
import { useDataContext } from "../../Context/DataContext";

export default function SelectFournisseur({ setStatus }) {
  const { state, dispatch } = useDataContext();

  const [fournisseur, setFournisseur] = useState(null);
  let presser = (id_fournisseur) => {
    setFournisseur(id_fournisseur);
    dispatch({
      type: "addVenteFournisseur",
      payload: id_fournisseur,
    });
    setStatus(3);
  };
  useEffect(() => {
    
    console.log(state.Ventes.produit);
    let totalPrixPacks = state.Ventes.pack.reduce((sum, pack) => {
      const prix = parseFloat(pack.prix);
      const quantite = parseFloat(pack.quantitePack);
      if (!isNaN(prix)) {
        return sum + (prix*quantite);
      } else {
        console.error(`Invalid price for pack ${pack.idPack}: ${pack.prix}`);
        return sum;
      }
    }, 0);
    console.log("Total Price Packs:", totalPrixPacks);


    let totalPrixProducts = state.Ventes.produit.reduce((sum, produit) => {
      const prix = parseFloat(produit.prix);
      const quantite = parseFloat(produit.quantiteProduct);
      if (!isNaN(prix)) {
        return sum + (prix*quantite);
      } else {
        console.error(`Invalid price for pack ${pack.idPack}: ${pack.prix}`);
        return sum;
      }
    }, 0);
    console.log("Total Price produits:", totalPrixProducts);
  }, [state.Ventes.pack]);

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
