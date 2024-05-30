import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './src/screens/Product';
import Fournisseur from './src/screens/Fournisseur';
import Vente from './src/screens/Vente';
import Home from './src/screens/Home';
import { Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { database } from './src/Model/database';

const Stack = createNativeStackNavigator();

function App() {
  //const isDBLoadingComplete = useDatabase();

  //if (!isDBLoadingComplete) {
  //return (
  //<View>
  //<Text>Loading Database...</Text>
  //</View>
  //);
  //}

  useEffect(() => {
    async function load() {
      let db = await database.openDatabase();
      await database.insertUser(db,"ali",19)
      await database.getUsers(db)
    }

    load()
  }, [])

  return (
    <>
    <TextInput> </TextInput>
    </>

    //<NavigationContainer>
     // <Stack.Navigator initialRouteName="Home">
       // <Stack.Screen name="Product" component={Product} />
        //<Stack.Screen name="Fournisseur" component={Fournisseur} />
        //<Stack.Screen name="Vente" component={Vente} />
        //<Stack.Screen name="Home" component={Home} />
      //</Stack.Navigator>
    //</NavigationContainer>
  );
}

export default App;
