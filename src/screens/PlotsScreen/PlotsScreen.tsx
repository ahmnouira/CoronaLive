import React from 'react';
import { View, Text, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import global from '../../styles';
import styles from './styles';
import {
  BarChartProps, BarChart, PieChart, ChartData, ChartConfig, ProgressChartData

} from "react-native-chart-kit";
import gloabl from '../../styles';
import { casesByCountry } from '../../utils/api';
import { ApiData } from '../../models/ApiData';
import { CountryInfo } from '../../models/CountryInfo';



const barConfig: ChartConfig = {

  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(254, 245, 48, ${opacity})`,
  labelColor: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1,
  fillShadowGradientOpacity: 0.5,
  decimalPlaces: null,




}


const pieConfig: ChartConfig = {

  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(254, 245, 48, ${opacity})`,
  labelColor: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1,
  fillShadowGradientOpacity: 0.5,


}


const width: number = Dimensions.get('window').width;
const height: number = Math.round(Dimensions.get('window').height) / 2 - 98;

class PlotsScreen extends React.Component {




  constructor(props) {
    super(props);


    this.state = {
      isLoading: true,
      barData: {},
      pieData: {}
    }


  }



  componentDidMount() {
    this._getTotats();
  }



  _getTotats() {
    casesByCountry().then((res: ApiData) => {

      const { statistic_taken_at, countries_stat } = res;


      // get the 3 top countries have most Deaths!!! 
      let topCountries: CountryInfo[] = countries_stat.sort((a, b) => parseInt(b.deaths.replace(/,/g, '')) - parseInt(a.deaths.replace(/,/g, ''))).slice(0, 5);


      // console.log('topDeaths', topCountries);

      let c1 = topCountries[0];
      let c2 = topCountries[1];
      let c3 = topCountries[2];
      let c4 = topCountries[3];
      let c5 = topCountries[4];


      const barData = {
        labels: [c1.country_name, c2.country_name, c3.country_name, c4.country_name, c5.country_name],
        datasets: [
          {
            data: [this.getDeaths(c1), this.getDeaths(c2), this.getDeaths(c3), this.getDeaths(c4), this.getDeaths(c5)]
          }
        ],

      };

     //  console.log('barData', barData);


      let totaleWorldCases = countries_stat.map((c) => parseInt(c.cases.replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);
      let top4Cases = countries_stat.sort((a, b) => parseInt(b.cases.replace(/,/g, '')) - parseInt(a.cases.replace(/,/g, ''))).slice(0, 4);


      let other = totaleWorldCases - this.getNumberOf(top4Cases[0].cases) - this.getNumberOf(top4Cases[1].cases) - this.getNumberOf(top4Cases[2].cases) - this.getNumberOf(top4Cases[3].cases)



      console.log('otherWorld', other);

      const pieData = [
        {
          name: top4Cases[0].country_name,
          cases: this.getNumberOf(top4Cases[0].cases),
          color: "rgba(251, 0, 7, 0.5)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top4Cases[1].country_name,
          cases: this.getNumberOf(top4Cases[1].cases),
          color: "rgba(254, 214, 10, 0.5)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top4Cases[2].country_name,
          cases: this.getNumberOf(top4Cases[3].cases),
          color: "rgba(68, 255, 7, 0.5)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top4Cases[3].country_name,
          cases: this.getNumberOf(top4Cases[3].cases),
          color: "rgba(251, 19, 243, 0.5)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },

        // compare to other

        {
          name: "Others",
          cases: totaleWorldCases,
          color: "rgba(55, 0, 255, 0.5)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        }
      ];


      console.log(pieData);



      this.setState({
        isLoading: false,
        barData: barData,
        pieData: pieData
      });


    });

  }


  //helper convert to number 
  private getNumberOf(str: string): number {
    return parseInt(str.replace(/,/g, ''));
  }

  // helper: get list of countries names 
  /* private getNames(arry: CountryInfo[]): string[] {
    let names: string[];
    arry.forEach((c) => names.push(c.country_name))
    return names;
  } */

  // helper
  private getDeaths(c1: CountryInfo): number {
    return parseInt(c1.deaths.replace(/,/, ''));
  }

  render() {

    if (this.state['isLoading']) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: global.BG_COLOR }}>
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator animating={true} color="#f7f1e3" size="large" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, backgroundColor: gloabl.BG_COLOR }}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.text}>Top Deaths</Text>
        <BarChart
          showBarTops={true}
          style={styles.stackecChart}
          segments={2} /* number of horizontal line */
          data={this.state['barData']}
          width={width}
          height={height}
          yAxisLabel=""
          yAxisSuffix=""
          withInnerLines={false}
          chartConfig={barConfig}

        />
        <Text style={styles.text}>Corona Around The World</Text>
        <PieChart
          data={this.state['pieData']}
          width={width}
          height={height}
          chartConfig={pieConfig}
          accessor="cases"
          backgroundColor="none"
          paddingLeft="15"
          absolute={false}
          hasLegend={true}
        />
      </View>


    )
  }

}
export default PlotsScreen;