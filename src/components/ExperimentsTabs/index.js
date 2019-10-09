import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';
import * as projectsServices from '../../services/projectsApi';

const { TabPane } = Tabs;
class ExperimentsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
    };
  }

  componentDidMount() {
    const {
      props: { details, params },
    } = this;
    this.setState({
      activeKey: details.experimentList.length > 0 ? params.experimentId : null,
    });
  }

  onChange = (activeKey) => {
    if (activeKey !== 'add_tab') {
      this.setState({ activeKey });
    }
  };

  handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) this.add();
  };

  add = async () => {
    const {
      props: { details, fetch },
    } = this;

    const index = details.experimentList.length + 1;
    const newTabName = `${details.name}_${index}`;
    const response = await projectsServices.createExperiment(
      details.uuid,
      newTabName
    );
    if (!!response) {
      await fetch(details.uuid);
      this.setState({ activeKey: response.data.payload.uuid });
    }
  };

  render() {
    const {
      state: { activeKey },
      props: { details, fetch },
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
          {details.experimentList.map((pane, index) => (
            <TabPane tab={pane.name} closable={false} key={pane.uuid}>
              <ExperimentContent
                fetch={fetch}
                details={details.experimentList[index]}
              />
            </TabPane>
          ))}
        </DraggableTabs>
      </div>
    );
  }
}
ExperimentsTabs.propTypes = {
  details: PropTypes.shape({
    experimentList: PropTypes.array,
    projectName: PropTypes.string,
  }).isRequired,
};

export default ExperimentsTabs;
