// components/HabitForm.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export interface HabitData {
  id?: number;
  nom: string;
  section_id?: number;
  difficulte: number;
  priorite: number;
}

interface HabitFormProps {
  initialData?: HabitData;
  onClose: () => void;
  onSave: (data: HabitData) => void;
}

const HabitForm = ({ initialData, onClose, onSave }: HabitFormProps) => {
  const [nom, setNom] = useState(initialData?.nom || "");
  const [difficulte, setDifficulte] = useState(initialData?.difficulte || 1);
  const [priorite, setPriorite] = useState(initialData?.priorite || 1);
  const [sections, setSections] = useState<any[]>([]);
  const [sectionId, setSectionId] = useState(initialData?.section_id || null);

  useEffect(() => {
    axios
      .get("/api/sections")
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Erreur lors de la récupération des sections", err));
  }, []);

  const submitHabit = () => {
    onSave({ nom, difficulte, priorite, section_id: sectionId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitHabit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      console.log("test")
      e.preventDefault();
      submitHabit();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  z-40"
      tabIndex={0}
      
    >
      <div className="p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Modifier l'habitude" : "Nouvelle habitude"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nom de l'habitude"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
            required
            onKeyDown={handleKeyDown}
          />
          <div>
            <label className="block mb-1">Difficulté:</label>
            <select
              value={difficulte}
              onChange={(e) => setDifficulte(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Priorité:</label>
            <select
              value={priorite}
              onChange={(e) => setPriorite(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Section:</label>
            <select
              value={sectionId || ""}
              onChange={(e) => setSectionId(e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            >
              <option value="">Aucune</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
