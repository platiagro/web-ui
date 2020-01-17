/**
 * Component responsible for:
 * - Structuring the implanted flows layout
 * - Fetch and List the implantations
 */
import './style.scss';
import React, { useState, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import ContentHeader from '../../components/Content/ContentHeader';
import ImplantedFlowsTable from '../../components/ImplantedFlowsTable';
import emptyPlaceholder from '../../assets/emptyPlaceholder.png';
import { getDeployments } from '../../services/pipelinesApi';

const ImplantedFlows = (props) => {
  const [loading, setLoading] = useState(false);
  const [flowList, setFlowList] = useState([]);

  /**
   * Function to fetch the implatantions
   */
  const deploymentsFetch = async () => {
    setLoading(true);
    const response = await getDeployments();
    setLoading(false);
    if (response) setFlowList(response);
  };

  useEffect(() => {
    deploymentsFetch();
  }, []);

  /**
   * Funtion to render page body
   */
  const renderBody = () => {
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
  };

  return (
    <div className='implantedFlowsPage'>
      <ContentHeader
        title='Fluxos implantados'
        subTitle='Monitore o desempenho do seu fluxo em tempo real.'
      />

      <div className='implantedFlowsPageBody'>
        <div className='body'>{renderBody()}</div>
      </div>
    </div>
  );
};

export default ImplantedFlows;
