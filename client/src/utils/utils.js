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

export const convertToWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];

  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const magnitudeNames = ["", "Thousand", "Million", "Billion", "Trillion"];

  function convertGroup(num) {
    const parts = [];

    if (num >= 100) {
      parts.push(ones[Math.floor(num / 100)] + " Hundred");
      num %= 100;
    }

    if (num >= 10 && num <= 19) {
      parts.push(teens[num - 10]);
    } else {
      parts.push(tens[Math.floor(num / 10)]);
      parts.push(ones[num % 10]);
    }

    const filteredParts = parts.filter((part) => part !== "");
    
    if (filteredParts.length > 0) {
      filteredParts.push("Only");
    }

    return filteredParts.join(" ");
  }

  if (num === 0) {
    return "Zero";
  }

  let result = "";
  let magnitudeIndex = 0;

  while (num > 0) {
    const group = num % 1000;
    if (group !== 0) {
      result =
        convertGroup(group) +
        " " +
        magnitudeNames[magnitudeIndex] +
        " " +
        result;
    }
    num = Math.floor(num / 1000);
    magnitudeIndex++;
  }

  // Capitalize only the first letter of the entire result
  return result.charAt(0).toUpperCase() + result.slice(1).trim();
};

