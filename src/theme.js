import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#0f2342",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        blueAccent: {
          100: "#d0e2f6",
          200: "#a1c5ed",
          300: "#73a7e3",
          400: "#448ada",
          500: "#156dd1",
          600: "#1157a7",
          700: "#0d417d",
          800: "#082c54",
          900: "#04162a"
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        blueAccent: {
          100: "#04162a",
          200: "#082c54",
          300: "#0d417d",
          400: "#1157a7",
          500: "#156dd1",
          600: "#448ada",
          700: "#73a7e3",
          800: "#a1c5ed",
          900: "#d0e2f6",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[600],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[100],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[500],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize:12,
        h1:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:40,
        },
        h2:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:32,
        },
        h3:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:24,
        },
        h4:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:20,
        },
        h5:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:16 ,
        },
        h6:{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontSize:14,
        },
    }
  };
};


export const ColorModeContext  = createContext({
    toggleColorMode:() => {}
});

export const useMode = () => {
  const savedMode = localStorage.getItem("colorMode") || "dark";
    const [mode, setMode] = useState(savedMode);
    

    useEffect(() => {
      localStorage.setItem("colorMode", mode)
    },[mode])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
            setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    )
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}