import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({


    countryItem: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: "100%"

    },

    labelText: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
        fontSize: 18,

        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        width: "100%"
    },


    countryName: {
        color: '#70a1ff',
    },


    recoveredNumber: {
        color: '#2ecc71',
    },


    deathsNumber: {
        color: '#bdc3c7',

    },

    confirmedNumber: {
        color: 'rgb(244, 19, 19)',

    },

    confirmedText: {
        color: '#ecf0f1',

    },



});

export default styles; 