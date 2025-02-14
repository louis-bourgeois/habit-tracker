"use client";


import DailyQuote from "./components/DailyQuote";
import HabitsList from "./components/HabitsList";



export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome Louis ! You are incredible</h1>
      </header>
      <main>
        <DailyQuote />
        <HabitsList />
      </main>
    </div>
  );}