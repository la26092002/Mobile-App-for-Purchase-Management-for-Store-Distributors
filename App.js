import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './src/screens/Product';
import Fournisseur from './src/screens/Fournisseur';
import Vente from './src/screens/Vente';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product">
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Fournisseur" component={Fournisseur} />
        <Stack.Screen name="Vente" component={Vente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
