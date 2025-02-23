export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);