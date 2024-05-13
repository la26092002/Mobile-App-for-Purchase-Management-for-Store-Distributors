import { View, Text, Button, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import BottomNav from "../Components/BottomNav";

export default function Product({ navigation }) {
  return (
    <View style={styles.Container}>
      {
        //nav view
      }
      <View style={styles.NavView}>
        <Text>Product</Text>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigation.navigate("Fournisseur", { name: "Jane" })}
        />
      </View>
      {
        //body view
      }
      
      {
        //bottom view
      }
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: hp(90),
    width: wp(100),
    backgroundColor: "red",
  },
  NavView: {
    height: hp(40),
    width: wp(100),
    backgroundColor: "blue",
  },
  BodyView: {
    height: hp(35),
    width: wp(100),
    backgroundColor: "green",
  },
  BottomView: {
    height: hp(15),
    width: wp(100),
    backgroundColor: "gray",
  },
});
