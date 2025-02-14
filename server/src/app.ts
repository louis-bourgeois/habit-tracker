// server/src/app.ts
import express from "express"
import cors from "cors";
import habitsRoutes from "./routes/habits";
import completionsRoutes from "./routes/completions";
import quotesRoutes from "./routes/quotes"; // si nécessaire
import { query } from "./db";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/habits", habitsRoutes);
app.use("/api/completions", completionsRoutes);
app.use("/api/quotes", quotesRoutes);

// Endpoint pour récupérer les points du jour
app.get("/api/points/today", async (req, res) => {
    const { date } = req.query; // date au format "YYYY-MM-DD"
    try {
      const result = await query(
        "SELECT COALESCE(SUM(difficulte * priorite), 0) as points FROM habits h JOIN habit_completions hc ON h.id = hc.habit_id WHERE hc.date_completion = $1",
        [date]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors du calcul des points." });
    }
  });
  
  // Nouvel endpoint pour récupérer les points du mois en cours
  app.get("/api/points/month", async (req, res) => {
    try {
      // Calculer la date de début et de fin du mois en cours
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
      // Utiliser le format "YYYY-MM-DD" en locale canadienne pour être cohérent
      const startStr = startOfMonth.toLocaleDateString("en-CA");
      const endStr = endOfMonth.toLocaleDateString("en-CA");
  
      const result = await query(
        `SELECT to_char(hc.date_completion, 'YYYY-MM-DD') as day,
                COALESCE(SUM(h.difficulte * h.priorite), 0) as points
         FROM habits h
         JOIN habit_completions hc ON h.id = hc.habit_id
         WHERE hc.date_completion BETWEEN $1 AND $2
         GROUP BY day
         ORDER BY day`,
        [startStr, endStr]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors du calcul des points du mois." });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
