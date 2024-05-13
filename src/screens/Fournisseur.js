import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { DataTable } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
export default function Fournisseur() {
  const [fournis, setFournis] = React.useState(false);
  const [name, setName] = React.useState("");

  return (
    <View>
      {
        !fournis && (
          <Button onPress={() => setFournis(true)} >Ajouter Fournisseur</Button>
        )
      }
      {
        fournis && (
          <Card style={styles.Card}>
        <Card.Title title="Ajouter un Fournisseur" left={LeftContent} />
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Card.Actions>
          <Button onPress={() => setFournis(false)} >Cancel</Button>
          <Button onPress={() => alert(name)}>Ajouter</Button>
        </Card.Actions>
      </Card>
        )
      }
      

      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Larbi</DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Delete
            </Button>
          </DataTable.Cell>
          <DataTable.Cell>
            <Button icon="camera" mode="text" onPress={() => alert("Pressed")}>
              Update
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        
      </DataTable>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    marginHorizontal: 10,
  },
  scrollView: {
    marginHorizontal: 10,
    height:hp(50)
  },
});
