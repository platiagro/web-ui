import React, { useLayoutEffect, useMemo } from 'react';
import { Pagination, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchPaginatedDataset,
  updateDatasetColumnRequest,
  updateAllDatasetColumnSuccess,
  updateAllDatasetColumnFail,
  updateAllDatasetColumnStart,
} from 'store/dataset/actions';
import { Modal, Button } from 'uiComponents';
import { UploadButton } from 'components/Buttons';
import { hideDataViewModal } from 'store/ui/actions';
import { saveTargetAttribute } from 'store/operator';
import { CommonTable, DatasetColumnsTable } from 'components';

import './DataViewModalContainer.less';

const datasetColumnsSelector = ({ datasetReducer }) => {
  return datasetReducer.columns;
};

const datasetCurrentPageSelector = ({ datasetReducer }) => {
  return datasetReducer.currentPage;
};

const datasetDataSelector = ({ datasetReducer }) => {
  return datasetReducer.data;
};

const datasetFeaturetypesSelector = ({ datasetReducer }) => {
  return datasetReducer.featuretypes;
};

const datasetLoadingSelector = ({ uiReducer }) => {
  return uiReducer.datasetOperator.loading;
};

const datasetNameSelector = ({ datasetReducer }) => {
  return datasetReducer.name;
};

const datasetPageSizeSelector = ({ datasetReducer }) => {
  return datasetReducer.pageSize;
};

const datasetTotalSelector = ({ datasetReducer }) => {
  return datasetReducer.total;
};

const isVisibleSelector = ({ uiReducer }) => {
  return uiReducer.dataViewModal.isVisible;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.dataViewModal.loading;
};

const setParameterLoadingSelector = ({ uiReducer }) => {
  return uiReducer.operatorParameter.loading;
};

const datasetOperatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const isFullScreen = true;
const closeButtonText = 'Fechar';
const title = 'Visualizar dados';

