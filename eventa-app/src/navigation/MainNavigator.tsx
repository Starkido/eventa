import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { colors, spacing } from '../styles/theme';

// Attendee Screens
import HomeScreen from '../screens/attendee/HomeScreen';
import SearchScreen from '../screens/attendee/SearchScreen';
import MyTicketsScreen from '../screens/attendee/MyTicketsScreen';
import ProfileScreen from '../screens/attendee/ProfileScreen';
import EventDetailsScreen from '../screens/attendee/EventDetailsScreen';
import TicketDetailsScreen from '../screens/attendee/TicketDetailsScreen';
import PurchaseScreen from '../screens/attendee/PurchaseScreen';

// Organizer Screens
import OrganizerDashboardScreen from '../screens/organizer/OrganizerDashboardScreen';
import CreateEventScreen from '../screens/organizer/CreateEventScreen';
import ManageEventsScreen from '../screens/organizer/ManageEventsScreen';
import ManageAttendeesScreen from '../screens/organizer/ManageAttendeesScreen';
import ApplyOrganizerScreen from '../screens/organizer/ApplyOrganizerScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import ApprovalScreen from '../screens/admin/ApprovalScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import EventModerationScreen from '../screens/admin/EventModerationScreen';

export type MainStackParamList = {
  HomeTabs: undefined;
  EventDetails: { eventId: string };
  TicketDetails: { ticketId: string };
  Purchase: { eventId: string; ticketId: string };
  CreateEvent: undefined;
  EditEvent: { eventId: string };
  ManageAttendees: { eventId: string };
  ApplyOrganizer: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<MainStackParamList>();

function AttendeeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'magnify' : 'magnify';
          } else if (route.name === 'MyTickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="MyTickets" component={MyTicketsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function OrganizerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar-multiple' : 'calendar-multiple-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={OrganizerDashboardScreen} />
      <Tab.Screen name="Events" component={ManageEventsScreen} />
      <Tab.Screen name="Create" component={CreateEventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Approvals') {
            iconName = focused ? 'check-circle' : 'check-circle-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar-multiple' : 'calendar-multiple-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Approvals" component={ApprovalScreen} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
      <Tab.Screen name="Events" component={EventModerationScreen} />
    </Tab.Navigator>
  );
}

function TabNavigator() {
  const { userProfile } = useAuth();
  
  if (userProfile?.role === 'admin') {
    return <AdminTabNavigator />;
  } else if (userProfile?.role === 'organizer') {
    return <OrganizerTabNavigator />;
  } else {
    return <AttendeeTabNavigator />;
  }
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="ManageAttendees" component={ManageAttendeesScreen} />
      <Stack.Screen name="ApplyOrganizer" component={ApplyOrganizerScreen} />
    </Stack.Navigator>
  );
}