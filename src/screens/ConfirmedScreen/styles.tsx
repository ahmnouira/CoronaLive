import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

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

});

export default styles; 