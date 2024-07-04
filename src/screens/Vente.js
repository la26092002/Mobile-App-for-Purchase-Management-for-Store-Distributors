import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useCallback } from "react";
import SegmentedButtonProduct2 from "../Components/SegmentedButtonProduct2";
import CreerVente from "../Components/Vente/AddVente/CreerVente";
import SelectAllVente from "../Components/Vente/DispalyVente/SelectAllVente";

export default function Vente() {
  const [part, setPart] = React.useState(0);

  useEffect(() => {
    console.log("Vente component re-rendered");
  }, []);

  // Memoize setPart to prevent unnecessary re-renders
  const memoizedSetPart = useCallback((newPart) => {
    setPart(newPart);
  }, []);

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.NavView}>
          <SegmentedButtonProduct2 setPart={memoizedSetPart} />
        </View>
        <View style={styles.Bodyiew}>
          {part === 0 && <SelectAllVente />}
          {part === 1 && <CreerVente setPart={memoizedSetPart} />}
        </View>
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
