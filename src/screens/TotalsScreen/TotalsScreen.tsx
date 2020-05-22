import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { numberWithComma, totalOf } from '../../utils/helpers';
import { ApiData } from '../../models/ApiData';
import Loading from '../../components/Loading/Loading';
import * as global from '../../styles/global';

export default function TotalsScreen(): JSX.Element {

  const [totalConfirmed, setTotalConfirmed] = useState('');
  const [totalDeaths, setTotalDeaths] = useState('');
  const [totalRecovred, setTotalRecovred] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    casesByCountry().then((res: ApiData) => {


      console.log(res);

      const { statistic_taken_at, countries_stat } = res;
      setTotalConfirmed(numberWithComma(totalOf(countries_stat, 'cases')));
      setTotalDeaths(numberWithComma(totalOf(countries_stat, 'deaths')));

      // total tests 
      console.log(totalOf(countries_stat, 'total_tests')); 

      setTotalRecovred(numberWithComma(totalOf(countries_stat, 'total_recovered')));
      setIsLoading(false);
    }).catch(err => console.error(err));

  }, []);

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
