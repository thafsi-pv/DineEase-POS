export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const getRandomDarkColor = () => {
  const darkColors = ["red", "green", "yellow", "indigo", "purple", "pink"];
  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};
