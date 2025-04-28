// Import React and required components for platform detection and navigation
import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screen components for navigation
import Home from './Home';
import Planets from './Planets';
import Films from './Films';
import Spaceships from './Spaceships';
import Search from './Search';

// Create instances of both navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Helper function that renders screens using the provided Navigator type
function renderScreens(Navigator) {
  return (
    <Navigator.Navigator>
      <Navigator.Screen
        name='Home'
        component={Home}
      />
      <Navigator.Screen
        name='Search'
        component={Search}
      />
      <Navigator.Screen
        name='Planets'
        component={Planets}
      />
      <Navigator.Screen
        name='Films'
        component={Films}
      />
      <Navigator.Screen
        name='Spaceships'
        component={Spaceships}
      />
    </Navigator.Navigator>
  );
}

// Main App component
export default function App() {
  // Determine platform type (iOS or not)
  const isIOS = Platform.OS === 'ios';

  // Use tab navigation on iOS, drawer navigation on other platforms
  return <NavigationContainer>{isIOS ? renderScreens(Tab) : renderScreens(Drawer)}</NavigationContainer>;
}
