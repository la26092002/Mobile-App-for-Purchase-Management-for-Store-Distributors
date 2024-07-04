import React, { useEffect, useState, useCallback } from "react";
import { Text, StyleSheet } from "react-native";
import {
  BottomNavigation,
} from "react-native-paper";
import Vente from "./Vente";
import Product from "./Product";
import Fournisseur from "./Fournisseur";
import Parametre from "./Parametre";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../Model/database";
import { useDataContext } from "../Context/DataContext";

const Home = () => {
  
  const { state, dispatch } = useDataContext();
  
  useEffect(() => {
    console.log("Home component re-rendered");
  }, []);
  
  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let fournisseurs = await database.getFournisseur(db);
        dispatch({
          type: "getProducts",
          payload: fournisseurs,
        });

//AllVente
        let ventes = await database.getVentes(db);
        console.log("Fetched Ventes:", ventes); // Debug fetched data
        dispatch({
          type: "getToAllVentes",
          payload: ventes,
        });


//All Products
        let products = await database.getProducts(db);

        dispatch({
          type: "getTheProduct",
          payload: products,
        });
//packs
        let packs = await database.getPacks(db);
        //setData(categories);
        dispatch({
          type: "getPack",
          payload: packs,
        });

//categories 
        let categories = await database.getCategories(db);
        //setData(categories);
        dispatch({
          type: "getCategories",
          payload: categories,
        });

      } catch (error) {
        console.error("Error select fournisseur:", error);
      }
    }
    load();
  }, [dispatch]);

  const MusicRoute = useCallback(() => <Vente />, []);
  const AlbumsRoute = useCallback(() => <Product />, []);
  const RecentsRoute = useCallback(() => <Fournisseur />, []);
  const ParametreRoute = useCallback(() => <Parametre />, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "music", title: "Vente", focusedIcon: "sale", unfocusedIcon: "sale" },
    { key: "albums", title: "Produit", focusedIcon: "package-variant-closed" },
    { key: "recents", title: "Fournisseur", focusedIcon: "account-hard-hat" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    parametre: ParametreRoute,
  });

  return (
    <BottomNavigation
      style={styles.BottomView}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 15,
    textAlign: "center",
    fontSize: 35,
  },
  BottomView: {
    height: hp(20),
    width: wp(100),
    backgroundColor: "red",
  },
});

export default Home;
