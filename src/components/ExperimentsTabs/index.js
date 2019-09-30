import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';

const { TabPane } = Tabs;

class ExperimentsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      panes: [],
    };
  }

  componentDidMount() {
    const {
      props: { details },
    } = this;
    this.setState({
      panes: details.experimentsList,
      activeKey:
        details.experimentsList.length > 0
          ? details.experimentsList[0].key
          : null,
    });
  }

  onChange = (activeKey) => {
    if (activeKey !== 'add_tab') this.setState({ activeKey });
  };

  handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) this.add();
  };

  add = () => {
    const {
      props: { details },
      state: { panes },
    } = this;

    const index = panes.length + 1;
    const activeKey = `exp${index}`;

    panes.push({
      title: `${details.projectName}_${index}`,
      content: 'content',
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  };

  render() {
    const {
      state: { activeKey, panes },
      props: { details },
    } = this;
    return (
      <div className='tab-container'>
        <DraggableTabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type='editable-card'
          onTabClick={this.handleClick}
        >
          {panes.map((pane, index) => (
            <TabPane tab={pane.title} closable={false} key={pane.key}>
              <ExperimentContent details={details.experimentsList[index]} />
            </TabPane>
          ))}
        </DraggableTabs>
      </div>
    );
  }
}
ExperimentsTabs.propTypes = {
  details: PropTypes.shape({
    experimentsList: PropTypes.array,
    projectName: PropTypes.string,
  }).isRequired,
};

export default ExperimentsTabs;
