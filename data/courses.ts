import { ImageSourcePropType } from "react-native";
import { IMAGES } from '../constants/images';

export interface ContentItem {
  id: string;
  title: string;
  type: "article" | "workout" | "package";
  duration?: string;
  category?: string;
  color: string;
  image?: ImageSourcePropType;
  body?: string;
}

export interface PackageDefinition {
  id: string;
  title: string;
  description: string;
  itemIds: string[];
  image?: ImageSourcePropType;
}

// Content data with both languages
const contentData = {
  popular: [
    {
      id: "1",
      titles: { de: "Erste Schritte", en: "Get started" },
      type: "article",
      color: "#FF6B6B",
      image: IMAGES.mpGetStarted,
      bodies: {
        de: "Der Beginn deiner Reise kann aufregend sein. Dieser Leitfaden behandelt die absoluten Grundlagen, vom Setzen realistischer Ziele bis hin zum Verständnis der Bedeutung von Beständigkeit. Wir führen dich durch die Erstellung eines einfachen Plans, an den du dich halten kannst.",
        en: "Starting your journey can be exciting. This guide covers the absolute basics, from setting realistic goals to understanding the importance of consistency. We'll walk you through creating a simple plan that you can stick to."
      },
    },
    {
      id: "2",
      titles: { de: "Gesunde Lebensmittel", en: "Healthy Foods" },
      type: "article",
      color: "#4ECDC4",
      image: IMAGES.mpHealthyFood,
      bodies: {
        de: "Ernährung ist die halbe Schlacht. Lerne die essentiellen Makronährstoffe kennen, Proteine, Kohlenhydrate, Fette und wie du einen ausgewogenen Teller zusammenstellst. Wir stellen auch eine Einkaufsliste zur Verfügung, um deinen nächsten Einkauf zu erleichtern.",
        en: "Nutrition is half the battle. Learn about the essential macronutrients, proteins, carbs, fats and how to build a balanced plate. We'll also provide a sample grocery list to make your next shopping trip easier."
      },
    },
    {
      id: "3",
      titles: { de: "Beste Fitness-Technologie", en: "Best Fitness Tech" },
      type: "article",
      color: "#4ECDC4",
      image: IMAGES.mpFitnessTech,
      bodies: {
        de: "Von Smartwatches, die deine Herzfrequenz verfolgen, bis hin zu intelligenten Waagen, die die Körperzusammensetzung messen, kann Technologie ein mächtiger Verbündeter sein. Dieser Artikel bewertet die neuesten Gadgets, die dir helfen können, Fortschritte zu verfolgen und motiviert zu bleiben.",
        en: "From smartwatches that track your heart rate to smart scales that measure body composition, technology can be a powerful ally. This article reviews the latest gadgets that can help you monitor progress and stay motivated."
      },
    },
  ],
  quickWorkouts: [
    {
      id: "4",
      titles: { de: "Cardio-Explosion", en: "Cardio Blast" },
      type: "workout",
      durations: { de: "10 Min", en: "10 min" },
      color: "#45B7D1",
      image: IMAGES.workoutCardio,
      bodies: {
        de: "Bringe deinen Herzschlag mit dieser schnellen Cardio-Session in Schwung. Keine Ausrüstung erforderlich! Der Zirkel beinhaltet:\n\n- Hampelmänner (60s)\n- High Knees (60s)\n- Burpees (30s)\n- Pause (30s)\n\nWiederhole den Zirkel 3 Mal für ein kraftvolles 10-Minuten-Workout.",
        en: "Get your heart rate up with this fast-paced cardio session. No equipment needed! The circuit includes: \n\n- Jumping Jacks (60s)\n- High Knees (60s)\n- Burpees (30s)\n- Rest (30s)\n\nRepeat the circuit 3 times for a powerful 10-minute workout."
      },
    },
    {
      id: "5",
      titles: { de: "Yoga-Flow", en: "Yoga Flow" },
      type: "workout",
      durations: { de: "10 Min", en: "10 min" },
      color: "#96CEB4",
      image: IMAGES.workoutYoga,
      bodies: {
        de: "Finde deine Mitte mit diesem sanften Morgen-Yoga-Flow. Diese Sequenz ist darauf ausgelegt, deinen Körper und Geist zu erwecken. Wir bewegen uns durch eine Reihe von Sonnengrüßen, Krieger-Posen und sanften Dehnungen, um Flexibilität und Fokus zu verbessern.",
        en: "Find your center with this gentle morning yoga flow. This sequence is designed to awaken your body and mind. We'll move through a series of Sun Salutations, Warrior poses, and gentle stretches to improve flexibility and focus."
      },
    },
  ],
  packages: [
    {
      id: "pkg-beginner-01",
      titles: { de: "Einsteiger-Paket", en: "Beginner's Package" },
      descriptions: {
        de: "Diese kuratierte Sammlung von Artikeln und Workouts ist darauf ausgelegt, dir den perfekten Start in deine Reise zu geben. Beginne mit den Grundlagen und baue ein starkes Fundament auf.",
        en: "This curated collection of articles and workouts is designed to give you the perfect start on your journey. Begin with the basics and build a strong foundation."
      },
      itemIds: ["1", "2", "4"],
      image: IMAGES.featured1,
    },
  ]
};

export const getPopular = (language: 'de' | 'en' = 'de'): ContentItem[] => {
  return contentData.popular.map(item => ({
    id: item.id,
    title: item.titles[language],
    type: item.type as "article" | "workout" | "package",
    color: item.color,
    image: item.image,
    body: item.bodies[language],
  }));
};

export const getQuickWorkouts = (language: 'de' | 'en' = 'de'): ContentItem[] => {
  return contentData.quickWorkouts.map(item => ({
    id: item.id,
    title: item.titles[language],
    type: item.type as "article" | "workout" | "package",
    duration: item.durations?.[language],
    color: item.color,
    image: item.image,
    body: item.bodies[language],
  }));
};

export const getPackages = (language: 'de' | 'en' = 'de'): PackageDefinition[] => {
  return contentData.packages.map(item => ({
    id: item.id,
    title: item.titles[language],
    description: item.descriptions[language],
    itemIds: item.itemIds,
    image: item.image,
  }));
};

export const popular = getPopular('de');
export const quickWorkouts = getQuickWorkouts('de');
export const packages = getPackages('de');