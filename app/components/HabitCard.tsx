// components/HabitCard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Habit } from "./HabitsList";
import { getHabitColor } from "./getHabitColor";

interface HabitCardProps {
  habit: Habit;
  onToggle: (habit: Habit) => void;
  onUpdate: (habit: Habit, newNom: string, newDif: number, newPri: number) => void;
  onDelete: (habitId: number) => void;
}

const HabitCard = ({ habit, onToggle, onUpdate, onDelete }: HabitCardProps) => {
  const [editing, setEditing] = useState(false);
  const [nom, setNom] = useState(habit.nom);
  const [dif, setDif] = useState(habit.difficulte);
  const [pri, setPri] = useState(habit.priorite);

  const handleSave = () => {
    onUpdate(habit, nom, dif, pri);
    setEditing(false);
  };

  return (
    <motion.div
      className={`flex items-center p-3 rounded-lg shadow-md transition-all duration-300 overflow-hidden ${getHabitColor(
        habit.streak,
        habit.missed,
        habit.archive
      )}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 ml-1">
        {editing ? (
          <>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="p-1 border rounded-lg w-full mb-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
            <div className="flex gap-2 mb-1">
              <select
                value={dif}
                onChange={(e) => setDif(Number(e.target.value))}
                className="p-1 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {[1,2,3,4,5].map(val => <option key={val} value={val}>Difficulté {val}</option>)}
              </select>
              <select
                value={pri}
                onChange={(e) => setPri(Number(e.target.value))}
                className="p-1 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {[1,2,3,4,5].map(val => <option key={val} value={val}>Priorité {val}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} title="Enregistrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button onClick={() => setEditing(false)} title="Annuler">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div onClick={() => setEditing(true)} className="cursor-pointer">
            <h3 className="font-bold text-white text-xl">{habit.nom}</h3>
            <p className="text-white text-sm">Difficulté: {habit.difficulte} / Priorité: {habit.priorite}</p>
            <p className="text-white text-lg font-bold mt-1">
              {habit.streak} {habit.streak > 1 ? "jours" : "jour"}
            </p>
          </div>
        )}
      </div>
      {/* Actions : Toggle et Supprimer */}
      <div className="flex flex-col justify-between h-full">
        <button onClick={() => onToggle(habit)} className="focus:outline-none py-3" title="Cocher / Décochez">
          { !habit.missed ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </motion.svg>
          ) : (
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
        <button onClick={() => onDelete(habit.id)} className="focus:outline-none  py-3" title="Supprimer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default HabitCard;
