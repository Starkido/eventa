import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../contexts/EventContext';
import Button from '../../components/ui/Button';
import EventCard from '../../components/events/EventCard';
import CategoryCard from '../../components/events/CategoryCard';
import { colors, typography, spacing } from '../../styles/theme';

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList>;

const eventCategories = [
  { id: 'music', name: 'Music', icon: '🎵', color: colors.primary },
  { id: 'sports', name: 'Sports', icon: '⚽', color: colors.secondary },
  { id: 'arts', name: 'Arts', icon: '🎨', color: '#FF6B6B' },
  { id: 'food', name: 'Food', icon: '🍔', color: '#4ECDC4' },
  { id: 'business', name: 'Business', icon: '💼', color: '#45B7D1' },
  { id: 'technology', name: 'Tech', icon: '💻', color: '#96CEB4' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { userProfile } = useAuth();
  const { events, loading, fetchEvents } = useEvents();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    await fetchEvents();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const handleCategoryPress = (categoryId: string) => {
    // Navigate to search screen with category filter
    // @ts-ignore - navigation params will be handled properly later
    navigation.navigate('Search', { category: categoryId });
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetails', { eventId });
  };

  const renderEventCard = ({ item }: { item: any }) => (
    <EventCard
      event={item}
      onPress={() => handleEventPress(item.id)}
      style={styles.eventCard}
    />
  );

  const renderCategoryCard = ({ item }: { item: any }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
      style={styles.categoryCard}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>
              Hello, {userProfile?.name?.split(' ')[0] || 'User'}! 👋
            </Text>
            <Text style={styles.subGreeting}>Discover amazing events near you</Text>
          </View>
          
                     <TouchableOpacity 
             style={styles.searchButton}
             onPress={() => {
               // @ts-ignore - navigation params will be handled properly later
               navigation.navigate('Search');
             }}
           >
            <MaterialCommunityIcons name="magnify" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={eventCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Featured Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
                         <Button
               title="See All"
               onPress={() => {
                 // @ts-ignore - navigation params will be handled properly later
                 navigation.navigate('Search');
               }}
               variant="ghost"
               size="small"
               textStyle={styles.seeAllText}
             />
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading events...</Text>
            </View>
          ) : events.length > 0 ? (
            <FlatList
              data={events.slice(0, 5)}
              renderItem={renderEventCard}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No events found. Check back later for exciting events!
              </Text>
                             <Button
                 title="Browse Categories"
                 onPress={() => {
                   // @ts-ignore - navigation params will be handled properly later
                   navigation.navigate('Search');
                 }}
                 variant="outline"
                 style={styles.browseButton}
               />
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
                         <TouchableOpacity
               style={styles.quickAction}
               onPress={() => {
                 // @ts-ignore - navigation params will be handled properly later
                 navigation.navigate('MyTickets');
               }}
             >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name="ticket" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>My Tickets</Text>
            </TouchableOpacity>

                         <TouchableOpacity
               style={styles.quickAction}
               onPress={() => {
                 // @ts-ignore - navigation params will be handled properly later
                 navigation.navigate('ApplyOrganizer');
               }}
             >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons name="account-plus" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.quickActionText}>Become Organizer</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subGreeting: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
  },
  categoryCard: {
    marginRight: spacing.md,
  },
  eventCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  browseButton: {
    paddingHorizontal: spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
});