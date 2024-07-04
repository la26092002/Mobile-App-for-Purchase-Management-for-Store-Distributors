import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { useDataContext } from "../../../Context/DataContext";
import { database } from "../../../Model/database";

export default function DoneVente({ setStatus, prixTotal }) {
  const { state, dispatch } = useDataContext();
  const theme = useTheme();
  useEffect(() => {
    const insertData = async () => {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertVente(
          db,
          JSON.stringify(state.Ventes.pack),
          JSON.stringify(state.Ventes.produit),
          prixTotal,
          state.Ventes.fournisseur
        );
        console.log("state.Ventes : " );
        console.log(state.Ventes)
        console.log("Data is inserted correctly : " + reslt);
        let data = {
          id_vente: reslt,
          id_fournisseur:state.Ventes.fournisseur,
          nom_fournisseur: state.Ventes.nom_fournisseur,
          packs: JSON.stringify(state.Ventes.pack),
          produits: JSON.stringify(state.Ventes.produit),
          prixTotal: prixTotal,
        };

        dispatch({
          type: "addToAllVentes",
          payload: data,
        });
        /*8
{"id_fournisseur": 2, 
"id_vente": 1, 
"nom_fournisseur": "Moh", 
"packs": ,
 "prixTotal": "45090", 
 "produits" , "status": 1},
*/
        dispatch({
          type: "ressetVente",
        });

        setStatus(0);
      } catch (error) {
        console.error("Error inserting produit:", error);
      }
    };

    insertData();
  }, []);
  return (
    <View>
      <Text>DoneVente</Text>
    </View>
  );
}
