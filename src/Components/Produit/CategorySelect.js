import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LeftContent = (props) => <Avatar.Icon {...props} icon="shape" />;
export default function CategorySelect({}) {
  const [name, setName] = React.useState("");
  return (
    <>
      <SafeAreaView style={styles.Bodyiew}>
        <ScrollView style={styles.scrollView}>
          <Card style={styles.Card}>
            <Card.Title title="Ajouter une Categorie" left={LeftContent} />
            <TextInput
              label="Nom de Categorie"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Card.Actions>
              <Button onPress={() => alert(name)}>Ajouter</Button>
            </Card.Actions>
          </Card>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Categorie</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
            <DataTable.Row>
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
  );
}
const styles = StyleSheet.create({
  
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});
