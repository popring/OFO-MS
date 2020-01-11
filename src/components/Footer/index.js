import React from 'react';
import moment from 'moment';

import './index.less'
export default class Footer extends React.Component {

  state = {
    start: '2019-10-15 15:20:02',
    end: '2020-1-8 23:26:43',
    diffTime: null,
    timer: null
  }

  componentDidMount() {
    this.fromNow();
  }

  fromNow = () => {
    const start = moment(this.state.start);
    const now = moment(this.state.end);
    let time = now.diff(start, 'seconds');
    let day = Math.floor(time / 60 / 60 / 24);
    let hour = Math.floor(time / 60 / 60 % 24);
    let min = Math.floor(time / 60 % 60);
    let seconds = Math.floor(time % 60);
    let diffTime = `${day}天${hour}小时${min}分钟${seconds}秒`;
    this.setState({
      diffTime
    })
  }

  render() {
    return (
      <div className="footer">
        版权所有：OLO，本项目经历{this.state.diffTime}，终将以bug满满结束。
      </div>
    );
  }
}