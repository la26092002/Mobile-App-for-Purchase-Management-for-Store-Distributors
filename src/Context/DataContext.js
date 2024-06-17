import React, { createContext, useContext, useReducer } from "react";

// Define the initial state
const initialState = {
  products: [],
  pack: [],
  category: [],
  TheProducts: [],
  Ventes: { produit: [], pack: [], fournisseur: null },//this is when you want to do sell
  AllVentes: []
};

// Define the reducer function to handle state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return { ...state, products: [...state.products, action.payload] };
    case "getProducts":
      return { ...state, products: action.payload };
    case "addCategorie":
      return { ...state, category: [...state.category, action.payload] };
    case "getCategories":
      return { ...state, category: action.payload };
    case "addPack":
      return { ...state, pack: [...state.pack, action.payload] };
    case "getPack":
      return { ...state, pack: action.payload };
    case "addTheProduct":
      return { ...state, TheProducts: [...state.TheProducts, action.payload] };
    case "getTheProduct":
      return { ...state, TheProducts: action.payload };

    case "addVente":
      return { ...state, Ventes: [...state.Ventes, action.payload] };

    case "addVenteProduit":
      return {
        ...state,
        Ventes: {
          ...state.Ventes,
          produit: [...state.Ventes.produit, action.payload],
        },
      };

    case "addVentePack":
      return {
        ...state,
        Ventes: {
          ...state.Ventes,
          pack: [...state.Ventes.pack, action.payload],
        },
      };

    case "addVenteFournisseur":
      return {
        ...state,
        Ventes: {
          ...state.Ventes,
          fournisseur: action.payload,
        },
      };

    case "ressetVente":
      return {
        ...state,
        Ventes: { produit: [], pack: [], fournisseur: null },
      };
    case "getVentes":
      return { ...state, Ventes: action.payload };

      case "getToAllVentes":
      return { ...state, AllVentes: action.payload };
      
    default:
      throw new Error();
  }
};

// Create the context
export const DataContext = createContext();

// Create a component that will provide the context
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a hook to use the context
export const useDataContext = () => {
  return useContext(DataContext);
};
