import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "../components/Navigation";
import { getPopular } from "../data/courses";
import ThemeContext from "../components/ThemeContext";
import { useTranslation } from "../hooks/useTranslation";

type ArticleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ArticleDetails"
>;

const ArticleDetails = () => {
  const route = useRoute<ArticleDetailScreenRouteProp>();
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  const { t, language } = useTranslation();
  const isDark = theme === "dark";

  const { itemId } = route.params;
  
  // Get articles in current language
  const popular = getPopular(language);
  const article = popular.find((item) => item.id === itemId);

  // Quality settings for images
  const highQualityImageProps = {
    contentFit: "cover" as const,
    transition: 0,
    cachePolicy: "memory-disk" as const,
    priority: "high" as const,
    allowDownscaling: false,
    autoplay: false,
  };

  if (!article) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
        <Text style={[styles.title, isDark && styles.darkText]}>
          {t('articleNotFound')}
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
          {article.image && (
            <Image
              source={article.image}
              style={styles.image}
              {...highQualityImageProps}
              recyclingKey={`article-${article.id}`}
            />
          )}
          <View style={styles.imageOverlay} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{article.title}</Text>
          </View>
        </View>

        <View
          style={[
            styles.detailsContainer,
            isDark && styles.darkDetailsContainer,
          ]}
        >
          <Text style={[styles.bodyText, isDark && styles.darkBodyText]}>
            {article.body}
          </Text>
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
  bodyText: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
  },
  darkText: {
    color: "#E0E0E0",
  },
  darkBodyText: {
    color: "#B0B0B0",
  },
});

export default ArticleDetails;