import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { IMAGES } from '../constants/images';
import ThemeContext from '../components/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';

const { width, height } = Dimensions.get('window');

function Welcome() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Image
        source={IMAGES.welcomeImage}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      <View style={styles.overlay} />
      
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Feather 
          name="settings" 
          size={24} 
          color="#FFFFFF"
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t('welcomeTitle')}</Text>
          <Text style={styles.subtitle}>{t('welcomeSubtitle')}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>
              {t('login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signUpButton} 
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpButtonText}>
              {t('signUp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  darkContainer: {
    backgroundColor: "#000000",
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === "android" ? 50 : 60,
    right: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 120,
    paddingBottom: 80,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    textAlign: 'center',
    opacity: 0.95,
  },
  buttonContainer: {
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;