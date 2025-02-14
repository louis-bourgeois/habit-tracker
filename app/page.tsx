"use client";

import { useEffect, useState } from "react";
import DailyQuote from "./components/DailyQuote";
import HabitsList from "./components/HabitsList";
import LinkContainer from "./components/LinkContainer";
import GraphComponent from "./components/GraphComponent";

// Liste d'adjectifs avec leur langue d'origine
const motivationalAdjectives = [
  // Anglais
  { word: "motivated", lang: "en" },
  { word: "confident", lang: "en" },
  { word: "determined", lang: "en" },
  { word: "inspired", lang: "en" },
  { word: "empowered", lang: "en" },
  { word: "resilient", lang: "en" },
  { word: "courageous", lang: "en" },
  { word: "ambitious", lang: "en" },
  { word: "driven", lang: "en" },
  { word: "optimistic", lang: "en" },
  { word: "passionate", lang: "en" },
  { word: "focused", lang: "en" },
  { word: "persistent", lang: "en" },
  { word: "undaunted", lang: "en" },
  { word: "fearless", lang: "en" },
  { word: "dynamic", lang: "en" },
  { word: "tenacious", lang: "en" },
  { word: "self-assured", lang: "en" },
  { word: "visionary", lang: "en" },
  { word: "bold", lang: "en" },
  { word: "full of potential", lang: "en" },
  { word: "spirited", lang: "en" },
  { word: "energetic", lang: "en" },
  { word: "steadfast", lang: "en" },
  // Français
  { word: "motivant", lang: "fr" },
  { word: "confiant", lang: "fr" },
  { word: "déterminé", lang: "fr" },
  { word: "inspirant", lang: "fr" },
  { word: "autonome", lang: "fr" },
  { word: "résilient", lang: "fr" },
  { word: "courageux", lang: "fr" },
  { word: "ambitieux", lang: "fr" },
  { word: "persévérant", lang: "fr" },
  { word: "optimiste", lang: "fr" },
  { word: "passionné", lang: "fr" },
  { word: "focalisé", lang: "fr" },
  { word: "persistant", lang: "fr" },
  { word: "intrépide", lang: "fr" },
  { word: "dynamique", lang: "fr" },
  { word: "tenace", lang: "fr" },
  { word: "assuré", lang: "fr" },
  { word: "visionnaire", lang: "fr" },
  { word: "audacieux", lang: "fr" },
  { word: "énergique", lang: "fr" },
  { word: "inébranlable", lang: "fr" },
  { word: "plein d'assurance", lang: "fr" }
];

export default function HomePage() {
  // On initialise avec une chaîne vide pour éviter les problèmes d'hydratation
  const [randomAdjObj, setRandomAdjObj] = useState<{ word: string; lang: string } | null>(null);

  useEffect(() => {
    // Une fois monté côté client, on sélectionne un adjectif aléatoire
    const random = motivationalAdjectives[Math.floor(Math.random() * motivationalAdjectives.length)];
    setRandomAdjObj(random);
  }, []);

  // Définir la direction de traduction en fonction de la langue d'origine :
  // si l'adjectif est en anglais, traduire de "en" à "fr", sinon de "fr" à "en"
  const sourceLang = randomAdjObj?.lang || "en";
  const targetLang = randomAdjObj?.lang === "en" ? "fr" : "en";

  // Construction de l'URL pour DeepL (on encode l'adjectif)
  const deeplUrl = randomAdjObj
    ? `https://www.deepl.com/en/translator#${sourceLang}/${targetLang}/${encodeURIComponent(randomAdjObj.word)}`
    : "#";

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col justify-start h-[100vh]">
      <header className="flex justify-center items-center my-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-center">
            Welcome Louis! You are{" "}
            <span className="font-bold text-blue-500 capitalize">
              <a target="_blank" rel="noopener noreferrer" href={deeplUrl}>
                {randomAdjObj ? randomAdjObj.word : "-"}
              </a>
            </span>
          </h1>
        </div>
      </header>
      <LinkContainer/>
      <main className="mb-[5vh]">
        <DailyQuote />
        <HabitsList />
        <GraphComponent />
      </main>
    </div>
  );
}
