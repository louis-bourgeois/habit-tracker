// src/routes/habits.ts
import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();

// Récupérer toutes les habitudes non archivées
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM habits WHERE archive = false ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des habitudes.' });
  }
});

// Créer une nouvelle habitude
router.post('/', async (req: Request, res: Response) => {
  const { nom, section_id, difficulte, priorite } = req.body;
  try {
    const result = await query(
      `INSERT INTO habits (nom, section_id, difficulte, priorite) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom, section_id, difficulte, priorite]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'habitude.' });
  }
});

// Modifier une habitude
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nom, section_id, difficulte, priorite } = req.body;
  try {
    const result = await query(
      `UPDATE habits SET nom = $1, section_id = $2, difficulte = $3, priorite = $4 WHERE id = $5 RETURNING *`,
      [nom, section_id, difficulte, priorite, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la modification de l\'habitude.' });
  }
});

// Archiver une habitude (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query(
      `UPDATE habits SET archive = true WHERE id = $1 RETURNING *`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'archivage de l\'habitude.' });
  }
});

export default router;
