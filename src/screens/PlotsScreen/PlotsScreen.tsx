import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import styles from './styles';
import { BarChart, PieChart, ChartConfig, ChartData } from "react-native-chart-kit";
import * as gloabl from '../../styles/global';
import { casesByCountry } from '../../utils/api';
import { getTopOf, toNumber, totalOf } from '../../utils/helpers';
import { ApiData } from '../../models/ApiData';
import Loading from '../../components/Loading/Loading';
import PieData from '../../models/PieData';

// pieConfig and barConfig are the same 'maybe shared'
const CHAT_CONFIG: ChartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.7,
  color: (opacity = 1) => `rgba(254, 245, 48, ${opacity})`,
  labelColor: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1,
  fillShadowGradientOpacity: 0.7,
  decimalPlaces: null,
}
// shared 
const WIDTH: number = Dimensions.get('window').width;
const HEIGHT: number = Math.round(Dimensions.get('window').height) / 2 - 98;


const chartData: ChartData = {
  labels: Array<string>(),
  datasets: [
    {
      data: Array<number>()
    }
  ]
}

export default function PlotsScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [barData, setBarData] = useState(chartData);
  const [pieData, setPieData] = useState(Array<PieData>());

  useEffect(() => {
    _getTotats();
  }, []);

  const _getTotats = () => {

    casesByCountry().then((res: ApiData) => {

      const { statistic_taken_at, countries_stat } = res;

      // console.log('topDeaths', topCountries);

      const barData: ChartData = {
        labels: [...getTopOf(countries_stat, 'deaths', 7).map(obj => obj.country_name)],
        datasets: [
          {
            data: [...getTopOf(countries_stat, 'deaths', 7).map(obj => toNumber(obj.deaths))]
          }
        ],
      };

      //  console.log('barData', barData);

      let totaleWorldCases = totalOf(countries_stat, 'cases');
      let top5Cases = getTopOf(countries_stat, 'cases', 5);



      for (let i = 0; i < top5Cases.length; i++) {
        totaleWorldCases -= toNumber(top5Cases[i].cases);
      }

      console.log(top5Cases);
      console.log(totaleWorldCases);

      const pieData: Array<PieData> = [
        {
          name: top5Cases[0].country_name,
          data: toNumber(top5Cases[0].cases),
          color: "rgba(255, 0, 0, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top5Cases[1].country_name,
          data: toNumber(top5Cases[1].cases),
          color: "rgba(255, 115, 0, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top5Cases[2].country_name,
          data: toNumber(top5Cases[2].cases),
          color: "rgba(255, 236, 0, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top5Cases[3].country_name,
          data: toNumber(top5Cases[3].cases),
          color: "rgba(82, 215, 38, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        {
          name: top5Cases[4].country_name,
          data: toNumber(top5Cases[4].cases),
          color: "rgba(124, 221, 221, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        },
        // compare to other
        {
          name: "Others",
          data: totaleWorldCases,
          color: "rgba(0, 126, 214, 0.7)",
          legendFontColor: "#f7f1e3",
          legendFontSize: 15
        }
      ];
      setIsLoading(false);
      setBarData(barData);
      setPieData(pieData);
    });
  }
  if (isLoading) {
    return (
      <Loading />
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
        data={barData}
        width={WIDTH}
        height={HEIGHT}
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={false}
        chartConfig={CHAT_CONFIG}
      />
      <Text style={styles.text}>Corona Around The World</Text>

      <PieChart
        data={pieData}
        width={WIDTH}
        height={HEIGHT}
        chartConfig={CHAT_CONFIG}
        accessor="data"
        backgroundColor="none"
        paddingLeft="15"
        absolute={false}
        hasLegend={true}
      />
    </View>
  )
}
