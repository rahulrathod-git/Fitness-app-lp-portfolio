import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import ThemeContext from "../components/ThemeContext";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "../hooks/useTranslation";

// Import screens
import WelcomeScreen from "../screens/Welcome";
import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import SignUpScreen from "../screens/SignUp";
import ForgotPasswordScreen from "../screens/ForgotPass";
import WorkoutDetailsScreen from "../screens/WorkoutDetails";
import ArticleDetailsScreen from "../screens/ArticleDetails";
import PackageDetailsScreen from "../screens/PackageDetails";
import UserProfileScreen from "../screens/UserProfile";
import BookScreen from "../screens/BookScreen";

// Auth Stack - handles authentication flow
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Settings: undefined;
};

// Tab navigator type - main app tabs
export type MainTabParamList = {
  HomeTab: undefined;
  BookTab: undefined;
  ProfileTab: undefined;
};

// Main App Stack - handles authenticated user screens
export type AppStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
  WorkoutDetails: { itemId: string };
  ArticleDetails: { itemId: string };
  PackageDetails: { itemId: string };
};

// Root Stack - handles top-level navigation
export type RootStackParamList = AuthStackParamList & AppStackParamList;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Authentication Stack Navigator
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="Settings" component={SettingsScreen} />
    </AuthStack.Navigator>
  );
};

// Main Tab Navigator - authenticated users see this
const MainTabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Feather.glyphMap;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "BookTab") {
            iconName = "calendar";
          } else if (route.name === "ProfileTab") {
            iconName = "user";
          } else {
            iconName = "circle";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: isDark ? "#666666" : "#999999",
        tabBarStyle: {
          backgroundColor: isDark ? "#1A1A1A" : "white",
          borderTopWidth: 0,
          borderTopColor: isDark ? "#404040" : "#E5E5E5",
          paddingVertical: 8,
          paddingBottom: 20,
          height: 90,
          paddingTop: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
          color: isDark ? "#AAAAAA" : undefined,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: t('home') }}
      />
      <Tab.Screen
        name="BookTab"
        component={BookScreen}
        options={{ tabBarLabel: t('book') }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={UserProfileScreen}
        options={{ tabBarLabel: t('profile') }}
      />
    </Tab.Navigator>
  );
};

// App Stack Navigator - handles main app flow after authentication
const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="MainTabs" component={MainTabNavigator} />
      <AppStack.Screen name="Settings" component={SettingsScreen} />
      <AppStack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <AppStack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
      <AppStack.Screen name="PackageDetails" component={PackageDetailsScreen} />
    </AppStack.Navigator>
  );
};

// Root Navigator - decides between Auth and App flows
const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  darkContainer: {
    backgroundColor: "#0F0F0F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  darkHeader: {
    backgroundColor: "#1A1A1A",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#8B5CF6",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileIconText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  darkText: {
    color: "white",
  },
  darkSubText: {
    color: "#AAAAAA",
  },
});

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default Navigation;