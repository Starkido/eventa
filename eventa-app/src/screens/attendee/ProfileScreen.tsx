import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

export default function ProfileScreen() {
  const { userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={60} color={colors.text.white} />
          </View>
          <Text style={styles.name}>{userProfile?.name || 'User'}</Text>
          <Text style={styles.email}>{userProfile?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{userProfile?.role || 'attendee'}</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.options}>
          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="account-edit" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Edit Profile</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="ticket" size={24} color={colors.primary} />
            <Text style={styles.optionText}>My Tickets</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="help-circle" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Help & Support</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="cog" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Settings</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            style={styles.signOutButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  name: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  roleBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  roleText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  options: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  signOutContainer: {
    paddingBottom: spacing.xl,
  },
  signOutButton: {
    borderColor: colors.status.error,
  },
});