const DataViewModalContainer = () => {
  const dispatch = useDispatch();

  const datasetColumns = useSelector(datasetColumnsSelector);
  const datasetCurrentPage = useSelector(datasetCurrentPageSelector);
  const datasetData = useSelector(datasetDataSelector);
  const datasetFeaturetypes = useSelector(datasetFeaturetypesSelector);
  const datasetLoading = useSelector(datasetLoadingSelector);
  const datasetName = useSelector(datasetNameSelector);
  const datasetPageSize = useSelector(datasetPageSizeSelector);
  const datasetTotal = useSelector(datasetTotalSelector);
  const isVisible = useSelector(isVisibleSelector);
  const loading = useSelector(loadingSelector);
  const setParameterLoading = useSelector(setParameterLoadingSelector);
  const datasetOperator = useSelector(datasetOperatorSelector);

  const actionUrl = useMemo(() => {
    return `${process.env.REACT_APP_DATASET_API}/datasets/${datasetName}`;
  }, [datasetName]);

  const attributesCount = useMemo(() => {
    return new Intl.NumberFormat('pt-BR').format(datasetColumns.length);
  }, [datasetColumns.length]);

  const observationsCount = useMemo(() => {
    return new Intl.NumberFormat('pt-BR').format(datasetTotal);
  }, [datasetTotal]);

  const columns = useMemo(() => {
    return datasetColumns.map((column, index) => {
      return {
        title: column.name,
        dataIndex: index,
      };
    });
  }, [datasetColumns]);

  const selectedRows = useMemo(() => {
    const featureParameter = datasetOperator?.parameters.find(
      (parameter) => parameter.name === 'target'
    );

    return featureParameter ? [featureParameter.value] : [];
  }, [datasetOperator?.parameters]);

  const handleClose = () => {
    dispatch(hideDataViewModal());
  };

  const handleUpdateDatasetColumn = (columnName, columnNewType) => {
    dispatch(updateDatasetColumnRequest(columnName, columnNewType));
  };

  const handleUpdateAllDatasetColumnSuccess = (allColumns) => {
    dispatch(updateAllDatasetColumnSuccess(allColumns));
  };

  const handleUpdateAllDatasetColumnFail = (message) => {
    dispatch(updateAllDatasetColumnFail(message));
  };

  const handleUpdateAllDatasetColumnStart = () => {
    dispatch(updateAllDatasetColumnStart());
  };

  const handleTargetAttribute = (parameters, projectId, experimentId) => {
    dispatch(saveTargetAttribute(projectId, experimentId, parameters));
  };

  const handleChangePagination = (page, size) => {
    dispatch(fetchPaginatedDataset(datasetName, page, size));
  };

  useLayoutEffect(() => {
    if (isVisible) {
      dispatch(fetchPaginatedDataset(datasetName, 1, 10));
    }
  }, [datasetName, dispatch, isVisible]);

  return (
    <Modal
      className='dataViewModalParent'
      closeButtonText={closeButtonText}
      isFullScreen={isFullScreen}
      handleClose={handleClose}
      isVisible={isVisible}
      title={title}
    >
      <div className='dataViewModal'>
        <div className='dataViewModalDataHeader'>
          <span style={{ fontSize: '12px' }}>ATRIBUTOS: </span>

          <span style={{ color: '#262626', fontSize: '14px' }}>
            {attributesCount}
          </span>

          <span style={{ marginLeft: '25px', fontSize: '12px' }}>
            OBSERVAÇÕES:{' '}
          </span>

          <span style={{ color: '#262626', fontSize: '14px' }}>
            {observationsCount}
          </span>
        </div>

        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Atributos' key='1'>
            <div className='attributtesTable'>
              <DatasetColumnsTable
                columns={datasetColumns}
                selectedRows={selectedRows}
                setParameterLoading={setParameterLoading}
                handleRowSelection={handleTargetAttribute}
                handleSetColumnType={handleUpdateDatasetColumn}
              />
            </div>

            <div className='dataViewAttributtesDownload'>
              <h2>Tipos dos atributos</h2>

              <a
                href={`data:text/plain;base64,${btoa(datasetFeaturetypes)}`}
                download='featuretypes.txt'
              >
                <Button
                  isDisabled={!datasetFeaturetypes}
                  isLoading={false}
                  type={'default'}
                  icon={<DownloadOutlined />}
                >
                  Fazer download
                </Button>
              </a>
            </div>

            <div className='dataViewAttributtesUpload'>
              <h2>Altere todos os tipos de uma só vez</h2>

              <p>
                Faça download dos tipos dos atributos, altere os tipos
                necessários e importe novamente o arquivo.
              </p>

              <h3>Dicas</h3>

              <ul>
                <li>Os tipos podem ser: Categórico, Data/Hora ou Numérico.</li>

                <li>
                  Cada linha do arquivo contém um tipo de atributo, na mesma
                  ordem das colunas dos dados de entrada;
                </li>
              </ul>

              <UploadButton
                method='PATCH'
                isDisabled={false}
                isLoading={loading}
                actionUrl={actionUrl}
                parameterName='featuretypes'
                buttonText='Importar arquivo'
                handleUploadFail={handleUpdateAllDatasetColumnFail}
                handleUploadStart={handleUpdateAllDatasetColumnStart}
                handleUploadSuccess={handleUpdateAllDatasetColumnSuccess}
              />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab='Observações' key='2'>
            <div className='dataViewObservations'>
              <CommonTable
                size={'small'}
                columns={columns}
                dataSource={datasetData}
                isLoading={datasetLoading}
                rowKey={(_, index) => `observação-${index}`}
                scroll={{
                  x: columns.length > 10 ? 2000 : 1000,
                  y: window.innerHeight / 2,
                }}
              />

              <br />

              <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                total={datasetTotal}
                pageSize={datasetPageSize}
                current={datasetCurrentPage}
                style={{ textAlign: 'right' }}
                onChange={handleChangePagination}
                onShowSizeChange={handleChangePagination}
                pageSizeOptions={['10', '20', '30', '40', '50']}
                showSizeChanger
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default DataViewModalContainer;
