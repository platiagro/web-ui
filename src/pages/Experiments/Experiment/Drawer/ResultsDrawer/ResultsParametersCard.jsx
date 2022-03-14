import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CommonTable } from 'components';

const ResultsParametersCard = ({ isAdding, parameters, figures }) => {
  const parametersColumns = [
    {
      title: 'Parâmetro',
      dataIndex: 'name',
      key: 'parameter',
      render(val) {
        return <span style={{ fontWeight: 'bold' }}>{val}</span>;
      },
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render(val) {
        return <span style={{ fontFamily: 'monospace' }}>{val}</span>;
      },
    },
  ];
  console.log('figures', figures);

  return (
    <Card
      className='operator-result-item'
      icon={isAdding ? <LoadingOutlined /> : <PlusOutlined />}
      tab={<span>Parâmetros</span>}
    >
      <CommonTable
        isLoading={false}
        dataSource={parameters}
        columns={parametersColumns}
        rowKey={(record) => record.name}
        bordered
      />
    </Card>
  );
};

ResultsParametersCard.propTypes = {
  isAdding: PropTypes.bool,
  parameters: PropTypes.array,
  figures: PropTypes.array.isRequired,
};

ResultsParametersCard.defaultProps = {
  isAdding: false,
};

export default ResultsParametersCard;
