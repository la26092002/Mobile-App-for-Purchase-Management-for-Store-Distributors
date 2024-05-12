import { View, Text, Button, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";

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
      <View style={styles.BodyView}></View>
      {
        //bottom view
      }
      <View style={styles.BottomView}></View>
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
    height: hp(40),
    width: wp(100),
    backgroundColor: "green",
  },
  BottomView: {
    height: hp(10),
    width: wp(100),
    backgroundColor: "black",
  },
});
