import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonhov: "#20c0ac",
        main: "#83DDD3",
        white: "#FEFFFF",
        heading: "#00BFA5",
        subheading: "#1E256C",
        maintext: "#1E256C",
        primarytext: "#1A1A1A",
        paragraphtext: "#5F6E78",
        backgroundcolor: "#F8FCFD",
        button: "#83DDD3",
        hoverbutton: "#20C0AC",
        subbutton: "#1E256C",
        hoversubbutton: "#172061",
        homepagebackground: "#83ddd3",
        hovernavlink: "#13cbb7",
        maincolorincontactform: "#1e6a66",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
