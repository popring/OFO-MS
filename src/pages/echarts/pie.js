import React, { Component } from 'react';
import { Card } from 'antd';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react'
export default class bar extends Component {

  getOption = () => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };
    return option;
  }

  getOption2 = () => {
    const option = {
      legend: {
        orient: 'vertical',
        right: 10,
      },
      tooltip: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 5, name: '周一' },
            { value: 20, name: '周二' },
            { value: 39, name: '周三' },
            { value: 50, name: '周四' },
            { value: 45, name: '周五' },
            { value: 25, name: '周六' },
            { value: 29, name: '周日' }
          ]
        }
      ]
    }

    return option;
  }
  render() {
    return (
      <div>
        <Card>
          <ReactEcharts option={this.getOption2()} />
        </Card>
        <Card>
          <ReactEcharts option={this.getOption()} />
        </Card>
      </div>
    );
  }
}