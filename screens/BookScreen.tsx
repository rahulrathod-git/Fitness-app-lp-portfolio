import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemeContext from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { getEvents, BookingEvent } from "../data/events";
import { useTranslation } from "../hooks/useTranslation";

// Configure German locale for calendar
LocaleConfig.locales['de'] = {
  monthNames: [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
  ],
  dayNames: [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
  ],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

const BookScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { t, language } = useTranslation();
  const isDark = theme === "dark";
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events, setEvents] = useState<BookingEvent[]>(getEvents(language));
  const [calendarKey, setCalendarKey] = useState(0);

  // Set calendar locale based on current language and force remount on theme change
  React.useEffect(() => {
    LocaleConfig.defaultLocale = language;
    setCalendarKey(prev => prev + 1); // Force calendar remount
  }, [language, theme]); // Added theme dependency

  // Update events when language changes
  React.useEffect(() => {
    setEvents(getEvents(language));
  }, [language]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleBooking = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, isBooked: true } : event,
      ),
    );
    console.log(`Booked event: ${eventId}`);
  };

  const markedDates = useMemo(() => {
    const initialValue: {
      [key: string]: { marked: boolean; dotColor: string };
    } = {};

    return events.reduce((acc, event) => {
      acc[event.date] = { marked: true, dotColor: "#8B5CF6" };
      return acc;
    }, initialValue);
  }, [events]);

  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate,
  );

  const lightCalendarTheme = {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: "#8B5CF6",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#8B5CF6",
    dayTextColor: "#2d4150",
    textDisabledColor: "#d9e1e8",
    monthTextColor: "#2d4150",
    arrowColor: "#8B5CF6",
  };

  const darkCalendarTheme = {
    backgroundColor: "#1F1F1F",
    calendarBackground: "#1F1F1F",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: "#8B5CF6",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#8B5CF6",
    dayTextColor: "#ffffff",
    textDisabledColor: "#444",
    monthTextColor: "#ffffff",
    arrowColor: "#8B5CF6",
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
        {/* Book Session Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {t('bookSession')}
          </Text>
          <View style={[styles.calendarContainer, isDark && styles.darkCard]}>
          <Calendar
            key={calendarKey}
            onDayPress={handleDayPress}
            markedDates={{
              ...markedDates,
              [selectedDate]: {
                selected: true,
                selectedColor: "#8B5CF6",
                disableTouchEvent: true,
              },
            }}
            theme={isDark ? darkCalendarTheme : lightCalendarTheme}
          />
        </View>

        </View>

        {selectedDate && (
          <View style={styles.eventsList}>
            <Text style={[styles.listTitle, isDark && styles.darkText]}>
              {t('availableOn')} {selectedDate}
            </Text>
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((event) => (
                <View
                  key={event.id}
                  style={[styles.eventCard, isDark && styles.darkCard]}
                >
                  <View>
                    <Text
                      style={[styles.eventTitle, isDark && styles.darkText]}
                    >
                      {event.title}
                    </Text>
                    <Text
                      style={[styles.eventDetail, isDark && styles.darkSubText]}
                    >
                      <Feather name="clock" size={14} /> {event.time}
                    </Text>
                    <Text
                      style={[styles.eventDetail, isDark && styles.darkSubText]}
                    >
                      <Feather name="map-pin" size={14} /> {event.location}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.bookButton,
                      event.isBooked && styles.bookedButton,
                    ]}
                    onPress={() => handleBooking(event.id)}
                    disabled={event.isBooked}
                  >
                    <Text style={styles.bookButtonText}>
                      {event.isBooked ? t('booked') : t('bookNow')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={[styles.noEventsText, isDark && styles.darkSubText]}>
                {t('noSessionsAvailable')}
              </Text>
            )}
          </View>
        )}

        <View style={styles.bottomPadding} />
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
  darkText: {
    color: "white",
  },
  darkSubText: {
    color: "#AAAAAA",
  },
  calendarContainer: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: "#1F1F1F",
  },
  eventsList: {
    marginTop: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  eventDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookedButton: {
    backgroundColor: "#a78bfa",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
  },
  noEventsText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
  },
  bottomPadding: {
    height: 20,
  },
});

export default BookScreen;