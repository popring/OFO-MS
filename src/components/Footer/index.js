import React from 'react';
import moment from 'moment';

import './index.less'
export default class Footer extends React.Component {

  state = {
    start: '2019-10-15 15:20:02',
    diffTime: null
  }

  componentWillMount() {
    this.fromNow();
    setInterval(() => {
      this.fromNow();
    }, 1000)
  }

  fromNow = () => {
    const start = moment(this.state.start);
    const now = moment();
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
        版权所有：慕课网&河畔一脚，距离本项目开启已经过了{this.state.diffTime}，继续加油。
      </div>
    );
  }
}