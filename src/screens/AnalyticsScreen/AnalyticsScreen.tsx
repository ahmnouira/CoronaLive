import React from 'react';
import { Text, View, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import {
    ProgressChart, ProgressChartProps, ProgressChartData, StackedBarChart, StackedBarChartData, ChartConfig

} from "react-native-chart-kit";
import * as gloabl from '../../styles/global';
import styles from './styles';
import { casesByCountry } from '../../utils/api';
import { ApiData } from '../../models/ApiData';
import { CountryInfo } from '../../models/CountryInfo';


const progressConfig: ChartConfig = {

    // the first color in the linear of chat's background
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,

    // color for 'light green'
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // color for lables 'white'
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    strokeWidth: 30, // optional, default 3
    barPercentage: 1,
    barRadius: 20,
    decimalPlaces: 2,

    propsForBackgroundLines: {

    },

    style: {
        borderRadius: 16,
        alignSelf: "center",
    },


}



const width: number = Dimensions.get('window').width;
const height: number = Math.round(Dimensions.get('window').height) / 2 - 98;

const stackedConfig: ChartConfig = {
    // the first color in the linear of chat's background
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,

    // color for 'light green'
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // color for lables 'white'
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    barRadius: 3,
    propsForBackgroundLines: {

    },

    style: {
        borderRadius: 16,
        alignSelf: "center",
    },


}


class AnalyticsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progData: {},
            stacktedData: {},
            isLoading: true
        }
    }


    componentDidMount() {
        this._getTotats();
    }


    _getTotats() {

        casesByCountry().then((res: ApiData) => {

            const { statistic_taken_at, countries_stat } = res;



            /** progress **/
            // get total of each cases/deaths/recovered
            let totalConfirmed = countries_stat.map((c) => parseInt(c.cases.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);
            let totalDeaths = countries_stat.map((c) => parseInt(c.deaths.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);
            let totalRecoverd = countries_stat.map((c) => parseInt(c.total_recovered.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);

            // this is represent 100% 
            let total = totalConfirmed + totalDeaths + totalRecoverd;



            let confirmedPercent = totalConfirmed / total;
            let deathsPercent = totalDeaths / total;
            let recoverdPersent = totalRecoverd / total;


            let progressChartData: ProgressChartData = {
                labels: ["Deaths", "Recovered", "Cases"],
                data: [deathsPercent, recoverdPersent, confirmedPercent]
            }

            /* 
            console.log(total);
            console.log('confirmedPersenr', confirmedPercent)
            console.log('deathsPersent', deathsPercent);
            console.log('recoveredPesernt', recoverdPersent);
            */

            /*** end progress */


            // get the 3 top countries have most !!! 
            let topCountries: CountryInfo[] = countries_stat.sort((a, b) => parseInt(b.active_cases.replace(/,/g, '')) - parseInt(a.active_cases.replace(/,/g, ''))).slice(0, 3);

            // console.log(topCountries);

            let c1 = topCountries[0];
            let c2 = topCountries[1];
            let c3 = topCountries[2];

            let stackedBarChartData: StackedBarChartData = {
                labels: [c1.country_name, c2.country_name, c3.country_name],
                legend: ["Cases", "Serious", "Deaths"],
                data: [
                    [...this.getInfos(c1)], [...this.getInfos(c2)], [...this.getInfos(c2)]
                ],
                barColors: ["#70a1ff", "rgba(248,104,104, 0.8)", "#bdc3c7"]
            }

            this.setState({
                isLoading: false,
                progData: progressChartData,
                stacktedData: stackedBarChartData
            });
        });

    }

    private getInfos(c: CountryInfo): number[] {
        let deaths = parseInt(c.new_deaths.replace(/,/g, ''));
        let serious = parseInt(c.serious_critical.replace(/,/g, ''));
        let cases = parseInt(c.new_cases.replace(/,/, ''));
        return [cases, serious, deaths];
    }


    render() {

        if (this.state['isLoading']) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: gloabl.BG_COLOR }}>
                    <StatusBar barStyle="dark-content" />
                    <ActivityIndicator animating={true} color="white" size="large" />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: gloabl.BG_COLOR }}>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.text}>Cases-Recovered-Deaths</Text>
                <ProgressChart data={this.state['progData']} width={width} chartConfig={progressConfig} height={height} hideLegend={false} />
                <Text style={styles.text}>Lastest Stats</Text>
                <StackedBarChart
                    style={styles.stackecChart}
                    segments={null}
                    barPercentage={1}
                    data={this.state['stacktedData']}
                    width={width}
                    height={180}
                    chartConfig={stackedConfig}
                    hideLegend={true}
                />
            </View >
        );
    }
}
export default AnalyticsScreen; 