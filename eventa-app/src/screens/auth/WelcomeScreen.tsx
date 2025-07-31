import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/ui/Button';
import { colors, typography, spacing } from '../../styles/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo/Brand Section */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🎫</Text>
            </View>
            <Text style={styles.appName}>Eventa</Text>
            <Text style={styles.tagline}>
              Discover amazing events and create unforgettable memories
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔍</Text>
              <Text style={styles.featureText}>Discover Events</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🎟️</Text>
              <Text style={styles.featureText}>Easy Booking</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>Digital Tickets</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Button
              title="Get Started"
              onPress={() => navigation.navigate('Onboarding')}
              variant="primary"
              style={styles.primaryButton}
            />
            
            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Button
                title="Sign In"
                onPress={() => navigation.navigate('Login')}
                variant="ghost"
                style={styles.loginButton}
                textStyle={styles.loginButtonText}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
  },
  brandSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 50,
  },
  appName: {
    fontSize: typography.fontSize['4xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.lg,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.xl,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.white,
    textAlign: 'center',
  },
  actionsSection: {
    paddingTop: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.text.white,
    marginBottom: spacing.lg,
  },
  loginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.white,
    opacity: 0.9,
  },
  loginButton: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  loginButtonText: {
    color: colors.text.white,
    fontFamily: typography.fontFamily.semiBold,
  },
});