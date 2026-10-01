// Entirely synthetic, hand-defined public fixture. Never a real asset record.
export const vibration = [2.0, 2.2, 2.1, 2.5, 3.2, 3.4];
export const timestamps = vibration.map(
  (_, i) => `2026-09-0${i + 1}T12:00:00Z`,
);
const mean = (values: number[]) =>
  values.reduce((a, b) => a + b, 0) / values.length;
export const firstMean = mean(vibration.slice(0, 3));
export const lastMean = mean(vibration.slice(3));
export const percentageChange = (lastMean / firstMean - 1) * 100;
export const method = "vibration-window-mean v1";
