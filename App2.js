import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Product from "./src/screens/Product";
import Fournisseur from "./src/screens/Fournisseur";
import Vente from "./src/screens/Vente";

const navigator = createStackNavigator({
    product: Product,
    fournisseur:Fournisseur,
    vente:Vente
  },
  {
    initialRouteName:"product",
    defaultNavigationOptions:{
      headerShown: false,
    }
  })
  
  export default createAppContainer(navigator);


  