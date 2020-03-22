import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native';
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


  _getData(): void {

    casesByCountry().then((res: ApiData) => {

      const { statistic_taken_at, countries_stat } = res;

      console.log(countries_stat);

      this.setState({ isLoading: false, info: this._addKeys(countries_stat), lastUpdate: statistic_taken_at });
    });

  }

  _keyExtractor = (item: CountryInfo) => item.country_name;


  _addKeys = (arrCountryInfo: CountryInfo[]) =>
    arrCountryInfo.map(countryInfo => Object.assign(countryInfo, { key: countryInfo.country_name }))


  _renderItem = ({ item }) => {

    const { country_name, cases, deaths, total_recovered } = item;

    return <CountryItem name={country_name} cases={cases} deaths={deaths} recovered={total_recovered} />
  }

  render() {



    return (
      <View style={{ flex: 1, backgroundColor: global.BG_COLOR }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={[styles.labelText, styles.countryText]}>Country</Text>
          <Text style={[styles.labelText, styles.confirmedText]}>Confirmed</Text>
          <Text style={[styles.labelText, styles.recovredText]}> Recovered</Text>
          <Text style={[styles.labelText, styles.deathsText]}>Deaths</Text>
        </View>

        {this.state['isLoading'] && (
          <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
            <ActivityIndicator animating={true} color="white" size="large" />
          </View>
        )}

        {!this.state['isLoading'] && (
          <View>
            <FlatList data={this.state['info']} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
          </View>
        )}
      </View >
    )

  }
}


export default ConfirmedScreen;