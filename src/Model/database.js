import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseNameeee");
  await db.execAsync(`
  PRAGMA journal_mode = WAL;
  
  CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL, 
      value TEXT NOT NULL, 
      intValue INTEGER
  );
  
  CREATE TABLE IF NOT EXISTS fournisseur (
      id_fournisseur INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_fournisseur TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS category (
      id_category INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_category TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS pack (
      id_pack INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_pack TEXT NOT NULL,
      quantite_pack TEXT NOT NULL,
      prix TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS produit (
      id_produit INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_produit TEXT NOT NULL,
      prix_produit TEXT NOT NULL,
      id_category INTEGER,
      FOREIGN KEY (id_category) REFERENCES category(id_category)
  );
  `);
  

  return db;
};
const getUsers = async (db) => {
  console.log("getUsers");
  const allRows = await db.getAllAsync("SELECT * FROM test");
  for (const row of allRows) {
    console.log(row.id, row.value, row.intValue);
  }
};

const insertUser = async (db, userName, val) => {
  console.log("insertUser");
  const result = await db.runAsync(
    "INSERT INTO test (value, intValue) VALUES (?, ?)",
    userName,
    val
  );
  console.log(result.lastInsertRowId, result.changes);
};

//-------------fournisseur----------------

//insert fournisseur
const insertFournisseur = async (db, nom) => {
  let result = await db.runAsync(
    "INSERT INTO fournisseur (nom_fournisseur) VALUES (?)",
    nom
  );
  return result.lastInsertRowId;
};
//Get All fournisseur
const getFournisseur = async (db) => {
  const allRows = await db.getAllAsync("SELECT * FROM fournisseur");
  return allRows;
};

//-------------categorie----------------
const insertCategorie = async (db, nom) => {
  let result = await db.runAsync(
    "INSERT INTO category (nom_category) VALUES (?)",
    nom
  );
  return result.lastInsertRowId;
};
//Get All categories
const getCategories = async (db) => {
  const allRows = await db.getAllAsync("SELECT * FROM category");
  return allRows;
};

//-------------pack----------------
const insertPack = async (db, nom, quantite,prix) => {
  let result = await db.runAsync(
    "INSERT INTO pack (nom_pack,quantite_pack,prix) VALUES (?,?,?)",
    nom,quantite,prix
    
  );
  return result.lastInsertRowId;
};
//Get All packs
const getPacks = async (db) => {
  const allRows = await db.getAllAsync("SELECT * FROM pack");
  return allRows;
};


//---------------produit---------------------

//Inser Product
const insertProduct = async (db, nom_produit, prix_produit,id_category) => {
  let result = await db.runAsync(
    "INSERT INTO produit (nom_produit,prix_produit,id_category) VALUES (?,?,?)",
    nom_produit,prix_produit,id_category
    
  );
  return result.lastInsertRowId;
};
//Get All packs
const getProducts = async (db) => {
  const allRows = await db.getAllAsync("SELECT * FROM produit");
  return allRows;
};

export const database = {
  openDatabase,
  getUsers,
  insertUser,
  insertFournisseur,
  getFournisseur,
  insertCategorie,
  getCategories,
  insertPack,
  getPacks,
  insertProduct,
  getProducts
};
