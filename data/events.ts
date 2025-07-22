export interface BookingEvent {
  id: string;
  date: string;
  title: string;
  time: string; 
  location: string;
  type: "coaching" | "call" | "group-session" | "nutrition";
  isBooked?: boolean;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const eventData = [
  {
    id: "1",
    date: formatDate(today),
    titles: { de: "1-zu-1 Coaching", en: "1-on-1 Coaching" },
    time: "14:00 - 15:00",
    locations: { de: "Discord-Stimme", en: "Discord Voice" },
    type: "coaching" as const,
  },
  {
    id: "2",
    date: formatDate(today),
    titles: { de: "Kurzer Check-in Anruf", en: "Quick Check-in Call" },
    time: "17:00 - 17:15",
    locations: { de: "Telefonanruf", en: "Phone Call" },
    type: "call" as const,
  },
  {
    id: "3",
    date: formatDate(tomorrow),
    titles: { de: "Gruppentraining", en: "Group Workout Session" },
    time: "18:00 - 19:00",
    locations: { de: "Zoom-Meeting", en: "Zoom Meeting" },
    type: "group-session" as const,
    isBooked: true,
  },
  {
    id: "4",
    date: formatDate(tomorrow),
    titles: { de: "1-zu-1 Coaching", en: "1-on-1 Coaching" },
    time: "11:00 - 12:00",
    locations: { de: "Discord-Stimme", en: "Discord Voice" },
    type: "coaching" as const,
  },
  {
    id: "5",
    date: formatDate(dayAfterTomorrow),
    titles: { de: "Ernährungsplanung", en: "Nutritional Planning" },
    time: "13:00 - 13:45",
    locations: { de: "Google Meet", en: "Google Meet" },
    type: "nutrition" as const,
  },
];

export const getEvents = (language: 'de' | 'en' = 'de'): BookingEvent[] => {
  return eventData.map(event => ({
    id: event.id,
    date: event.date,
    title: event.titles[language],
    time: event.time,
    location: event.locations[language],
    type: event.type,
    isBooked: event.isBooked,
  }));
};

export const events = getEvents('de');