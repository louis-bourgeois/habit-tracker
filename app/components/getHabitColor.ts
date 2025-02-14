// components/getHabitColor.ts
export const getHabitColor = (streak: number, missed: boolean, archived = false): string => {
  if (archived) return "bg-gray-600"; // Pour les habits archivées, couleur sombre
  if (missed) return "bg-red-600";
  if (streak < 2) return "bg-gray-400";
  if (streak >= 2 && streak < 21) {
    return streak < 10 ? "bg-blue-500" : "bg-teal-500";
  }
  if (streak >= 21 && streak < 66) {
    return streak < 40 ? "bg-green-300" : "bg-green-600";
  }
  return "bg-green-800";
};
