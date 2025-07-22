import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../components/ThemeContext';
import { useAuth } from '../components/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const UserProfile: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirm'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={[styles.section, isDark && styles.darkSection]}>
      <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
        {title}
      </Text>
      {children}
    </View>
  );

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
        {/* Profile Header */}
        <View style={[styles.profileHeader, isDark && styles.darkProfileHeader]}>
          <View style={[styles.avatarContainer, isDark && styles.darkAvatarContainer]}>
            <Feather name="user" size={32} color={isDark ? '#FFFFFF' : '#8B5CF6'} />
          </View>
          <Text style={[styles.greeting, isDark && styles.darkText]}>
            {t('yourProfile')}
          </Text>
        </View>

        {/* My Bookings Section */}
        <ProfileSection title={t('myBookings')}>
          <View style={styles.emptyState}>
            <Feather 
              name="calendar" 
              size={24} 
              color={isDark ? '#666666' : '#CCCCCC'} 
            />
            <Text style={[styles.emptyText, isDark && styles.darkSubText]}>
              {t('nothingToShow')}
            </Text>
          </View>
        </ProfileSection>

        {/* My Packages Section */}
        <ProfileSection title={t('myPackages')}>
          <View style={styles.emptyState}>
            <Feather 
              name="package" 
              size={24} 
              color={isDark ? '#666666' : '#CCCCCC'} 
            />
            <Text style={[styles.emptyText, isDark && styles.darkSubText]}>
              {t('nothingToShow')}
            </Text>
          </View>
        </ProfileSection>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity 
            style={[styles.logoutButton, isDark && styles.darkLogoutButton]} 
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  darkContainer: {
    backgroundColor: '#0F0F0F',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  darkProfileHeader: {
    backgroundColor: '#1A1A1A',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  darkAvatarContainer: {
    backgroundColor: '#2A2A2A',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
  logoutSection: {
    marginTop: 8,
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkLogoutButton: {
    backgroundColor: '#1A1A1A',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  darkText: {
    color: 'white',
  },
  darkSubText: {
    color: '#AAAAAA',
  },
  bottomPadding: {
    height: 20,
  },
});

export default UserProfile;