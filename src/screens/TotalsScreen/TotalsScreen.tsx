import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { numberWithComma, totalOf } from '../../utils/helpers';
import { ApiData } from '../../models/ApiData';
import Loading from '../../components/Loading/Loading';
import global from '../../styles';

export default function TotalsScreen(): JSX.Element {

  const [totalConfirmed, setTotalConfirmed] = React.useState('');
  const [totalDeaths, setTotalDeaths] = React.useState('');
  const [totalRecovred, setTotalRecovred] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    casesByCountry().then((res: ApiData) => {

      const { statistic_taken_at, countries_stat } = res;

      setTotalConfirmed(numberWithComma(totalOf(countries_stat, 'cases')));
      setTotalDeaths(numberWithComma(totalOf(countries_stat, 'deaths')));
      setTotalRecovred(numberWithComma(totalOf(countries_stat, 'total_recovered')));
      setIsLoading(false);

    }).catch(err => console.error(err));
  });

  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
      <StatusBar barStyle="dark-content" />

      <View style={[global.COMMON_STYLES.container, styles.viewBorder]}>
        <Text style={[styles.labelText, styles.confirmedText]}>Total Confirmed</Text>
        <Text style={[styles.numberText, styles.confirmedNumber]}>{totalConfirmed}</Text>
      </View>

      <View style={global.COMMON_STYLES.container}>
        <Text style={[styles.labelText, styles.deathsText]} >Total Deaths</Text>
        <Text style={[styles.numberText, styles.deathsNumber]}>{totalDeaths}</Text>
      </View>
      <View style={global.COMMON_STYLES.container}>
        <Text style={[styles.labelText, styles.recovredText]}>Total Recovered</Text>
        <Text style={[styles.numberText, styles.recoveredNumber]}>{totalRecovred}</Text>
      </View>
    </View>
  );
}
