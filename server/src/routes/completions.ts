// server/src/routes/completions.ts
import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

router.post("/toggle", async (req: Request, res: Response) => {
  const { habit_id, date_completion } = req.body;
  console.log("toggled", habit_id)
  try {
    // Vérifier si la complétion existe déjà
    const exists = await query(
      "SELECT id FROM habit_completions WHERE habit_id = $1 AND date_completion = $2",
      [habit_id, date_completion]
    );
    if (exists.rows.length > 0) {
      // Si déjà complété, on supprime pour décocher
      await query("DELETE FROM habit_completions WHERE habit_id = $1 AND date_completion = $2", [
        habit_id,
        date_completion,
      ]);
      return res.status(200).json({ message: "Décoché", action: "remove" });
    } else {
      // Sinon, on insère pour cocher
      const result = await query(
        "INSERT INTO habit_completions (habit_id, date_completion) VALUES ($1, $2) RETURNING *",
        [habit_id, date_completion]
      );
      return res.status(201).json({ message: "Coché", action: "add", data: result.rows[0] });
    }
  } catch (err) {
    console.error("Erreur lors du toggle de complétion :", err);
    res.status(500).json({ error: "Erreur lors du toggle de la complétion." });
  }
});

export default router;
