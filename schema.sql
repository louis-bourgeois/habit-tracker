-- Création de la table "sections"
CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  position INTEGER DEFAULT 0
);

-- Création de la table "habits"
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  section_id INTEGER REFERENCES sections(id) ON DELETE SET NULL,
  difficulte INTEGER DEFAULT 1,
  priorite INTEGER DEFAULT 1,
  archive BOOLEAN DEFAULT false,
  date_creation DATE DEFAULT CURRENT_DATE
);

-- Création de la table "habit_completions"
CREATE TABLE habit_completions (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
  date_completion DATE NOT NULL,
  CONSTRAINT unique_completion UNIQUE (habit_id, date_completion)
);

-- Création de la table "quotes"
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  citation TEXT NOT NULL,
  auteur VARCHAR(100)
);

-- Fonction pour calculer les points quotidiens
CREATE OR REPLACE FUNCTION calculer_points(date_cible DATE)
RETURNS INTEGER AS $$
DECLARE
  total_points INTEGER;
BEGIN
  SELECT COALESCE(SUM(difficulte * priorite), 0)
  INTO total_points
  FROM habits h
  JOIN habit_completions hc ON h.id = hc.habit_id
  WHERE hc.date_completion = date_cible;
  
  RETURN total_points;
END;
$$ LANGUAGE plpgsql;

