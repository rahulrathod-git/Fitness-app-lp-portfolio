import ThemeContext from "../components/ThemeContext";
import { useLanguage } from "../components/LanguageContext";
import { LANGUAGES, LanguageKey } from "../constants/translations";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const onNavigateBack = () => navigation.goBack();

  const { theme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === "dark";

  const onThemeChange = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
  };

  const onLanguageChange = (selectedLanguage: LanguageKey) => {
    setLanguage(selectedLanguage);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={[styles.header, isDark && styles.darkHeader]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={onNavigateBack}
            activeOpacity={0.7}
          >
            <Feather
              name="arrow-left"
              size={24}
              color={isDark ? "white" : "#333"}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.darkText]}>
            {t('settings')}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Language Settings */}
        <View style={[styles.settingsCard, isDark && styles.darkCard]}>
          <Text style={[styles.settingsTitle, isDark && styles.darkText]}>
            {t('language')}
          </Text>

          {Object.entries(LANGUAGES).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.option,
                isDark && styles.darkOption,
                language === key && (isDark ? styles.darkSelectedOption : styles.selectedOption),
              ]}
              onPress={() => onLanguageChange(key as LanguageKey)}
            >
              <Text
                style={[
                  styles.optionText,
                  isDark && styles.darkOptionText,
                  language === key && (isDark ? styles.darkSelectedOptionText : styles.selectedOptionText),
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Settings */}
        <View style={[styles.settingsCard, isDark && styles.darkCard]}>
          <Text style={[styles.settingsTitle, isDark && styles.darkText]}>
            {t('appearance')}
          </Text>

          <TouchableOpacity
            style={[
              styles.option,
              isDark && styles.darkOption,
              theme === "light" && styles.selectedOption,
            ]}
            onPress={() => onThemeChange("light")}
          >
            <Text
              style={[
                styles.optionText,
                isDark && styles.darkOptionText,
                theme === "light" && styles.selectedOptionText,
              ]}
            >
              {t('lightMode')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              isDark && styles.darkOption,
              theme === "dark" && styles.darkSelectedOption,
            ]}
            onPress={() => onThemeChange("dark")}
          >
            <Text
              style={[
                styles.optionText,
                isDark && styles.darkOptionText,
                theme === "dark" && styles.darkSelectedOptionText,
              ]}
            >
              {t('darkMode')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  darkContainer: {
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  darkHeader: {
    backgroundColor: "#2A2A2A",
    borderBottomColor: "#404040",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  darkText: {
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  settingsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: "#2A2A2A",
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
  },
  darkOption: {
    backgroundColor: "#404040",
  },
  selectedOption: {
    backgroundColor: "#E5E7FF",
  },
  darkSelectedOption: {
    backgroundColor: "#8B5CF6",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  darkOptionText: {
    color: "#E0E0E0",
  },
  selectedOptionText: {
    color: "#8B5CF6",
    fontWeight: "600",
  },
  darkSelectedOptionText: {
    color: "white",
    fontWeight: "600",
  },
});

export default Settings;