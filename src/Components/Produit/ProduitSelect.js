import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { DataTable,Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ProduitSelect() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nom</DataTable.Title>
              <DataTable.Title>Prix</DataTable.Title>
              <DataTable.Title>Categorie</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Larbi Larbi Larbi</DataTable.Cell>
              <DataTable.Cell>Larbi Larbi Larbi</DataTable.Cell>
              <DataTable.Cell>Larbi</DataTable.Cell>
              
              <DataTable.Cell>
                <Button
                  icon="eyedropper-variant"
                  mode="text"
                  onPress={() => alert("Pressed")}
                >
                  Modifier
                </Button>
              </DataTable.Cell>
            </DataTable.Row>

          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
    Card: {
      marginHorizontal: 10
    },
    scrollView: {
      marginHorizontal: 10,
      height: hp(70),
    },
  });