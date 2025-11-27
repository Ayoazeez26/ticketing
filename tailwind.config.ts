import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        'biorhyme': ['BioRhyme', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        grey: "#2B2B2B",
        brown: "#A35E05",
        lime: "#BFF3CF",
        green: "#184F2C",
        "green-2": "#1B7339",
        "grey-2": "#C4C4C4",
        "grey-3": "#757575",
      },
      backgroundImage: {
        "hero-bg": "url(/img/landing-hero.webp)",
        "hero-bg-mob": "url(/img/landing-hero-mob.webp)",
      },
    },
  },
};