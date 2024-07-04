import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseNameeeeeeeeeeeeeee");
  await db.execAsync(`
  PRAGMA journal_mode = WAL;
  
  CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL, 
      value TEXT NOT NULL, 
      intValue INTEGER
  );
  
  CREATE TABLE IF NOT EXISTS fournisseur (
      id_fournisseur INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_fournisseur TEXT NOT NULL,
      status BOOLEAN DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS category (
      id_category INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_category TEXT NOT NULL,
      status BOOLEAN DEFAULT false
  );
  
  
  CREATE TABLE IF NOT EXISTS produit (
      id_produit INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      nom_produit TEXT NOT NULL,
      prix_produit TEXT NOT NULL,
      id_category INTEGER,
      status BOOLEAN DEFAULT false,
      FOREIGN KEY (id_category) REFERENCES category(id_category)
  );

  CREATE TABLE IF NOT EXISTS pack (
    id_pack INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    quantite_pack TEXT NOT NULL,
    prix TEXT NOT NULL,
    id_produit INTEGER,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (id_produit) REFERENCES produit(id_produit)
);
CREATE TABLE IF NOT EXISTS vente (
  id_vente INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  packs TEXT NOT NULL,
  produits TEXT NOT NULL,
  prixTotal TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_fournisseur INTEGER,
  FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id_fournisseur)
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
  const allRows = await db.getAllAsync("SELECT * FROM fournisseur where status=false");
  return allRows;
};


const updateFournisseur = async (db, id_fournisseur,nom_fournisseur) => {
  let result = await db.runAsync(
    "UPDATE fournisseur SET nom_fournisseur = ? WHERE id_fournisseur=?",
    nom_fournisseur, id_fournisseur
  );
  return result;
};

const suprimmerFournisseur = async (db, id_fournisseur) => {//
  let result = await db.runAsync(
    "UPDATE fournisseur SET status = ? WHERE id_fournisseur=?",
    true, id_fournisseur 
  );
  return result;
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
  const allRows = await db.getAllAsync("SELECT * FROM category  where status= false");
  return allRows;
};


const suprimmerCategory = async (db, id_category) => {//
  let result = await db.runAsync(
    "UPDATE category SET status = ?  WHERE id_category=?",
    true, id_category 
  );
  return result;
};

//-------------pack----------------
const insertPack = async (db, id_produit, quantite,prix) => {
  let result = await db.runAsync(
    "INSERT INTO pack (id_produit,quantite_pack,prix) VALUES (?,?,?)",
    id_produit,quantite,prix
    
  );
  return result.lastInsertRowId;
};
//Get All packs
const getPacks = async (db) => {
  const allRows = await db.getAllAsync("SELECT k.id_pack, p.nom_produit, k.quantite_pack,k.prix FROM pack k JOIN  produit p ON   k.id_produit = p.id_produit where k.status= false");
  return allRows;
};
const suprimmerPack = async (db, id_pack) => {//
  let result = await db.runAsync(
    "UPDATE pack SET status = ?  WHERE id_pack=?",
    true, id_pack 
  );
  return result;
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
  const allRows = await db.getAllAsync("SELECT   p.id_produit, p.nom_produit, p.prix_produit, c.nom_category FROM  produit p JOIN  category c ON  p.id_category = c.id_category where p.status= false ");
  return allRows;
};
//id_produit INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//nom_produit TEXT NOT NULL,
//prix_produit TEXT NOT NULL,
//id_category INTEGER,
const modifierProduit = async (db, id_produit, nom_produit, prix_produit, id_category) => {
  let result = await db.runAsync(
    "UPDATE produit SET nom_produit = ?, prix_produit = ?, id_category=? WHERE id_produit=?",
    nom_produit, prix_produit, id_category, id_produit 
  );
  return result;
};

const suprimmerProduit = async (db, id_produit) => {//
  let result = await db.runAsync(
    "UPDATE produit SET status = ?  WHERE id_produit=?",
    true, id_produit 
  );
  return result;
};




//------------vente--------------------
const insertVente = async (db, packs, produits,prixTotal,id_fournisseur) => {
  let result = await db.runAsync(
    "INSERT INTO vente (packs,produits,prixTotal,id_fournisseur) VALUES (?,?,?,?)",
    packs,produits,prixTotal,id_fournisseur
    
  );
  return result.lastInsertRowId;
};
//Get All vente
const getVentes = async (db) => {
  try {
    const allRows = await db.getAllAsync("SELECT * FROM vente JOIN fournisseur ON vente.id_fournisseur = fournisseur.id_fournisseur ORDER BY vente.created_at DESC");
    return allRows;
  } catch (error) {
    console.error("Error getting ventes:", error);
    return []; // Or handle differently based on your needs
  }
};

const modifierVente = async (db, packs, produits, prixTotal, id_fournisseur, id_vente) => {
  let result = await db.runAsync(
    "UPDATE vente SET packs = ?, produits = ?, prixTotal=?, id_fournisseur=? WHERE id_vente=?",
    packs, produits, prixTotal, id_fournisseur, id_vente // Added comma after id_fournisseur
  );
  return result;
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
  getProducts,
  insertVente,
  getVentes,
  modifierVente,
  modifierProduit,
  suprimmerProduit,
  suprimmerPack,
  suprimmerCategory,
  updateFournisseur,
  suprimmerFournisseur
};
