import React from 'react';
import { VictoryPie, VictoryLabel, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

function StatsDonutChart({
  width,
  height,
  innerRadius,
  labelStyle,
  padAngle,
  data,
  colorScale,
  centerLabelText,
}) {
  console.log('labelStyle', labelStyle);
  console.log('height', height);
  console.log('width', width);
  return (
    <Svg height={height} width={width}>
      <VictoryPie
        theme={VictoryTheme.material}
        standalone={false}
        data={data}
        innerRadius={height * 0.25}
        labelRadius={100}
        padAngle={padAngle}
        colorScale={colorScale}
        labels={() => null}
      />

      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        style={labelStyle}
        x={width * 0.5}
        y={height * 0.55}
        text={centerLabelText}
      />
    </Svg>
  );
}

export default StatsDonutChart;
