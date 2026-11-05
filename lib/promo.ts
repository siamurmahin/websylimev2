export const PROMO_KEY = "promo-free-design";

/** Runs in <head> before first paint so a dismissed bar never flashes. */
export const promoScript = `try{if(localStorage.getItem("${PROMO_KEY}")==="off")document.documentElement.dataset.promo="off"}catch(e){}`;
