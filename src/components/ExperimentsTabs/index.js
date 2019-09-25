import React from 'react';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import DraggableTabs from '../DraggableTabs';

const { TabPane } = Tabs;

class ExperimentsTabs extends React.Component {
  constructor(props) {
    super(props);
    // this.newTabIndex = 0;
    // const panes = [];
    this.state = {
      activeKey: null,
      panes: [
        {
          title: 'Experimento 1',
          content: 'Content of Tab Pane 1',
          key: 'exp0',
        },
      ],
    };
  }

  componentDidMount() {
    const {
      state: { panes },
      props: { details },
    } = this;
    console.log(details);
    this.setState({ panes: details.experimentsList }, () => {
      // this.newTabIndex = panes.length;
    });
  }

  onChange = (activeKey) => {
    if (activeKey !== 'add_tab') this.setState({ activeKey });
  };

  handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) this.add();
  };

  add = () => {
    const { panes } = this.state;
    const index = panes.length + 1;
    // // eslint-disable-next-line no-plusplus
    const activeKey = `exp${index}`;

    panes.push({
      title: `Experimento ${index}`,
      content: `Experimento ${index}`,
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  };

  remove = (targetKey) => {
    const { panes } = this.state;
    let { activeKey } = this.state;

    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panels = panes.filter((pane) => pane.key !== targetKey);
    if (panels.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panels[lastIndex].key;
      } else {
        activeKey = panels[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { activeKey, panes } = this.state;
    return (
      <div className='tab-container'>
        <DraggableTabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type='editable-card'
          onTabClick={this.handleClick}
        >
          {panes.map((pane) => (
            <TabPane tab={pane.title} closable={false} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </DraggableTabs>
      </div>
    );
  }
}
// ExperimentsTabs.propTypes = {

// };

export default ExperimentsTabs;
