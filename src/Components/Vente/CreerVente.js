import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  MD2Colors,
  Avatar,
  Button,
  Card,
  DataTable,
  TextInput,
} from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useTheme } from "react-native-paper";
import { openDatabase } from "../../SqlLite";
import AddVenteGrid from "./AddVenteGrid";
import VenteSelect from "./VenteSelect";
import SelectFournisseur from "../Fournisseur/SelectFournisseur";
import DoneVente from "./DoneVente";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="archive-arrow-down-outline" />
);

export default function CreerVente() {
  let theme = useTheme();
  const [status, setStatus] = useState(0);
  let Suivant = async () => {
    setStatus(1);
    setTimeout(function () {
      console.log("Waited 2 seconds");
      setStatus(2); // Move this inside the setTimeout function
    }, 2000);
  };
  
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {status === 0 && (
          <Card style={styles.Card}>
            <Card.Title title="Ajouter une Vente" left={LeftContent} />
            <AddVenteGrid />
            <VenteSelect />
            <Card.Actions>
              <Button onPress={Suivant}>Suivant</Button>
            </Card.Actions>
          </Card>
        )}
        {status === 1 && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              animating={true}
              size={"large"}
              color={theme.colors.primary}
            />
          </View>
        )}
        {status === 2 && (
          <>
            <SelectFournisseur setStatus={setStatus} />
          </>
        )}
        {status === 3 && (
          <>
            <DoneVente setStatus={setStatus} />
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(80), // Adjust this value if needed
  },
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
