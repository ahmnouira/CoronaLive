import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        paddingVertical: 25,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: "100%"
    },


    labelText: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
        fontSize: 16,

        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        width: "100%"
    },

    confirmedText: {
        color: '#ecf0f1',
    },

    countryText: {
        color: '#1e90ff',
    },

    deathsText: {
        color: '#7f8c8d'

    },

    recovredText: {
        color: '#27ae60'
    },

});

export default styles; 