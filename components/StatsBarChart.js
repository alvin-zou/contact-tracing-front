import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
} from 'victory-native';

function StatsBarChart({ actBarData, recBarData }) {
  return (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryLegend
        x={125}
        y={50}
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
        data={[
          { name: 'Actual', symbol: { fill: '#A4D38D' } },
          { name: 'Recommended', symbol: { fill: '#A784E2' } },
        ]}
      />
      <VictoryStack colorScale={['#A4D38D', '#A784E2']}>
        <VictoryBar data={actBarData} />
        <VictoryBar data={recBarData} />
      </VictoryStack>
    </VictoryChart>
  );
}

export default StatsBarChart;
