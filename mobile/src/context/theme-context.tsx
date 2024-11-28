import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../styles/theme";

type ThemeContextType = {
  theme: typeof lightTheme;
  setTheme: React.Dispatch<React.SetStateAction<typeof lightTheme>>;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(
    scheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(scheme === "dark" ? darkTheme : lightTheme);
  }, [scheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };
  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
