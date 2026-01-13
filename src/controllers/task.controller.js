import { db } from "../db/connection.js";

export async function getAllTasks(req, res) {
  try {
    //Faccio la query per recuperare tutte le tasks
    const [tasks] = await db.query("SELECT * FROM tasks");

    // Ricevo le tasks e le trasformo in formato JSON
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nel recupero delle task" });
  }
}
