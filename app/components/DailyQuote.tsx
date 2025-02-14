// components/DailyQuote.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Quote {
  citation: string;
  auteur: string;
}

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    axios
      .get("/api/quotes/today")
      .then((res) => setQuote(res.data))
      .catch((err) =>
        console.error("Erreur lors de la récupération de la citation", err)
      );
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-lg my-4 border border-white">
      {quote ? (
        <>
          <p className="italic text-lg">"{quote.citation}"</p>
          <p className="text-right mt-2 font-semibold">— {quote.auteur}</p>
        </>
      ) : (
        <p>Chargement de la citation...</p>
      )}
    </div>
  );
};

export default DailyQuote;
