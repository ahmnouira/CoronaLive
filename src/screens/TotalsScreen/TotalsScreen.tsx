import React from 'react';
import { View, Text } from 'react-native';
import global from '../../styles';
import styles from './styles';

const TotalsScreen = ({ }) =>

  <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
    <View style={[global.COMMON_STYLES.container, styles.viewBorder]}>
      <Text style={[styles.labelText, styles.confirmedText]}>Total Confirmed</Text>
      <Text style={[styles.numberText, styles.confirmedNumber]}>243,181</Text>
    </View>

    <View style={global.COMMON_STYLES.container}>
      <Text style={[styles.labelText, styles.deathsText]} >Total Deaths</Text>
      <Text style={[styles.numberText, styles.deathsNumber]}>9,881</Text>
    </View>
    <View style={global.COMMON_STYLES.container}>
      <Text style={[styles.labelText, styles.recovredText]}>Total Recovered</Text>
      <Text style={[styles.numberText, styles.recoveredNumber]}>85,688</Text>
    </View>
  </View>


export default TotalsScreen;