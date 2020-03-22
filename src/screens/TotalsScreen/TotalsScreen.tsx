import React from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import global from '../../styles';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { ApiData } from '../../models/ApiData';

class TotalsScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      totalConfirmed: '',
      totalDeaths: '',
      totalRecoverd: '',
      isLoading: true
    }

  }


  _getTotats() {

    casesByCountry().then((res: ApiData) => {

      const { statistic_taken_at, countries_stat } = res;

      let totalConfirmed = countries_stat.map((c) => parseInt(c.cases.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);
      let totalDeaths = countries_stat.map((c) => parseInt(c.deaths.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);
      let totalRecoverd = countries_stat.map((c) => parseInt(c.total_recovered.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);


      this.setState({
        isLoading: false,
        totalConfirmed: totalConfirmed.toString(),
        totalDeaths: totalDeaths.toString(),
        totalRecoverd: totalRecoverd.toString()
      })
    });
  }


  componentDidMount() {
    this._getTotats();

  }


  render() {

    if (this.state['isLoading']) {
      return (
        <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator animating={true} color="white" size="large" />
        </View>
      )
    }

    return (

      <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
        <StatusBar barStyle="dark-content" />

        <View style={[global.COMMON_STYLES.container, styles.viewBorder]}>
          <Text style={[styles.labelText, styles.confirmedText]}>Total Confirmed</Text>
          <Text style={[styles.numberText, styles.confirmedNumber]}>{this.state['totalConfirmed']}</Text>
        </View>

        <View style={global.COMMON_STYLES.container}>
          <Text style={[styles.labelText, styles.deathsText]} >Total Deaths</Text>
          <Text style={[styles.numberText, styles.deathsNumber]}>{this.state['totalDeaths']}</Text>
        </View>
        <View style={global.COMMON_STYLES.container}>
          <Text style={[styles.labelText, styles.recovredText]}>Total Recovered</Text>
          <Text style={[styles.numberText, styles.recoveredNumber]}>{this.state['totalRecoverd']}</Text>
        </View>
      </View>
    )
  }
}
export default TotalsScreen;