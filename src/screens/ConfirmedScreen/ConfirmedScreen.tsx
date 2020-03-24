import React from 'react';
import { View, Text, Button, ActivityIndicator, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import global from '../../styles';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { CountryInfo } from '../../models/CountryInfo';
import CountryItem from '../../components/CountryItem';
import { ApiData } from '../../models/ApiData';


class ConfirmedScreen extends React.Component {


  constructor(props: any) {

    super(props);

    this.state = {
      info: Array<CountryInfo>(),
      lastUpdate: '',
      isLoading: true

    }

  }

  componentDidMount() {
    this._getData();

  }


  _filterByCountryName = () => {
    let list: Array<CountryInfo> = this.state['info'];

    let sorted = list.sort((a, b) => {
      if (a.country_name < b.country_name) return -1;
      if (a.country_name > b.country_name) return 1;
      return 0;
    });
    this.setState({ info: this._addKeys(sorted) });
  }


  _getData(filter?: string): void {

    casesByCountry().then((res: ApiData) => {

      let { statistic_taken_at, countries_stat } = res;

      if (filter === 'total_recovered' || filter === 'deaths') {
        countries_stat = countries_stat.sort((a, b) => parseInt(b[filter].replace(/,/g, '')) - parseInt(a[filter].replace(/,/g, '')));
      }

      this.setState({ isLoading: false, info: this._addKeys(countries_stat), lastUpdate: statistic_taken_at });
    });

  }

  _keyExtractor = (item: CountryInfo) => item.country_name;


  _addKeys = (arrCountryInfo: CountryInfo[]) =>
    arrCountryInfo.map(countryInfo => Object.assign(countryInfo, { key: countryInfo.country_name }))


  _renderItem = ({ item }) => {

    const { country_name, cases, deaths, total_recovered } = item;

    return <CountryItem seriousColor={false} name={country_name} cases={cases} deaths={deaths} recovered={total_recovered} />
  }


  _renderCountries = () => this.state['info'].map((c: CountryInfo) =>
    <CountryItem seriousColor={false} key={c.key} name={c.country_name} cases={c.cases} deaths={c.deaths} recovered={c.total_recovered} />
  )

  render() {



    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: global.BG_COLOR }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={[styles.labelText, styles.countryText]} onPress={() => this._filterByCountryName()}>Country</Text>
          <Text style={[styles.labelText, styles.confirmedText]} onPress={() => this._getData()}>Confirmed</Text>
          <Text style={[styles.labelText, styles.recovredText]} onPress={() => this._getData('total_recovered')}> Recovered</Text>
          <Text style={[styles.labelText, styles.deathsText]} onPress={() => this._getData('deaths')}>Deaths</Text>
        </View>

        {this.state['isLoading'] && (
          <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
            <ActivityIndicator animating={true} color="white" size="large" />
          </View>
        )}

        {!this.state['isLoading'] && (
          <ScrollView style={{}}>
            {/*<FlatList data={this.state['info']} renderItem={this._renderItem} keyExtractor={this._keyExtractor} /> */}
            {this._renderCountries()}
          </ScrollView>
        )}
      </SafeAreaView >
    )

  }
}


export default ConfirmedScreen;