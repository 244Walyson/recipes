// src/styles/themes.js
import colors from "./colors";

export const lightTheme = {
  background: colors.white, // Fundo principal claro
  foreground: colors.black,
  backgroundSecondary: colors.septenary,
  cardBackground: colors.tertiary, // Fundo dos cartões ou seções
  text: colors.black, // Texto principal em preto
  primary: colors.primary, // Cores de destaque principal (botões, links)
  secondary: colors.secondary, // Cor de destaque secundária
  accent: colors.quaternary, // Cor de ênfase (ícones, bordas)
  inputBackground: colors.septenary, // Cor de fundo do TextInput
  tertiary: colors.septenary,
  quaternary: colors.octonary,
  secondaryText: colors.tertiary,
  opacityBg: colors.opacityBg,
  suggestionBg: colors.nonary,
  error: colors.error,
  success: colors.success,
};

export const darkTheme = {
  background: colors.dark, // Fundo principal escuro
  foreground: colors.white,
  backgroundSecondary: colors.denary,
  cardBackground: colors.quinary, // Fundo dos cartões ou seções
  text: colors.white, // Texto principal em branco
  primary: colors.primary, // Cor de destaque principal (botões, links)
  secondary: colors.secondary, // Cor de destaque secundária
  accent: colors.sextiary, // Cor de ênfase (ícones, bordas)
  tertiary: colors.septenary,
  quaternary: colors.septenary,
  inputBackground: colors.quinary, // Cor de fundo do TextInput no tema escuro
  secondaryText: colors.tertiary,
  opacityBg: colors.opacityBgDark,
  suggestionBg: colors.nonary,
  error: colors.error,
  success: colors.success,
};
