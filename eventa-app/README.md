# Eventa - Event Ticketing & Discovery App

Eventa is a comprehensive cross-platform event ticketing and discovery application built with React Native (Expo) and Supabase. It enables users to discover events, purchase tickets with QR code verification, and allows verified organizers to create and manage events.

## 🚀 Features

### For Attendees
- **Event Discovery**: Browse events by category, location, and popularity
- **Secure Ticketing**: Purchase tickets with integrated payment processing
- **Digital Tickets**: QR code-based tickets stored securely on device
- **Search & Filter**: Advanced filtering by category, location, price, and date
- **Ticket Management**: View and manage all purchased tickets in one place

### For Organizers
- **Event Creation**: Create and publish events with rich details
- **Ticket Management**: Set up multiple ticket types with different pricing
- **Attendee Management**: Check-in attendees using QR code scanning
- **Analytics Dashboard**: Track event performance and sales
- **Real-time Updates**: Monitor ticket sales and attendance in real-time

### For Admins
- **User Management**: Manage user accounts and permissions
- **Organizer Approval**: Review and approve organizer applications
- **Event Moderation**: Monitor and moderate published events
- **System Analytics**: Comprehensive reports and analytics

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Navigation**: React Navigation 6
- **UI Components**: Custom design system with Material Design icons
- **Payments**: Stripe integration (ready for implementation)
- **QR Codes**: react-native-qrcode-svg for generation
- **Maps**: React Native Maps for location services
- **Notifications**: Expo Notifications (ready for implementation)

## 📱 Platform Support

- ✅ iOS
- ✅ Android  
- ✅ Web (Progressive Web App)

## 🏗 Project Structure

```
eventa-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI elements (Button, Input, etc.)
│   │   └── events/         # Event-specific components
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── attendee/       # Attendee-specific screens
│   │   ├── organizer/      # Organizer-specific screens
│   │   └── admin/          # Admin-specific screens
│   ├── navigation/         # Navigation configuration
│   ├── contexts/           # React contexts for state management
│   ├── hooks/              # Custom React hooks
│   ├── config/             # Configuration files
│   └── styles/             # Design system and themes
├── assets/                 # Static assets
└── supabase-schema.sql     # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g @expo/cli`
- Supabase account and project
- Mobile device or emulator for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eventa-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase Database**
   - Create a new Supabase project at https://supabase.com
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the script to create all tables and policies

4. **Configure Environment**
   - The Supabase configuration is already set up in `src/config/supabase.ts`
   - Update the URL and API key if you're using a different Supabase project

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on different platforms**
   ```bash
   # iOS (requires macOS)
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Test Accounts

The database comes with sample data including test accounts:

- **Admin**: `admin@eventa.com`
- **Organizer**: `organizer@eventa.com`  
- **Attendee**: `attendee@eventa.com`

*Note: These are sample data entries. To actually log in, you'll need to create accounts through the app's registration flow.*

## 🗄 Database Schema

The app uses a comprehensive PostgreSQL schema with the following main tables:

- **users**: User profiles extending Supabase auth
- **organizer_applications**: Applications to become event organizers
- **events**: Event information and details
- **tickets**: Ticket types and pricing for events
- **purchases**: Ticket purchases with QR codes
- **checkins**: Event check-in records
- **analytics**: Event performance metrics

Row Level Security (RLS) policies ensure data security and proper access control.

## 🎨 Design System

The app features a modern design system with:

- **Colors**: Violet primary (#6C5CE7), Teal secondary (#00CEC9)
- **Typography**: Inter font family with multiple weights
- **Components**: Consistent spacing, border radius, and shadows
- **Icons**: Material Community Icons for consistent iconography

## 🚧 Current Status

### ✅ Completed Features
- Authentication system with role-based access
- Navigation structure for all user types
- Home screen with event discovery
- Event card and category components
- Design system and UI components
- Database schema with sample data
- Supabase integration

### 🔄 In Progress
- Event details and purchase flow
- QR code generation and scanning
- Organizer dashboard and event creation
- Admin panel functionality

### 📋 Upcoming Features
- Stripe payment integration
- Push notifications
- Image upload for events
- Maps integration
- Advanced search and filtering
- Real-time features
- Email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please open an issue on the GitHub repository.

---

**Eventa** - Making event discovery and ticketing simple and secure. 🎫✨
