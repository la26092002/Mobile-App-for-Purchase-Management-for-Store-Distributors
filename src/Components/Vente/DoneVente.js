import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDataContext } from "../../Context/DataContext";
import { useTheme } from "react-native-paper";
import { database } from "../../Model/database";

export default function DoneVente({ setStatus }) {
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
          1000,
          state.Ventes.fournisseur,
        );

        console.log("Data is inserted correctly : " + reslt)

        dispatch({
          type: "ressetVente",  
        });

        setStatus(0)
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
