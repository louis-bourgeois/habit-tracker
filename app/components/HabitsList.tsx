// components/HabitsList.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "./HabitCard";

export interface Habit {
  id: number;
  nom: string;
  difficulte: number;
  priorite: number;
  archive: boolean;
  streak: number;
  missed: boolean;
}

const HabitsList = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(1);
  const [newPriority, setNewPriority] = useState(1);
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [maxPoints, setMaxPoints] = useState<number>(0);
  const today = new Date().toLocaleDateString("en-CA");

  const fetchHabits = async () => {
    try {
      const res = await axios.get("/api/habits");
      setHabits(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des habitudes", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPoints = async () => {
    try {
      const res = await axios.get(`/api/points/today?date=${today}`);
      setCurrentPoints(Number(res.data.points));
    } catch (err) {
      console.error("Erreur lors de la récupération des points", err);
    }
  };

  useEffect(() => {
    const total = habits.reduce(
      (acc, habit) => acc + habit.difficulte * habit.priorite,
      0
    );
    // On ajoute 1 pour s'assurer que la barre a toujours une échelle au-dessus de 0
    setMaxPoints(total + 1);
  }, [habits]);

  useEffect(() => {
    fetchHabits();
    fetchPoints();
  }, []);

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;
    try {
      await axios.post("/api/habits", {
        nom: newHabitName,
        difficulte: newDifficulty,
        priorite: newPriority,
      });
      await fetchHabits();
      setNewHabitName("");
      setNewDifficulty(1);
      setNewPriority(1);
      setShowForm(false);
      fetchPoints();
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'habitude", err);
    }
  };

  const handleToggle = async (habit: Habit) => {
    try {
      await axios.post("/api/completions/toggle", {
        habit_id: habit.id,
        date_completion: today,
      });
      await fetchHabits();
      await fetchPoints();
    } catch (err) {
      console.error("Erreur lors du toggle de complétion", err);
    }
  };

  const handleUpdate = async (habit: Habit, newNom: string, newDif: number, newPri: number) => {
    try {
      await axios.put(`/api/habits/${habit.id}`, {
        nom: newNom,
        difficulte: newDif,
        priorite: newPri,
      });
      await fetchHabits();
      await fetchPoints();
    } catch (err) {
      console.error("Erreur lors de la modification de l'habitude", err);
    }
  };

  const handleDelete = async (habitId: number) => {
    try {
      await axios.delete(`/api/habits/${habitId}`);
      await fetchHabits();
      await fetchPoints();
    } catch (err) {
      console.error("Erreur lors de la suppression de l'habitude", err);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-700">Chargement...</p>
    );

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Points du jour : <span className="text-[#CD985A]">{currentPoints}</span> sur <span className="text-[#CD985A]">{maxPoints}</span>
        </h2>
      </div>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {showForm ? "Fermer le formulaire" : "Ajouter une habitude"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-white rounded-lg shadow">
          <input
            type="text"
            placeholder="Nom de l'habitude"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="p-2 border rounded-lg w-full mb-2 border border-white text-white bg-black"
          />
          <div className="flex gap-2 mb-2">
            <select
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(Number(e.target.value))}
              className="p-2 border rounded-lg border border-white text-white bg-black"
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  Difficulté {val}
                </option>
              ))}
            </select>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(Number(e.target.value))}
              className="p-2 border rounded-lg border border-white text-white bg-black"
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  Priorité {val}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddHabit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Créer l'habitude
          </button>
        </div>
      )}

      {/* Utilisation d'une grille responsive pour afficher les HabitCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitsList;
