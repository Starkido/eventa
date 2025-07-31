import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/theme';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    banner_url?: string;
    category: string;
    tickets?: Array<{ price: number }>;
    users?: { name: string };
  };
  onPress: () => void;
  style?: ViewStyle;
}

export default function EventCard({ event, onPress, style }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getLowestPrice = () => {
    if (!event.tickets || event.tickets.length === 0) return null;
    const prices = event.tickets.map(ticket => ticket.price);
    return Math.min(...prices);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music': return '🎵';
      case 'sports': return '⚽';
      case 'arts': return '🎨';
      case 'food': return '🍔';
      case 'business': return '💼';
      case 'technology': return '💻';
      default: return '🎪';
    }
  };

  const lowestPrice = getLowestPrice();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Event Image */}
      <View style={styles.imageContainer}>
        {event.banner_url ? (
          <Image source={{ uri: event.banner_url }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderIcon}>{getCategoryIcon(event.category)}</Text>
          </View>
        )}
        
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
        
        {/* Price Badge */}
        {lowestPrice !== null && (
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              {lowestPrice === 0 ? 'Free' : `$${lowestPrice}`}
            </Text>
          </View>
        )}
      </View>

      {/* Event Details */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        {/* Date & Time */}
        <View style={styles.dateRow}>
          <MaterialCommunityIcons 
            name="calendar-clock" 
            size={16} 
            color={colors.text.secondary} 
          />
          <Text style={styles.dateText}>
            {formatDate(event.start_date)}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MaterialCommunityIcons 
            name="map-marker" 
            size={16} 
            color={colors.text.secondary} 
          />
          <Text style={styles.locationText} numberOfLines={1}>
            {event.location}
          </Text>
        </View>

        {/* Organizer */}
        {event.users && (
          <View style={styles.organizerRow}>
            <MaterialCommunityIcons 
              name="account" 
              size={16} 
              color={colors.text.secondary} 
            />
            <Text style={styles.organizerText}>
              by {event.users.name}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
    marginBottom: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.white,
    textTransform: 'capitalize',
  },
  priceBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  priceText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.white,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.tight * typography.fontSize.lg,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dateText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    fontStyle: 'italic',
  },
});