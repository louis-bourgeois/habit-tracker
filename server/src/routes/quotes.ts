import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();

/**
 * GET /api/quotes/today
 * Renvoie une citation déterminée par le jour de l'année.
 * Ainsi, la citation reste fixe pendant toute la journée, puis change le lendemain.
 */
router.get('/today', async (req: Request, res: Response) => {
  try {
    // Récupérer le nombre total de citations
    const countResult = await query("SELECT COUNT(*) as total FROM quotes");
    const total = parseInt(countResult.rows[0].total, 10);
    
    if (total === 0) {
      return res.status(404).json({ error: "Aucune citation trouvée." });
    }
    
    // Récupérer le jour de l'année (DOY) pour la date du jour
    const doyResult = await query("SELECT EXTRACT(DOY FROM CURRENT_DATE) as doy");
    const doy = parseInt(doyResult.rows[0].doy, 10);
    
    // Calculer l'offset : (jour_de_l'année - 1) modulo total
    const offset = (doy - 1) % total;
    
    // Sélectionner la citation à l'offset calculé
    const result = await query("SELECT * FROM quotes OFFSET $1 LIMIT 1", [offset]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur dans /api/quotes/today :", err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la citation.' });
  }
});

export default router;
