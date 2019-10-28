import React from 'react';
import { Card, Tabs, Icon } from 'antd';
const { TabPane } = Tabs;
export default class tabs extends React.Component {

  constructor(props) {
    super(props);

    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
        closable: false,
      },
    ];

    this.newTabIndex = 0;

    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }

  handleChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTabs${this.newTabIndex++}`;
    panes.push({ title: `Tab ${activeKey}`, content: `Content of Tab ${activeKey}`, key: activeKey })
    this.setState({
      panes,
      activeKey
    })
  }

  remove = (targetKey) => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <Card title="tab页签">
          <Tabs>
            <TabPane tab="tab 1" key="1">
              这是标签1 的内容
            </TabPane>
            <TabPane tab="tab 2" key="2" disabled>
              这是标签2 的内容
            </TabPane>
            <TabPane tab="tab 3" key="3">
              这是标签3 的内容
            </TabPane>
          </Tabs>
        </Card>

        <Card title="带图的页签">
          <Tabs>
            <TabPane key="1" tab={<span><Icon type="apple" />Apple</span>}>
              这是标签1 的内容
            </TabPane>
            <TabPane tab={<span><Icon type="edit" />修改</span>} key="2">
              这是标签2 的内容
            </TabPane>
            <TabPane tab={<span><Icon type="delete" />删除的数据</span>} key="3">
              这是标签3 的内容
            </TabPane>
          </Tabs>
        </Card>

        <Card title="动态渲染">
          <Tabs
            type="editable-card"
            onChange={this.handleChange}
            onEdit={this.handleEdit}
            activeKey={this.state.activeKey}
          >
            {
              this.state.panes.map(pane =>
                <TabPane
                  tab={pane.title}
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
                </TabPane>
              )
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}