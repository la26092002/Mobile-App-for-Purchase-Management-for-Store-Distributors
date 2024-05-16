import * as React from "react";
import { Text, StyleSheet } from "react-native";
import {
  Card,
  Provider,
  Appbar,
  Title,
  Paragraph,
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
const Home = () => {
  const MusicRoute = () => (
    <>
      <Vente />
    </>
  );

  const AlbumsRoute = () => (
    <>
      <Product />
    </>
  );

  const RecentsRoute = () => (
    <>
      <Fournisseur />
    </>
  );
  const ParametreRoute = () => (
    <>
      <Parametre />
    </>
  );

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "music",
      title: "Vente",
      focusedIcon: "sale",
      unfocusedIcon: "sale",
    },
    { key: "albums", title: "Produit", focusedIcon: "package-variant-closed" },
    { key: "recents", title: "Fournisseur", focusedIcon: "account-hard-hat" },
    { key: "parametre", title: "paramètre", focusedIcon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    parametre: ParametreRoute,
  });

  return (
    <>
      <BottomNavigation
        style={styles.BottomView}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
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
