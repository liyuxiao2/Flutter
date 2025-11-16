/**
 * Shared style constants used across components
 */

export const colors = {
  primary: "#FC7A4B",
  secondary: "#97AEEF",
  text: "#474747",
  background: "#FBFBFB",
  cardBackground: "#F5F4F4",
} as const;

export const badgeStyles = {
  orange: "text-white px-2 py-0.5 rounded-full bg-[#FC7A4B] text-sm",
  blue: "text-white px-2 py-0.5 rounded-full bg-[#97AEEF] text-sm",
  removable: "bg-[#97AEEF] text-white hover:bg-[#7B97E8]",
} as const;

export const fonts = {
  heading: "font-['Alice']",
  body: "font-['Instrument_Sans']",
} as const;
