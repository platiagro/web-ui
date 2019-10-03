import React from 'react';
import './style.scss';

import { Empty, Spin } from 'antd';

import ContentHeader from '../../components/ContentHeader';
import ImplantedFlowsTable from '../../components/ImplantedFlowsTable';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

// remove after tests
const flows = [
  {
    key: '1',
    flowName: 'Projeto 1 - Experimento 3',
    url: '.../testandoURLlonga/modelo_workshop.foragri123.com/api/',
    created: '11/10/2019 12:59:21',
    action: 'http',
  },
  {
    key: '2',
    flowName: 'Lero 1 - Lero Lero 2',
    url: '.../testandoURLlonga/modelo_workshop.foragri123.com/api/',
    created: '11/10/2019 12:59:21',
    action: 'http',
  },
  {
    key: '3',
    flowName: 'Colheita - Melhor Época',
    url: '.../testandoURLlonga/modelo_workshop.foragri123.com/api/',
    created: '11/10/2019 12:59:21',
    action: 'http',
  },
];

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
    this.setState({ loading: true });

    // const response = await api.get(`/projects`);

    setTimeout(() => this.setState({ loading: false }), 3000);

    // this.setState({ loading: false });

    // this.setState({ projectList: response.data.payload });
    this.setState({ flowList: flows });
  }

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
