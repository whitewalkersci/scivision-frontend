const AnnotationType = { // Assuming you have this enum defined
  RECTANGLE: 'rectangle',
  TEXT: 'text',
};

export const annotations = () => {
  const sampleAnnotations = [
    {
      id: 'rect1',
      type: AnnotationType.RECTANGLE,
      x: 50,
      y: 60,
      width: 150,
      height: 100,
      stroke: '#E53E3E', // Red-600
      strokeWidth: 3,
      text: 'Feature A',
      fill: 'rgba(229, 62, 62, 0.25)', // Transparent Red
      draggable: true,
    },
    {
      id: 'rect2',
      type: AnnotationType.RECTANGLE,
      x: 250,
      y: 180,
      width: 200,
      height: 120,
      stroke: '#3182CE', // Blue-600
      strokeWidth: 2,
      text: 'Zone B',
      fill: 'rgba(49, 130, 206, 0.3)', // Transparent Blue
      draggable: true,
    },
    {
      id: 'text1',
      type: AnnotationType.TEXT,
      x: 480,
      y: 70,
      text: 'Important Highlight',
      fill: '#38A169', // Green-600
      fontSize: 22,
      draggable: true,
      stroke: '#2F855A', // Green-700 for slight depth
      strokeWidth: 0.5,
    },
    {
      id: 'rect3',
      type: AnnotationType.RECTANGLE,
      x: 500,
      y: 320,
      width: 220,
      height: 160,
      stroke: '#D69E2E', // Yellow-600 (Amber)
      strokeWidth: 3,
      text: 'Area C',
      fill: 'rgba(214, 158, 46, 0.2)', // Transparent Amber
      draggable: false, // Example of non-draggable
    },
    {
      id: 'text2',
      type: AnnotationType.TEXT,
      x: 80,
      y: 450,
      text: 'Notes:\n- Detail X\n- Detail Y',
      fill: '#6B46C1', // Purple-600
      fontSize: 16,
      draggable: true,
    },
  ];
  return sampleAnnotations;
};


export const brightColors = [
    "#FF5733", // Bright Orange
    "#FF69B4", // Hot Pink
    "#FFD700", // Gold
    "#00FFFF", // Aqua
    "#ADFF2F", // Green Yellow
    "#00FF7F", // Spring Green
    "#FFA07A", // Light Salmon
    "#7CFC00", // Lawn Green
    "#FFB6C1", // Light Pink
    "#FF00FF", // Fuchsia / Magenta
    "#87CEFA", // Light Sky Blue
    "#FFFF00", // Yellow
    "#40E0D0", // Turquoise
    "#E0FFFF", // Light Cyan
    "#FF1493", // Deep Pink
    "#98FB98", // Pale GreenconvertAnnotations
    "#F0E68C", // Khaki
    "#DA70D6", // Orchid
    "#FFE4B5", // Moccasin
    "#FFC0CB", // Pink
  ];