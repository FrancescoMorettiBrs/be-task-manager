import { db } from "../db/connection.js";

// Recupero tutte le tasks /GET
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

// Recupero una task /SHOW
export async function getTaskById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

    // Verifico che esista una task con quell'id
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task non trovata" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nel recupero della task" });
  }
}

// Creo una nuova task /CREATE
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

// Elimino una task tramite id /DELETE
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    // Faccio la query per l'eliminazione
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    // Controllo se almeno una riga è stata eliminata
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task non trovata" });
    }

    // Gestisco l'eliminazione avvenuta con successo
    res.json({ message: "Task elimanta con successo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errq: "Errore nell'eliminazioine della task" });
  }
}

// Aggiorno una task tramite id /PUT-UPDATE
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    if (!title && !status) {
      return res.status(400).json({
        error: "Compilare entrambi i campi",
      });
    }

    // Costruisco la query in base ai campi forniti
    const fields = [];
    const values = [];

    if (title) {
      fields.push("title=?");
      values.push(title);
    }

    if (status) {
      fields.push("status=?");
      values.push(status);
    }

    values.push(id);

    const [result] = await db.query(`UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`, values);

    // Verifico che almeno una riga è stata aggiornata, in caso contrario la task non esiste
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task non trovata" });
    }

    // Recupero la task aggiornata
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nell'aggiornamento della task" });
  }
}
