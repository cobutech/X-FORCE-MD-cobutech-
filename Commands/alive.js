// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Fonction pour créer la table "alive" avec une colonne "id"
const creerTableAlive = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS alive (
          id serial PRIMARY KEY,
          message text,
          lien text
        );
      `);
      console.log("La table 'alive' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'alive':", e);
    }
  };
  
  // Appelez la méthode pour créer la table "alive"
  creerTableAlive();

// Fonction pour ajouter ou mettre à jour un enregistrement dans la table "alive"
async function addOrUpdateDataInAlive(message, lien) {
    const client = await pool.connect();
    try {
      // Insérez ou mettez à jour les données dans la table "alive"
      const query = `
        INSERT INTO alive (https://telegra.ph/file/24f77e7f4e67a1f90861d.jpg;Hellw this *X-FORCE-MD* created by team *COBU-TECH* and we would like to notify you that your bot is not dead 😂😂,,just don't miss use it to avoid loosing it forever 🤣🤣. Hopefully we are huppy thut you like the bot.❤️❤️❤️)
        VALUES (1, $1, $2)
        ON CONFLICT (id)
        DO UPDATE SET message = excluded.message, lien = excluded.lien;
      `;
      const values = [message, lien];
  
      await client.query(query, values);
      console.log("Données ajoutées ou mises à jour dans la table 'alive' avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour des données dans la table 'alive':", error);
    } finally {
      client.release();
    }
  };

 
  async function getDataFromAlive() {
    const client = await pool.connect();
    try {
      // Exécutez la requête SELECT pour récupérer les données
      const query = "SELECT message, lien FROM alive WHERE id = 1";
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        const { message, lien } = result.rows[0];
        return { message, lien };
      } else {
        console.log("Aucune donnée trouvée dans la table 'alive'.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données depuis la table 'alive':", error);
      return null;
    } finally {
      client.release();
    }
  };
  
  
  

  module.exports = {
    addOrUpdateDataInAlive,
    getDataFromAlive,
    
  };
