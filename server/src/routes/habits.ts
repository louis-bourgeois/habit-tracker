// server/src/routes/habits.ts
import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

const computeStreak = async (habitId: number): Promise<{ streak: number; missed: boolean }> => {
  const completionsResult = await query(
    "SELECT date_completion FROM habit_completions WHERE habit_id = $1 ORDER BY date_completion DESC",
    [habitId]
  );
  // Conversion des dates dans le format local "YYYY-MM-DD" (ex. en-CA)
  const completions: string[] = completionsResult.rows.map(
    (row: any) => new Date(row.date_completion).toLocaleDateString("en-CA")
  );
  
  let streak = 0;
  // Utiliser la date locale d'aujourd'hui
  const todayStr = new Date().toLocaleDateString("en-CA");
  let currentDate = todayStr;
  
  while (completions.includes(currentDate)) {
    streak++;
    const dateObj = new Date(currentDate);
    dateObj.setDate(dateObj.getDate() - 1);
    currentDate = dateObj.toLocaleDateString("en-CA");
  }
  
  const missed = !completions.includes(todayStr);
  return { streak, missed };
};


router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM habits WHERE archive = false ORDER BY id");
    const habits = result.rows;
    const enhancedHabits = await Promise.all(
      habits.map(async (habit: any) => {
        const { streak, missed } = await computeStreak(habit.id);
        return { ...habit, streak, missed };
      })
    );
    console.log(enhancedHabits)
    res.json(enhancedHabits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des habitudes." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { nom, difficulte, priorite } = req.body;
  try {
    const result = await query(
      "INSERT INTO habits (nom, difficulte, priorite) VALUES ($1, $2, $3) RETURNING *",
      [nom, difficulte, priorite]
    );
    const habit = result.rows[0];
    res.status(201).json({ ...habit, streak: 0, missed: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de l’habitude." });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nom, difficulte, priorite } = req.body;
  try {
    const result = await query(
      "UPDATE habits SET nom = $1, difficulte = $2, priorite = $3 WHERE id = $4 RETURNING *",
      [nom, difficulte, priorite, id]
    );
    const habit = result.rows[0];
    const { streak, missed } = await computeStreak(habit.id);
    res.json({ ...habit, streak, missed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la modification de l’habitude." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM habits WHERE id = $1 RETURNING *", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de l’habitude." });
  }
});

export default router;
