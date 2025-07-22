import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import ThemeContext from "./components/ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import Navigation from "./components/Navigation";
import { ALL_IMAGES } from "./constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageProvider } from "./components/LanguageContext";

SplashScreen.preventAutoHideAsync();
const THEME_STORAGE_KEY = "user_theme";

function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || "light");
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setTheme(savedTheme as "light" | "dark");
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
      } finally {
        setIsThemeLoading(false);
      }
    };

    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (!isThemeLoading) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, theme).catch((error) =>
        console.error("Failed to save theme to storage", error),
      );
    }
  }, [theme, isThemeLoading]);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        console.log("Starting Expo Image preload with quality settings...");

        const preloadPromises = ALL_IMAGES.map((imageSource) =>
          Image.prefetch(imageSource, {
            cachePolicy: "memory-disk",
            headers: {
              "Cache-Control": "max-age=3600",
            },
          }).catch(() => {
            return null;
          }),
        );

        await Promise.allSettled(preloadPromises);
        console.log("Image preloading completed!");

        setImagesLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        setImagesLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    preloadImages();
  }, []);

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (!isThemeLoading && imagesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isThemeLoading, imagesLoaded]);

  if (isThemeLoading || !imagesLoaded) {
    return null;
  }

  return (
  <LanguageProvider>
    <ThemeContext.Provider value={themeContextValue}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ThemeContext.Provider>
  </LanguageProvider>
  );
}

export default App;