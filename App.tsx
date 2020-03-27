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
import { AdMobInterstitial } from 'expo-ads-admob';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  constructor(props) {

    super(props);

  }
  componentDidMount() {
    this.openInterstitial().then(() => console.log('ok')).catch((err) => console.error(err));
  }

  openInterstitial = async () => {
    await AdMobInterstitial.setAdUnitID('ca-app-pub-8120812323524890/4595437432');
    AdMobInterstitial.requestAdAsync().then(() => AdMobInterstitial.showAdAsync()).catch((err) => console.log(err));
  }



  render() {

    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Totals" tabBarOptions={{
          inactiveTintColor: global.LINK_COLOR,
          inactiveBackgroundColor: global.BG_COLOR,
          activeBackgroundColor: global.BG_COLOR,
          activeTintColor: '#8cf1e7',
          labelStyle: { fontFamily: 'Roboto' }
        }} screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === 'Totals') {
              iconName = 'ios-people';
            }

            else if (route.name === 'Stats') {
              iconName = 'ios-paper'
                ;

            }

            else if (route.name === 'Plots') {
              iconName = 'ios-pulse';
            }

            else if (route.name === 'Analytics') {
              iconName = 'ios-stats';

            }

            else if (route.name === 'News') {
              iconName = 'ios-medkit';


            }

            return <Ionicons name={iconName} size={size} color={color} />
          },


        })}>
          <Tab.Screen name="Totals" component={TotalsScreen} />
          <Tab.Screen name="Stats" component={ConfirmedScreen} />
          <Tab.Screen name="Plots" component={PlotsScreen} />
          <Tab.Screen name="Analytics" component={DataScreen} />
          <Tab.Screen name="News" component={ActiveScreen} />
        </Tab.Navigator>
      </NavigationContainer >
    );
  }
}