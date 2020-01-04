import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export class Line extends Component {
  getOption = () => {
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      series: [{
        data: [980, 820, 756, 310, 780, 463, 821],
        type: 'line',
        areaStyle: {}
      }]
    };
    return option;
  }

  render() {
    return (
      <div>
        <Card title="标准折线图">
          <ReactEcharts option={this.getOption()} />
        </Card>
      </div>
    );
  }
}

export default Line;
