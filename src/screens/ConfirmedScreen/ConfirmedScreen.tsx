import React from 'react';
import { View, Text, FlatList } from 'react-native';
import global from '../../styles';
import styles from './styles';
import { casesByCountry, getAffectedCountries } from '../../utils/api';
import { CountryInfo } from '../../models/CountryInfo';
import CountryItem from '../../components/CountryItem';

const DATA: Array<CountryInfo> = [


  { cases: "123.34", country_name: 'France', deaths: "22", total_recovered: "4445" },
  { cases: "4334.2", country_name: 'Russia', deaths: "555", total_recovered: "123" },
  { cases: "12.98", country_name: 'Hollanda', deaths: "12", total_recovered: "1" },

]


/* function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.item}>{title}</Text>
    </View>
  );
}
 */

class ConfirmedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this._addKeys(DATA)
    }
  }


  _addKeys = (arrCountryInfo: CountryInfo[]) =>
    arrCountryInfo.map(countryInfo => Object.assign(countryInfo, { key: countryInfo.country_name }))


  _renderItem = ({ item }) => {

    const { country_name, cases, deaths, total_recovered } = item;

    return <CountryItem name={country_name} cases={cases} deaths={deaths} recovered={total_recovered} />

  }


  componentDidMount() {

    /* 
    getAffectedCountries().then(data => console.log('getAffectedCountries:', data));
    casesByCountry().then((data) => console.log('casesByContry:', data))
 
    */
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: global.BG_COLOR }}>
        <View style={styles.header}>
          <Text style={[styles.labelText, styles.countryText]}>Country</Text>
          <Text style={[styles.labelText, styles.confirmedText]}>Confirmed</Text>
          <Text style={[styles.labelText, styles.recovredText]}> Recovered</Text>
          <Text style={[styles.labelText, styles.deathsText]}>Deaths</Text>
        </View>
        <View>
          <FlatList data={DATA} renderItem={this._renderItem} />
        </View>
      </View >
    )
  }
}


export default ConfirmedScreen;