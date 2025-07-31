import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const colors = {
  primary: '#6C5CE7',
  secondary: '#00CEC9',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    white: '#FFFFFF',
  },
};

const EventCard = ({ title, location, price, category }: any) => (
  <View style={styles.eventCard}>
    <View style={styles.eventImagePlaceholder}>
      <Text style={styles.eventEmoji}>
        {category === 'music' ? '🎵' : category === 'tech' ? '💻' : '🍔'}
      </Text>
    </View>
    <View style={styles.eventDetails}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventLocation}>📍 {location}</Text>
      <Text style={styles.eventPrice}>{price === 0 ? 'Free' : `$${price}`}</Text>
    </View>
  </View>
);

const CategoryCard = ({ name, icon, color }: any) => (
  <TouchableOpacity style={[styles.categoryCard, { backgroundColor: color + '20' }]}>
    <View style={[styles.categoryIcon, { backgroundColor: color + '40' }]}>
      <Text style={styles.categoryEmoji}>{icon}</Text>
    </View>
    <Text style={[styles.categoryName, { color }]}>{name}</Text>
  </TouchableOpacity>
);

export default function App() {
  const categories = [
    { name: 'Music', icon: '🎵', color: colors.primary },
    { name: 'Tech', icon: '💻', color: colors.secondary },
    { name: 'Food', icon: '🍔', color: '#FF6B6B' },
    { name: 'Sports', icon: '⚽', color: '#4ECDC4' },
  ];

  const events = [
    {
      title: 'Summer Music Festival',
      location: 'Central Park, NYC',
      price: 75,
      category: 'music',
    },
    {
      title: 'Tech Conference 2024',
      location: 'San Francisco',
      price: 299,
      category: 'tech',
    },
    {
      title: 'Food & Wine Expo',
      location: 'Los Angeles',
      price: 45,
      category: 'food',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.logoText}>🎫</Text>
          <Text style={styles.appName}>Eventa</Text>
          <Text style={styles.tagline}>Discover Amazing Events</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.section}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.subGreeting}>Find your next amazing experience</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </ScrollView>
        </View>

        {/* Featured Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </View>

        {/* Demo Info */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>🚀 Eventa Demo</Text>
          <Text style={styles.demoText}>
            This is a demo of the Eventa event ticketing app! 
            {'\n\n'}
            Features include:
            {'\n'}• Beautiful event discovery
            {'\n'}• Category browsing
            {'\n'}• Ticket purchasing (coming soon)
            {'\n'}• QR code tickets (coming soon)
            {'\n'}• Organizer dashboard (coming soon)
          </Text>
          
          <TouchableOpacity style={styles.demoButton}>
            <Text style={styles.demoButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.white,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: colors.text.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 24,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
  },
  eventImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  eventEmoji: {
    fontSize: 32,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  demoSection: {
    margin: 24,
    padding: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  demoText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  demoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  demoButtonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
});