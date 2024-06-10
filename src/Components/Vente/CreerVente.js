import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

import { useTheme } from "react-native-paper";
import { openDatabase } from "../../SqlLite";
import AddVenteGrid from "./AddVenteGrid";
import VenteSelect from "./VenteSelect";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="archive-arrow-down-outline" />
);

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function CreerVente({ setPart }) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [category, setCategorie] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === category && (
          <MaterialIcons name="category" size={20} color="black" />
        )}
      </View>
    );
  };

  let theme = useTheme();

  useEffect(() => {
    console.log(theme.colors.primary);
  }, []);

  useEffect(() => {
    const setupDatabase = async () => {
      // const db = await SQLite.openDatabaseAsync("databaseName");
      const db = openDatabase;
      const result = await db.runAsync(
        "INSERT INTO test (value, intValue) VALUES (?, ?)",
        ["aaa", 100]
      );
      //console.log("gg",result.lastInsertRowId, result.changes);

      // `getAllAsync()` is useful when you want to get all results as an array of objects.
      const allRows = await db.getAllAsync("SELECT * FROM test");
      for (const row of allRows) {
        console.log(row.id, row.value, row.intValue);
      }
    };

    setupDatabase();
  }, []);

  return (
    <>
     <ScrollView style={styles.scrollView}>
      <Card style={styles.Card}>
        <Card.Title title="Ajouter une Vente" left={LeftContent} />
        

        <AddVenteGrid />
        <View>
          
          
        </View>

        <Card.Actions>
          <Button onPress={() => alert(name)}>Ajouter</Button>
        </Card.Actions>
      </Card>
      <VenteSelect />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: hp(80),
  },
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: wp(4),
  },

  //Dropdown Part
  dropdown: {
    margin: 0,
    height: 60,
    borderRadius: 0,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
