import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import SegmentedButtonProduct from "../Components/SegmentedButtonProduct";
import ProduitSelect from "../Components/Produit/ProduitSelect";
import CategorySelect from "../Components/Produit/CategorySelect";
import PackSelect from "../Components/Produit/PackSelect";
import ProductAdd from "../Components/Produit/ProductAdd";
import SegmentedButtonProduct2 from "../Components/SegmentedButtonProduct2";
import CreerVente from "../Components/Vente/CreerVente";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
export default function Vente() {
  const [part, setPart] = React.useState(0);
  const [name, setName] = React.useState("");
  return (
    <>
      <View style={styles.Container}>
        {
          //nav view
        }
        <View style={styles.NavView}>
          <SegmentedButtonProduct2 setPart={setPart} />
        </View>
        <View style={styles.Bodyiew}>
          {part == 0 && <ProduitSelect />}
          {part == 1 && <CreerVente setPart={setPart} />}
        </View>
        {
          //body view
        }

        {
          //bottom view
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: hp(80),
    width: wp(100),
  },
  NavView: {
    height: hp(10),
    width: wp(100),
  },
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});
