import { Archivo, Montserrat } from "next/font/google";

/**
 * Tipografía corporativa — Gotham (light / book / bold / black).
 * Montserrat es el sustituto más cercano disponible en Google Fonts.
 * Si se consigue la licencia web de Gotham, reemplazar por next/font/local
 * con los archivos en public/assets/fonts y conservar la misma variable.
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

/**
 * Tipografía secundaria — Berthold Akzidenz Grotesk (light / condensed / bold).
 * Archivo con eje de ancho (wdth) cubre la versión condensada.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = `${montserrat.variable} ${archivo.variable}`;
