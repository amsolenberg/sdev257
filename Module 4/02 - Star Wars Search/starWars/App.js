import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Planets from './Planets';
import Films from './Films';
import Spaceships from './Spaceships';
import Search from './Search';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

export default function App() {
  const isIOS = Platform.OS === 'ios';

  return <NavigationContainer>{isIOS ? renderScreens(Tab) : renderScreens(Drawer)}</NavigationContainer>;
}
