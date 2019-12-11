import React, { Component } from 'react';
import { Card } from 'antd';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react'
export default class bar extends Component {

  getOption = () => {
    const option = {
      title: {
        text: '本周订单量'
      },
      tooltip: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {},
      series: [{
        name: '订单量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 1]
      }]
    }
    return option;
  }

  getOption2 = () => {
    const option = {
      title: {
        text: '订单对比'
      },
      legend: {},
      tooltip: {},
      dataset: {
        // 提供一份数据。
        source: [
          ['category', '摩拜', '小蓝车', '青桔单车'],
          ['周一', 43.3, 85.8, 93.7],
          ['周二', 83.1, 73.4, 55.1],
          ['周三', 86.4, 65.2, 82.5],
          ['周四', 72.4, 53.9, 39.1],
          ['周五', 72.4, 53.9, 39.1],
          ['周六', 72.4, 53.9, 39.1],
          ['周日', 72.4, 53.9, 39.1]
        ]
      },
      // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
      xAxis: { type: 'category' },
      // 声明一个 Y 轴，数值轴。
      yAxis: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
      ]
    }
    return option;
  }
  render() {
    return (
      <div>
        <Card title="标准柱状图">
          <ReactEcharts option={this.getOption()} />
        </Card>

        <Card title="标准柱状图">
          <ReactEcharts option={this.getOption2()} />
        </Card>
      </div>
    );
  }
}