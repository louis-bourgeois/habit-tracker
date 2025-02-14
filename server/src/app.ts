// server/src/app.ts
import express from "express";
import cors from "cors";
import habitsRoutes from "./routes/habits";
import completionsRoutes from "./routes/completions";
import quotesRoutes from "./routes/quotes"; // si nécessaire

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/habits", habitsRoutes);
app.use("/api/completions", completionsRoutes);
app.use("/api/quotes", quotesRoutes);

// Exemple d'endpoint pour récupérer les points du jour
app.get("/api/points/today", async (req, res) => {
  const { date } = req.query; // date au format "YYYY-MM-DD"
  try {
    const result = await import("./db").then(mod => mod.query(
      "SELECT COALESCE(SUM(difficulte * priorite), 0) as points FROM habits h JOIN habit_completions hc ON h.id = hc.habit_id WHERE hc.date_completion = $1",
      [date]
    ));
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du calcul des points." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
