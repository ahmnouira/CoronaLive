import React from 'react';
import { View, Text, FlatList } from 'react-native';
import global from '../../styles';
import styles from './styles';


const DATA = [
  { nb: 123.34, country: 'France' },
  { nb: 4334.2, country: 'Russia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
  { nb: 12.98, country: 'Tunisia' },
]



function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.item}>{title}</Text>
    </View>
  );
}


const ConfirmedScreen = ({ }) =>

  <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
    <Text style={global.COMMON_STYLES.text}>ConfirmedScreen</Text>
    <FlatList
      data={DATA
      }
      renderItem={({ item }) => <Item title={item.nb} />}
        keyExtractor={item => item.id}
      }}
    />
  </View>


export default ConfirmedScreen;