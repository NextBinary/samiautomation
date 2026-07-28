/**
 * Render a CMS price for display.
 *
 * The price field is free text rather than a number, because a quote is often a
 * range ("5000-20000") rather than one figure. Plain numbers still get thousand
 * separators; a range is split so each side carries the currency mark; anything
 * with no digits at all ("Call for price") is shown exactly as typed.
 */
const group = (digits) => Number(digits.replace(/,/g, "")).toLocaleString("en-US");

export const formatPrice = (value) => {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (!/\d/.test(text)) return text;

  const range = text.match(/^(\d[\d,]*)\s*[-–—]\s*(\d[\d,]*)$/);
  if (range) return `৳${group(range[1])} – ৳${group(range[2])}`;

  if (/^\d[\d,]*(\.\d+)?$/.test(text)) return `৳${group(text)}`;

  return text;
};
