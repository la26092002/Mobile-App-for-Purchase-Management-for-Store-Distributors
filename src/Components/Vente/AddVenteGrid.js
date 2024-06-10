import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, TextInput, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddVenteGrid() {
  let theme = useTheme();
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
  const [category, setCategorie] = useState(null);
  const renderItem = (item) => {
    return (
      <View style={styles.itemR}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === category && (
          <MaterialIcons name="category" size={20} color="black" />
        )}
      </View>
    );
  };
  return (
    <>
    <View style={styles.app}>
      <Dropdown
        style={[
          styles.dropdown,styles.item,
          { backgroundColor: theme.colors.surfaceVariant, width: wp(46) },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Pack Select"
        searchPlaceholder="Search..."
        value={category}
        onChange={(item) => {
          setCategorie(item.value);
        }}
        renderLeftIcon={() => (
          <MaterialIcons name="category" size={20} color="black" />
        )}
        renderItem={renderItem}
      />
      <TextInput style={styles.item} label="Quantite Pack" />
    </View>
    <Button
    style={{marginTop:10,marginBottom:10}}
        icon="plus"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Add Pack
      </Button>


      <View style={styles.app}>
      <Dropdown
        style={[
          styles.dropdown,styles.item,
          { backgroundColor: theme.colors.surfaceVariant, width: wp(46) },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Produit Select"
        searchPlaceholder="Search..."
        value={category}
        onChange={(item) => {
          setCategorie(item.value);
        }}
        renderLeftIcon={() => (
          <MaterialIcons name="category" size={20} color="black" />
        )}
        renderItem={renderItem}
      />
      <TextInput style={styles.item} label="Quantite Produit" />
      
    </View>
    <Button
    style={{marginTop:10,marginBottom:10}}
        icon="plus"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Add Produit
      </Button>
    </>
  );
}

const styles = {
  app: {
    marginHorizontal: "auto",
    width: wp(92),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    minWidth: wp(46),
    maxWidth: wp(46),
  },
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
  itemR: {
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
};
