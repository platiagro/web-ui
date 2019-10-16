import React from 'react';
import './style.scss';

import { Empty, Spin } from 'antd';

import ContentHeader from '../../components/ContentHeader';
import ImplantedFlowsTable from '../../components/ImplantedFlowsTable';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

import { getDeployments } from '../../services/pipelinesApi';

class ImplantedFlows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      flowList: [],
    };

    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    this.deploymentsFetch();
  }

  deploymentsFetch = async () => {
    this.setState({ loading: true });

    const response = await getDeployments();

    this.setState({ loading: false });

    if (response) this.setState({ flowList: response });
  };

  renderBody() {
    const { loading, flowList } = this.state;

    if (loading) return <Spin />;

    return flowList.length === 0 ? (
      <Empty
        image={emptyPlaceholder}
        imageStyle={{
          height: 136,
        }}
        description={
          <span>
            <span>
              <strong>Nenhum fluxo implantado</strong>
            </span>
            <br />
            <span>
              Crie fluxos em &quot;Projetos&quot; para depois implantá-los
            </span>
          </span>
        }
      />
    ) : (
      <ImplantedFlowsTable flowList={flowList} />
    );
  }

  render() {
    return (
      <div className='implantedFlowsPage'>
        <ContentHeader
          title='Fluxos implantados'
          subTitle='Monitore o desempenho do seu fluxo em tempo real.'
        />

        <div className='implantedFlowsPageBody'>
          <div className='body'>{this.renderBody()}</div>
        </div>
      </div>
    );
  }
}

export default ImplantedFlows;
