import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import * as global from '../../styles/global';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { CountryInfo } from '../../models/CountryInfo';
import CountryItem from '../../components/CountryItem';
import { ApiData } from '../../models/ApiData';
import Loading from '../../components/Loading/Loading';

export default function StatsScreen() {

  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(Array<CountryInfo>());

  useEffect(() => {

    casesByCountry().then((res: ApiData) => {
      let { statistic_taken_at, countries_stat } = res;
      setIsLoading(false);
      setInfo(_addKeys(countries_stat));
      setLastUpdated(statistic_taken_at);
    });
    
  }, []);


  const _addKeys = (arrCountryInfo: CountryInfo[]) =>
    arrCountryInfo.map(countryInfo => Object.assign(countryInfo, { key: countryInfo.country_name }))


  // filter by names alphabitic
  const _filterByCountryName = (): void => {

    let sorted: CountryInfo[] = info.sort((a, b) => {
      if (a.country_name < b.country_name) return -1;
      if (a.country_name > b.country_name) return 1;
      return 0;
    });
    setInfo(_addKeys(sorted));
  }

  const _renderCountries = () => info.map((c: CountryInfo) =>
    <CountryItem seriousColor={false} key={c.key} name={c.country_name} cases={c.cases} deaths={c.deaths} recovered={c.total_recovered} />
  )

  const _getData = (filter?: string): void => {

    casesByCountry().then((res: ApiData) => {

      let { statistic_taken_at, countries_stat } = res;

      if (filter === 'total_recovered' || filter === 'deaths') {
        countries_stat = countries_stat.sort((a, b) => parseInt(b[filter].replace(/,/g, '')) - parseInt(a[filter].replace(/,/g, '')));
      }
      setIsLoading(false);
      setInfo(_addKeys(countries_stat));
      setLastUpdated(statistic_taken_at);
    });

  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: global.BG_COLOR }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={[styles.labelText, styles.countryText]} onPress={() => _filterByCountryName()}>Country</Text>
        <Text style={[styles.labelText, styles.confirmedText]} onPress={() => _getData()}>Confirmed</Text>
        <Text style={[styles.labelText, styles.recovredText]} onPress={() => _getData('total_recovered')}> Recovered</Text>
        <Text style={[styles.labelText, styles.deathsText]} onPress={() => _getData('deaths')}>Deaths</Text>
      </View>

      {isLoading && (
        <Loading />
      )}

      {!isLoading && (
        <ScrollView style={{}}>
          {_renderCountries()}
        </ScrollView>
      )}
    </SafeAreaView >
  )

}



