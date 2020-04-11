import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlotsScreen from './src/screens/PlotsScreen';
import TotalsScreen from './src/screens/TotalsScreen';
import NewsScreen from './src/screens/NewsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import { Ionicons } from '@expo/vector-icons';
import * as global from './src/styles/global';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Totals" tabBarOptions={{
        inactiveTintColor: global.LINK_COLOR,
        inactiveBackgroundColor: global.BG_COLOR,
        activeBackgroundColor: global.BG_COLOR,
        activeTintColor: global.ACTIVE_LINK_COLOR,
        labelStyle: { fontFamily: 'Roboto' }
      }} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Totals':
              iconName = 'ios-people';
              break;
            case 'Stats':
              iconName = 'ios-paper';
              break;
            case 'Plots':
              iconName = 'ios-pulse';
              break;
            case 'Analytics':
              iconName = 'ios-stats';
              break;
            case 'News':
              iconName = 'ios-medkit';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },

      })}>
        <Tab.Screen name="Totals" component={TotalsScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Plots" component={PlotsScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}
