import React from 'react'

import "./life.css"

export default class Life extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  
  handleBindClick() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div className="content">
        <button onClick={this.handleClick}>+1</button>
        <button onClick={this.handleBindClick.bind(this)}>+1</button>
        <p>当前状态数位：{this.state.count}</p>
      </div>
    )
  }
}