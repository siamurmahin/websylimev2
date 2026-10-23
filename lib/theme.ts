export type Theme = "light" | "dark";

export const THEME_KEY = "theme";
export const THEME_EVENT = "themechange";

/** Runs in <head> before first paint so the saved theme never flashes. */
export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;
