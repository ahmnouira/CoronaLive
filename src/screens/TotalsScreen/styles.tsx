import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

    numberText: {
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
    },
    labelText: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
    },
    viewBorder: {
        paddingBottom: 10,
    },
    confirmedText: {
        color: '#ecf0f1',
    },
    confirmedNumber: {
        color: 'rgb(244, 19, 19)',
    },
    deathsText: {
        color: '#7f8c8d'
    },

    deathsNumber: {
        color: '#bdc3c7',
    },
    recovredText: {
        color: '#27ae60'
    },

    recoveredNumber: {
        color: '#2ecc71',
    }


});


export default styles; 
