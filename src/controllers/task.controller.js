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

// Creo una nuova task
export async function createTask(req, res) {
  try {
    const { title, status } = req.body;

    // Validazione base
    if (!title) {
      return res.status(400).json({ error: "Manca il titolo" });
    }

    // Inserimento nel DB
    const [result] = await db.query("INSERT INTO tasks (title, status) VALUES (?, ?)", [title, status || "todo"]);

    // Risposta con la task creata
    res.status(201).json({
      id: result.insertId,
      title,
      status: status || "todo",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nella creazione della task" });
  }
}
