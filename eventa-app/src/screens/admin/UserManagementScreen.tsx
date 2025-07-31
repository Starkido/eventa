import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors, typography, spacing } from '../../styles/theme';

export default function UserManagementScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>Coming Soon!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.lg },
  title: { fontSize: typography.fontSize['2xl'], fontFamily: typography.fontFamily.bold, color: colors.text.primary, marginBottom: spacing.sm },
  subtitle: { fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.regular, color: colors.text.secondary },
});