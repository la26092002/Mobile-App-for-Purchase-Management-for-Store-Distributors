import { View } from 'react-native'
import { DataTable,Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import React from 'react'

export default function VenteSelect() {
  return (
    <>
    <DataTable>
            <DataTable.Header>
              <DataTable.Title>Produit</DataTable.Title>
              <DataTable.Title>Quantité</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
           
            <DataTable.Row key="1">
              <DataTable.Cell>Produit1</DataTable.Cell>
              <DataTable.Cell>20</DataTable.Cell>
              
              <DataTable.Cell>
                <Button
                  icon="eyedropper-variant"
                  mode="text"
                  onPress={() => alert("Pressed")}
                >
                  supprimer
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          </>
  )
}