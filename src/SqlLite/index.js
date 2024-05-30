
export const openDatabase = async () => {
    const db = await SQLite.openDatabaseAsync("databaseName");
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS fournisseur (
          id_fournisseur INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          nom_fournisseur TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS category (
          id_category INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          nom_category TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS produit (
          id_produit INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          nom_produit TEXT NOT NULL,
          prix_produit TEXT NOT NULL,
          id_category INTEGER FOREIGN KEY REFERENCES category(id_category)
        );

        CREATE TABLE IF NOT EXISTS pack (
          id_pack INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          id_produit INTEGER  FOREIGN KEY REFERENCES produit(id_produit),
          quantite_produit INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vente (
          id_vente INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          id_fournisseur INTEGER  FOREIGN KEY REFERENCES fournisseur(id_fournisseur),
          pack_with_quantite TEXT ,
          produit_with_quantite TEXT 
        );
        INSERT INTO test (value, intValue) VALUES ('test1', 123);
        INSERT INTO test (value, intValue) VALUES ('test2', 456);
        INSERT INTO test (value, intValue) VALUES ('test3', 789);
      `);
    return db;
}


export const insererFournisseur = async (db) => {
  const statement = await db.prepareAsync(
    'INSERT INTO fournisseur (nom_fournisseur) VALUES ($nom_fournisseur)'
  );
  try {
    let result = await statement.executeAsync({ $nom_fournisseur: 'larbi'});
    console.log('data:', result.lastInsertRowId, result.changes);
  
   
  } finally {
    await statement.finalizeAsync();
  }
  return result.lastInsertRowId;
}