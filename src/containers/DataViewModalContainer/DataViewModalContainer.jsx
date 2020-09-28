// REACT LIBS
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// TODO: criar ui component para as tabs
// TODO: criar ui component para table
// ANTD COMPONENTS
import { Pagination, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

// UI COMPONENTS
import { Modal, Button } from 'uiComponents';

// COMPONENTS
import { CommonTable, DatasetColumnsTable } from 'components';
import { UploadButton } from 'components/Buttons';

// ACTIONS
import { hideDataViewModal } from 'store/ui/actions';
import {
  fetchPaginatedDataset,
  updateDatasetColumnRequest,
  updateAllDatasetColumnSuccess,
  updateAllDatasetColumnFail,
  updateAllDatasetColumnStart,
} from 'store/dataset/actions';

// STYLES
import './DataViewModalContainer.less';

// TABS COMPONENTS
const { TabPane } = Tabs;

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // close results modal
    handleClose: () => dispatch(hideDataViewModal()),
    // fetch paginated dataset
    handleFetchPaginatedDataset: (datasetName, page, pageSize) =>
      dispatch(fetchPaginatedDataset(datasetName, page, pageSize)),
    // update dataset column
    handleUpdateDatasetColumn: (columnName, columnNewType) =>
      dispatch(updateDatasetColumnRequest(columnName, columnNewType)),
    // update all columns
    handleUpdateAllDatasetColumnSuccess: (allColumns) =>
      dispatch(updateAllDatasetColumnSuccess(allColumns)),
    handleUpdateAllDatasetColumnFail: (message) =>
      dispatch(updateAllDatasetColumnFail(message)),
    handleUpdateAllDatasetColumnStart: () =>
      dispatch(updateAllDatasetColumnStart()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // dataset columns
    datasetColumns: state.datasetReducer.columns,
    // dataset current page
    datasetCurrentPage: state.datasetReducer.currentPage,
    // dataset data
    datasetData: state.datasetReducer.data,
    // dataset featuretypes
    datasetFeaturetypes: state.datasetReducer.featuretypes,
    // dataset loading
    datasetLoading: state.uiReducer.datasetOperator.loading,
    // dataset name
    datasetName: state.datasetReducer.name,
    // dataset page size
    datasetPageSize: state.datasetReducer.pageSize,
    // dataset total data
    datasetTotal: state.datasetReducer.total,
    // data view modal is visible
    isVisible: state.uiReducer.dataViewModal.isVisible,
    // modal loading
    loading: state.uiReducer.dataViewModal.loading,
  };
};

// TODO: Separar em componentes
/**
 * Container to display dataset data view modal.
 *
 * @param {object} props Container props
 * @returns {DataViewModalContainer} Container
 */
const DataViewModalContainer = (props) => {
  const {
    datasetColumns,
    datasetCurrentPage,
    datasetData,
    datasetFeaturetypes,
    datasetLoading,
    datasetName,
    datasetPageSize,
    datasetTotal,
    handleClose,
    handleFetchPaginatedDataset,
    handleUpdateDatasetColumn,
    handleUpdateAllDatasetColumnStart,
    handleUpdateAllDatasetColumnSuccess,
    handleUpdateAllDatasetColumnFail,
    isVisible,
    loading,
  } = props;

  useLayoutEffect(() => {
    if (isVisible) {
      handleFetchPaginatedDataset(datasetName, 1, 10);
    }
  }, [datasetName, isVisible, handleFetchPaginatedDataset]);

  // CONSTANTS
  // button text
  const closeButtonText = 'Fechar';

  // modal title
  const title = 'Visualizar dados';

  // action url
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets/${datasetName}`;

  // modal is full screen
  const isFullScreen = true;

  // atributtes count
  const attributesCount = new Intl.NumberFormat('pt-BR').format(
    datasetColumns.length
  );

  // observations count
  const observationsCount = new Intl.NumberFormat('pt-BR').format(datasetTotal);

  // observations table columns
  const columns = datasetColumns.map((column, index) => {
    return {
      title: column.name,
      dataIndex: index,
    };
  });

  const paginationOnChange = (page, size) => {
    handleFetchPaginatedDataset(datasetName, page, size);
  };

  // RENDERs
  // rendering component
  return (
    <Modal
      closeButtonText={closeButtonText}
      handleClose={handleClose}
      isFullScreen={isFullScreen}
      isVisible={isVisible}
      title={title}
      className='dataViewModalParent'
    >
      <div className='dataViewModal'>
        {/* data header */}
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
        {/* modal tabs */}
        <Tabs defaultActiveKey='1'>
          {/* attributtes tab */}
          <TabPane tab='Atributos' key='1'>
            <div className='attributtesTable'>
              {/* dataset columns table */}
              <DatasetColumnsTable
                columns={datasetColumns}
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
                actionUrl={actionUrl}
                parameterName='featuretypes'
                method='PATCH'
                buttonText='Importar arquivo'
                handleUploadFail={handleUpdateAllDatasetColumnFail}
                handleUploadSuccess={handleUpdateAllDatasetColumnSuccess}
                handleUploadStart={handleUpdateAllDatasetColumnStart}
                isDisabled={false}
                isLoading={loading}
              />
            </div>
          </TabPane>
          {/* observations tab */}
          <TabPane tab='Observações' key='2'>
            <div className='dataViewObservations'>
              <CommonTable
                columns={columns}
                dataSource={datasetData}
                isLoading={datasetLoading}
                rowKey={() => {
                  return uuidv4();
                }}
                scroll={{
                  x: columns.length > 10 ? 2000 : 1000,
                  y: window.innerHeight / 2,
                }}
                size={'small'}
              />
              <br />
              <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                current={datasetCurrentPage}
                pageSize={datasetPageSize}
                total={datasetTotal}
                onChange={paginationOnChange}
                onShowSizeChange={paginationOnChange}
                style={{ textAlign: 'right' }}
                showSizeChanger
                pageSizeOptions={['10', '20', '30', '40', '50']}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

DataViewModalContainer.propTypes = {
  /** Dataset columns */
  datasetColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Dataset current page */
  datasetCurrentPage: PropTypes.number,
  /** Dataset data */
  datasetData: PropTypes.array,
  /** Dataset featuretypes */
  datasetFeaturetypes: PropTypes.string.isRequired,
  /** Dataset is loading */
  datasetLoading: PropTypes.bool.isRequired,
  /** Dataset name */
  datasetName: PropTypes.string.isRequired,
  /** Dataset page size */
  datasetPageSize: PropTypes.number,
  /** Dataset total data */
  datasetTotal: PropTypes.number,
  /** Data view modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Fetch Paginated Dataset handler */
  handleFetchPaginatedDataset: PropTypes.func.isRequired,
  /** Dataset column change handler */
  handleUpdateDatasetColumn: PropTypes.func.isRequired,
  handleUpdateAllDatasetColumnStart: PropTypes.func.isRequired,
  handleUpdateAllDatasetColumnSuccess: PropTypes.func.isRequired,
  handleUpdateAllDatasetColumnFail: PropTypes.func.isRequired,
  /** Data view modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Data view modal is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataViewModalContainer);
