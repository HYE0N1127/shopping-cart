export const generateId = (length = 10) => {
  const char = "abcdefghijklmnopqrstuvwxyz0123456789";

  const chars = Array.from({ length }, () => {
    const index = Math.round(Math.random() * char.length);

    return char[index];
  });

  return chars.join("");
};
