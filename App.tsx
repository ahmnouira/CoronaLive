import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlotsScreen from './src/screens/PlotsScreen';
import TotalsScreen from './src/screens/TotalsScreen';
import ActiveScreen from './src/screens/ActiveScreen';
import ConfirmedScreen from './src/screens/ConfirmedScreen';
import DataScreen from './src/screens/DataScreen/DataScreen';
import { Ionicons } from '@expo/vector-icons';
import global from './src/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Totals" tabBarOptions={{
        inactiveTintColor: global.LINK_COLOR,
        inactiveBackgroundColor: global.BG_COLOR,
        activeBackgroundColor: global.BG_COLOR,
        activeTintColor: global.LINK_COLOR,
        labelStyle: { fontFamily: 'Roboto' }
      }} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Totals') {
            iconName = 'ios-people';
          }

          else if (route.name === 'Plots') {
            iconName = 'md-analytics';

          }

          else if (route.name === 'Data') {
            iconName = 'ios-stats';

          }

          else if (route.name === 'Confirmed') {
            iconName = 'ios-checkmark-circle';

          }

          else if (route.name === 'Active') {
            iconName = 'ios-pulse';

          }

          return <Ionicons name={iconName} size={size} color={color} />
        },


      })}>
        <Tab.Screen name="Totals" component={TotalsScreen} />
        <Tab.Screen name="Confirmed" component={ConfirmedScreen} />
        <Tab.Screen name="Plots" component={PlotsScreen} />
        <Tab.Screen name="Data" component={DataScreen} />
        <Tab.Screen name="Active" component={ActiveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
