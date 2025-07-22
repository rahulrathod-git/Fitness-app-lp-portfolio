import React, { useContext } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../components/Navigation";
import { getQuickWorkouts } from "../data/courses";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import ThemeContext from "../components/ThemeContext";
import { useTranslation } from "../hooks/useTranslation";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";

type CourseDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "WorkoutDetails"
>;

const WorkoutDetails = () => {
  const route = useRoute<CourseDetailScreenRouteProp>();
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  const { t, language } = useTranslation();
  const isDark = theme === "dark";

  const { itemId } = route.params;
  
  // Get workouts in current language
  const quickWorkouts = getQuickWorkouts(language);
  const workout = quickWorkouts.find((item) => item.id === itemId);

  // Quality settings for images
  const highQualityImageProps = {
    contentFit: "cover" as const,
    transition: 0,
    cachePolicy: "memory-disk" as const,
    priority: "high" as const,
    allowDownscaling: false,
    autoplay: false,
  };

  if (!workout) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
        <Text style={[styles.title, isDark && styles.darkText]}>
          {t('workoutNotFound')}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color={isDark ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.imageContainer}>
          {workout.image && (
            <Image
              source={workout.image}
              style={styles.image}
              {...highQualityImageProps}
              recyclingKey={`workout-${workout.id}`}
            />
          )}
          <View style={styles.imageOverlay} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{workout.title}</Text>
            {workout.duration && (
              <View style={styles.durationContainer}>
                <Feather name="clock" size={16} color="white" />
                <Text style={styles.durationText}>{workout.duration}</Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={[
            styles.detailsContainer,
            isDark && styles.darkDetailsContainer,
          ]}
        >
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('aboutThisWorkout')}
          </Text>
          <Text style={[styles.bodyText, isDark && styles.darkBodyText]}>
            {workout.body}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.ctaContainer, isDark && styles.darkCtaContainer]}>
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <Text style={styles.ctaButtonText}>{t('startWorkout')}</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#0F0F0F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    lineHeight: 38,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  durationText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "white",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 25,
  },
  darkDetailsContainer: {
    backgroundColor: "#1F1F1F",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  darkText: {
    color: "#E0E0E0",
  },
  darkBodyText: {
    color: "#A0A0A0",
  },
  ctaContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  darkCtaContainer: {
    backgroundColor: "#1F1F1F",
    borderTopColor: "#404040",
  },
  ctaButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WorkoutDetails;