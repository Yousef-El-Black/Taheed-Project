// Create A Random Code from 6 Numbers
export const createVerificationCode = () => {
  return [
    (Math.random() * 10 - 1).toFixed(0),
    (Math.random() * 10 - 1).toFixed(0),
    (Math.random() * 10 - 1).toFixed(0),
    (Math.random() * 10 - 1).toFixed(0),
    (Math.random() * 10 - 1).toFixed(0),
    (Math.random() * 10 - 1).toFixed(0),
  ]
    .join("")
    .replace(/-/g, "");
};
