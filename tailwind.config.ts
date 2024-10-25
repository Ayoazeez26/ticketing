import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
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
        "hero-bg": "url(/img/home-img.webp)",
        "bero-bg-mob": "url(/img/home-mob-img.webp)",
      },
    },
  },
};