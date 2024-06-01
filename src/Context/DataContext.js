import React, { createContext, useContext, useReducer } from "react";

// Define the initial state
const initialState = {
  products: [],
  pack: [],
  category: [],
  TheProducts: [],
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
