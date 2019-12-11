import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';
export default class App extends React.Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  };

  handleOpen = (id) => {
    this.setState({
      [id]: true
    })
  }

  handleConfirm = (type) => {
    // Modal.confirm();
    Modal[type]({
      title: '温馨提示',
      content: 'React 大法好'
    });
  }

  render() {
    return (
      <div>
        <Card title="基本状态框">
          <Button type="primary" onClick={() => { this.handleOpen('showModal1') }}>open</Button>
          <Button type="primary" onClick={() => { this.handleOpen('showModal2') }}>自定义页脚</Button>
          <Button type="primary" onClick={() => { this.handleOpen('showModal3') }}>顶部20px</Button>
          <Button type="primary" onClick={() => { this.handleOpen('showModal4') }}>水平垂直居中</Button>
        </Card>

        <Card title="基本状态框">
          <Button type="primary" onClick={() => { this.handleConfirm('info') }}>info</Button>
          <Button type="primary" onClick={() => { this.handleConfirm('success') }}>success</Button>
          <Button type="primary" onClick={() => { this.handleConfirm('error') }}>error</Button>
          <Button type="primary" onClick={() => { this.handleConfirm('warning') }}>warning</Button>
        </Card>

        <Modal
          title="Basic Modal1"
          visible={this.state.showModal1}
          onOk={() => { this.setState({ showModal1: false }) }}
          onCancel={() => { this.setState({ showModal1: false }) }}
        >
          <p>Are you OK ?</p>
        </Modal>
        <Modal
          title="Basic Modal2"
          visible={this.state.showModal2}
          okText="好嘞"
          cancelText="再见"
          onOk={() => { this.setState({ showModal2: false }) }}
          onCancel={() => { this.setState({ showModal2: false }) }}
        >
          <p>Are you OK ?</p>
        </Modal>
        <Modal
          title="Basic Modal3"
          visible={this.state.showModal3}
          onOk={() => { this.setState({ showModal3: false }) }}
          onCancel={() => { this.setState({ showModal3: false }) }}
          style={{top: 20}}
        >
          <p>Are you OK ?</p>
        </Modal>
        <Modal
          title="Basic Modal4"
          visible={this.state.showModal4}
          onOk={() => { this.setState({ showModal4: false }) }}
          onCancel={() => { this.setState({ showModal4: false }) }}
          className="vertical-center-modal"
        >
          <p>Are you OK ?</p>
        </Modal>
      </div>
    );
  }
}