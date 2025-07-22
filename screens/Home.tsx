import React, { useContext } from "react";
import ThemeContext from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { IMAGES } from '../constants/images';
import { useTranslation } from '../hooks/useTranslation';
import {
  ContentItem,
  getPopular,
  getQuickWorkouts,
  getPackages,
} from "../data/courses";

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

const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { t, language } = useTranslation();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  // Get content in current language
  const popular = getPopular(language);
  const quickWorkouts = getQuickWorkouts(language);
  const packages = getPackages(language);

  // Update content when language changes
  React.useEffect(() => {
    // Content will automatically update due to the above calls
  }, [language]);

  const handleItemPress = (item: ContentItem) => {
    switch (item.type) {
      case "workout":
        navigation.navigate("WorkoutDetails", { itemId: item.id });
        break;
      case "article":
        navigation.navigate("ArticleDetails", { itemId: item.id });
        break;
      case "package":
        navigation.navigate("PackageDetails", { itemId: item.id });
        break;
      default:
        console.log("Unknown item type clicked");
    }
  };

  const highQualityImageProps = {
    contentFit: "cover" as const,
    transition: 0,
    cachePolicy: "memory-disk" as const,
    priority: "high" as const,
    allowDownscaling: false,      
    autoplay: false,            
    recyclingKey: undefined,   
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <View style={styles.headerLeft}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>💪</Text>
          </View>
          <Text style={[styles.headerTitle, isDark && styles.darkText]}>
            CoachingApp
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Feather
            name="settings"
            size={24}
            color={isDark ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('featured')}
          </Text>
          <TouchableOpacity
            style={styles.featuredCard}
            activeOpacity={0.9}
            onPress={() =>
              handleItemPress({
                id: packages[0].id,
                title: packages[0].title,
                type: "package",
                color: "#000",
                image: packages[0].image,
              })
            }
          >
            <Image
              source={IMAGES.featured1}
              style={styles.featuredImagePlaceholder}
              {...highQualityImageProps}
              recyclingKey="featured-1"
            />
            <View style={styles.featuredOverlay} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{packages[0].title}</Text>
              <Text style={styles.featuredSubtitle}>
                {t('perfectForGettingStarted')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Most Popular */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('mostPopular')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            style={styles.carousel}
          >
            {popular.map((workout, index) => (
              <TouchableOpacity
                key={workout.id}
                style={[styles.workoutCard, isDark && styles.darkCard]}
                activeOpacity={0.8}
                onPress={() => handleItemPress(workout)}
              >
                <View style={styles.workoutImage}>
                  {workout.image ? (
                    <>
                      <Image
                        source={workout.image}
                        style={styles.workoutImageFull}
                        {...highQualityImageProps}
                        recyclingKey={`popular-${workout.id}`}
                      />
                      <View style={styles.workoutImageOverlay} />
                    </>
                  ) : (
                    <>
                      <View
                        style={[
                          styles.workoutImagePlaceholder,
                          { backgroundColor: workout.color },
                        ]}
                      />
                      <View style={styles.workoutImageOverlay} />
                    </>
                  )}
                </View>
                <View style={styles.workoutInfo}>
                  <Text
                    style={[styles.workoutTitle, isDark && styles.darkText]}
                  >
                    {workout.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 10 Minute Workouts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('quickWorkouts')}
          </Text>
          <View style={styles.quickWorkoutsGrid}>
            {quickWorkouts.map((workout, index) => (
              <TouchableOpacity
                key={workout.id}
                style={[styles.quickWorkoutCard, isDark && styles.darkCard]}
                activeOpacity={0.8}
                onPress={() => handleItemPress(workout)}
              >
                <View style={styles.quickWorkoutImage}>
                  {workout.image ? (
                    <>
                      <Image
                        source={workout.image}
                        style={styles.quickWorkoutImageFull}
                        {...highQualityImageProps}
                        recyclingKey={`quick-${workout.id}`}
                      />
                      <View style={styles.quickWorkoutImageOverlay} />
                    </>
                  ) : (
                    <View
                      style={[
                        styles.quickWorkoutImagePlaceholder,
                        { backgroundColor: workout.color },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.quickWorkoutInfo}>
                  <Text
                    style={[styles.workoutTitle, isDark && styles.darkText]}
                  >
                    {workout.title}
                  </Text>
                  <Text style={styles.workoutDuration}>{workout.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ... (styles remain the same)
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
  fontWeight: "900", 
  color: "#1A1A1A",
  letterSpacing: -0.5,
},
  darkText: {
    color: "white",
  },
  darkSubText: {
    color: "#AAAAAA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
  },
  featuredImagePlaceholder: {
    height: 200,
    width: "100%",
  },
  featuredOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
  featuredContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "400",
  },
  workoutGrid: {
    flexDirection: "row",
    gap: 12,
  },
  carousel: {
    marginHorizontal: -20,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  workoutCard: {
    width: 160,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: "#1F1F1F",
  },
  workoutImage: {
    height: 110,
    position: "relative",
  },
  workoutImageFull: {
    width: "100%",
    height: "100%",
  },
  workoutImagePlaceholder: {
    width: "100%",
    height: "100%",
  },
  workoutImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  workoutInfo: {
    padding: 14,
  },
  workoutTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
    lineHeight: 18,
  },
  workoutSubtitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "400",
  },
  quickWorkoutsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickWorkoutCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickWorkoutImage: {
    height: 80,
    position: "relative",
  },
  quickWorkoutImageFull: {
    width: "100%",
    height: "100%",
  },
  quickWorkoutImagePlaceholder: {
    width: "100%",
    height: "100%",
  },
  quickWorkoutImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  quickWorkoutInfo: {
    padding: 12,
  },
  workoutDuration: {
    fontSize: 12,
    color: "#8B5CF6",
    fontWeight: "500",
    marginTop: 2,
  },
  bottomPadding: {
    height: 20,
  },
});

export default Home;