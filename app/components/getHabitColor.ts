// components/getHabitColor.ts

// Fonction d'interpolation entre deux couleurs hexadécimales
function interpolateColor(color1: string, color2: string, factor: number = 0.5): string {
  // Retirer le '#' si présent
  if (color1.startsWith("#")) color1 = color1.slice(1);
  if (color2.startsWith("#")) color2 = color2.slice(1);

  const r1 = parseInt(color1.substring(0, 2), 16);
  const g1 = parseInt(color1.substring(2, 4), 16);
  const b1 = parseInt(color1.substring(4, 6), 16);

  const r2 = parseInt(color2.substring(0, 2), 16);
  const g2 = parseInt(color2.substring(2, 4), 16);
  const b2 = parseInt(color2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  const hex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/**
 * Renvoie un objet de style avec une couleur de fond calculée dynamiquement.
 * Les paliers sont :
 * - missed: rouge (#dc2626)
 * - streak < 2: gris (#9ca3af)
 * - 2 <= streak < 21: interpolation entre bleu (#3b82f6) et turquoise (#14b8a6)
 * - 21 <= streak < 66: interpolation entre vert clair (#86efac) et vert moyen (#16a34a)
 * - streak >= 66: vert foncé (#15803d)
 */
export const getHabitColor = (streak: number, missed: boolean): React.CSSProperties => {
  if (missed) return { backgroundColor: "#dc2626" }; // bg-red-600
  if (streak < 2) return { backgroundColor: "#9ca3af" }; // bg-gray-400
  if (streak >= 2 && streak < 21) {
    const factor = (streak - 2) / (21 - 2); // factor entre 0 et 1
    const interpolated = interpolateColor("#3b82f6", "#14b8a6", factor);
    return { backgroundColor: interpolated };
  }
  if (streak >= 21 && streak < 66) {
    const factor = (streak - 21) / (66 - 21);
    const interpolated = interpolateColor("#86efac", "#16a34a", factor);
    return { backgroundColor: interpolated };
  }
  return { backgroundColor: "#15803d" }; // bg-green-800
};
