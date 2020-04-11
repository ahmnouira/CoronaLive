import React from 'react';
import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import * as global from '../../styles/global';
import { CountryInfo } from '../../models/CountryInfo';
import { casesByCountry } from '../../utils/api';
import { ApiData } from '../../models/ApiData';
import CountryItem from '../../components/CountryItem';

// because the same styling here
import styles from '../StatsScreen/styles';

class NewsScreen extends React.Component {


  constructor(props: any) {

    super(props);

    this.state = {
      info: Array<CountryInfo>(),
      listOfCountries: Array<CountryInfo>(),
      lastUpdate: '',
      isLoading: true
    }
  }

  componentDidMount() {
    // init
    this._getData();

  }


  _getData(filter: string = 'new_cases'): void {

    casesByCountry().then((res: ApiData) => {
      const { statistic_taken_at, countries_stat } = res;

      let sorted: CountryInfo[] = countries_stat.sort((a, b) => parseInt(b[filter].replace(/,/g, '')) - parseInt(a[filter].replace(/,/g, '')));
      this.setState({ isLoading: false, info: this._addKeys(sorted), lastUpdate: statistic_taken_at });
    });

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

  _addKeys = (arrCountryInfo: CountryInfo[]) =>
    arrCountryInfo.map(countryInfo => Object.assign(countryInfo, { key: countryInfo.country_name }))


  // pass the new data instead
  _renderCountries = () => this.state['info'].map((c: CountryInfo) =>
    <CountryItem seriousColor={true} key={c.key} name={c.country_name} cases={c.new_cases} deaths={c.new_deaths} recovered={c.serious_critical} />
  )

  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: global.BG_COLOR }}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Text style={[styles.labelText, styles.countryText]} onPress={() => this._filterByCountryName()}>Country</Text>
          <Text style={[styles.labelText, styles.confirmedText]} onPress={() => this._getData()}>Cases</Text>
          <Text style={[styles.labelText, { color: '#81ecec' }]} onPress={() => this._getData('serious_critical')}>Serious</Text>
          <Text style={[styles.labelText, styles.deathsText]} onPress={() => this._getData('new_deaths')}>Deaths</Text>
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



export default NewsScreen;