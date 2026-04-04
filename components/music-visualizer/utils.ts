export const calculateBarData = (
  frequencyData: Uint8Array,
  width: number,
  barWidth: number,
  gap: number,
): number[] => {
  let units = width / (barWidth + gap);
  let step = Math.floor(frequencyData.length / units);

  if (units > frequencyData.length) {
    units = frequencyData.length;
    step = 1;
  }

  const data: number[] = [];

  for (let i = 0; i < units; i++) {
    let sum = 0;

    for (let j = 0; j < step && i * step + j < frequencyData.length; j++) {
      sum += frequencyData[i * step + j];
    }
    data.push(sum / step);
  }
  return data;
};

export const draw = (
  data: number[],
  canvas: HTMLCanvasElement,
  barWidth: number,
  gap: number,
  backgroundColor: string,
  barColor: string,
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (backgroundColor !== "transparent") {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.fillStyle = barColor;
  const hasRoundRect = typeof ctx.roundRect === "function";

  if (hasRoundRect) {
    ctx.beginPath();
  }

  data.forEach((dp, i) => {
    const x = i * (barWidth + gap);
    const y = canvas.height - (dp || 1) / 2;
    const w = barWidth;
    const h = dp || 1;

    if (hasRoundRect) {
      // making sure roundRect is supported by the browser
      ctx.roundRect(x, y, w, h, 20);
    } else {
      // fallback for browsers that do not support roundRect
      ctx.fillRect(x, y, w, h);
    }
  });

  if (hasRoundRect) {
    ctx.fill();
  }
};
