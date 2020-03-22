import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const CountryItem = ({ name, cases, deaths, recovered }) => {


    return (
        <View style={styles.countryItem}>
            <Text style={[styles.labelText, styles.countryName]}>{name}</Text>
            <Text style={[styles.labelText, styles.confirmedNumber]}>{cases}</Text>
            <Text style={[styles.labelText, styles.recoveredNumber]}>{recovered}</Text>
            <Text style={[styles.labelText, styles.deathsNumber]}>{deaths}</Text>
        </View>

    )

}
export default CountryItem; 