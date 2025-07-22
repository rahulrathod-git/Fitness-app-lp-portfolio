import React, { useContext } from "react";
import ThemeContext from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { IMAGES } from "../constants/images";
import { useTranslation } from "../hooks/useTranslation";
import { getPackages } from "../data/courses";

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

interface PackageItem {
  id: string;
  title: string;
  type: string;
  image: any;
}

const PackageDetails: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { t, language } = useTranslation();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  // Get packages in current language
  const packages = getPackages(language);
  const currentPackage = packages[0]; // Using the first package

  const highQualityImageProps = {
    contentFit: "cover" as const,
    transition: 0,
    cachePolicy: "memory-disk" as const,
    priority: "high" as const,
    allowDownscaling: false,
    autoplay: false,
  };

  const packageItems: PackageItem[] = [
    {
      id: "1",
      title: t('fullBodyWorkoutGuide'),
      type: "",
      image: IMAGES.packageDetailsWorkout,
    },
    {
      id: "2",
      title: t('oneOnOneCoaching'),
      type: "",
      image: IMAGES.packageDetailsSession,
    },
    {
      id: "3",
      title: t('progressTracking'),
      type: "",
      image: IMAGES.packageDetailsProgress,
    },
  ];

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={IMAGES.featured1}
            style={styles.heroImage}
            {...highQualityImageProps}
            recyclingKey="package-hero"
          />
          <View style={styles.heroOverlay} />
        </View>

        {/* Package Info */}
        <View style={[styles.packageInfo, isDark && styles.darkPackageInfo]}>
          <Text style={[styles.packageTitle, isDark && styles.darkText]}>
            {currentPackage.title}
          </Text>
          <Text
            style={[styles.packageDescription, isDark && styles.darkSubText]}
          >
            {currentPackage.description}
          </Text>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, isDark && styles.darkText]}>
                {language === 'de' ? '29,99€' : '$29.99'}
              </Text>
            </View>
          </View>

          {/* What's Included Section */}
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('whatsIncluded')}
          </Text>

          {/* Package Items */}
          <View style={styles.itemsList}>
            {packageItems.map((item) => (
              <View
                key={item.id}
                style={[styles.packageItem, isDark && styles.darkPackageItem]}
              >
                <View style={styles.itemLeft}>
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    {...highQualityImageProps}
                    recyclingKey={`package-item-${item.id}`}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemTitle, isDark && styles.darkText]}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Purchase Button */}
          <TouchableOpacity style={styles.purchaseButton} activeOpacity={0.8}>
            <Text style={styles.purchaseButtonText}>{t('getStartedNow')}</Text>
          </TouchableOpacity>

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <Text style={[styles.infoText, isDark && styles.darkSubText]}>
              {t('lifetimeAccess')}
            </Text>
            <Text style={[styles.infoText, isDark && styles.darkSubText]}>
              {t('moneyBackGuarantee')}
            </Text>
            <Text style={[styles.infoText, isDark && styles.darkSubText]}>
              {t('allFitnessLevels')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  content: {
    flex: 1,
  },
  heroSection: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 300,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  packageInfo: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    minHeight: 500,
  },
  darkPackageInfo: {
    backgroundColor: "#1A1A1A",
  },
  packageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  packageDescription: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 24,
  },
  priceSection: {
    marginBottom: 32,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  itemsList: {
    gap: 16,
    marginBottom: 32,
  },
  packageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkPackageItem: {
    backgroundColor: "#2A2A2A",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  purchaseButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  purchaseButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  additionalInfo: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
  },
  darkText: {
    color: "white",
  },
  darkSubText: {
    color: "#AAAAAA",
  },
});

export default PackageDetails;