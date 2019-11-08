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
  }

  fromNow = () => {
    const start = moment(this.state.start);
    const now = moment();
    const diffTime = now.diff(start,'minute');
    this.setState({
      diffTime
    })
  }

  render() {
    return (
      <div className="footer">
        版权所有：慕课网&河畔一脚，距离本项目开启已经过了{this.state.diffTime}分钟，继续加油。
      </div>
    );
  }
}