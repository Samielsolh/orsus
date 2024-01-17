// colorUtils.js

// Function to generate a pastel color based on the category string
export const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const hue = (hash % 360); // Hue: Selects the color
    const saturation = 60 + (hash % 40); // Saturation: 60%-100% (for pastel colors)
    const lightness = 85; // Lightness: Around 85% (for pastel colors)
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  