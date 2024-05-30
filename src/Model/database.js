import * as SQLite from "expo-sqlite";

const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName");
  await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);

CREATE TABLE IF NOT EXISTS fournisseur (
    id_fournisseur INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nom_fournisseur TEXT NOT NULL
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

const insertUser = async (db,userName, val) => {
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
const insertFournisseur = async (db,nom) => {
    await db.runAsync(
        "INSERT INTO fournisseur (nom_fournisseur) VALUES (?)",
        nom
      );
}
//Get All fournisseur
const getFournisseur = async (db,nom) => {
    const allRows = await db.getAllAsync("SELECT * FROM fournisseur");
  return allRows;
}

export const database = {
    openDatabase,
  getUsers,
  insertUser,
  insertFournisseur,
  getFournisseur
};
