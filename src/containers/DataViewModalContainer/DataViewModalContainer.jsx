// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO: criar ui component para as tabs
// TODO: criar ui component para table
// ANTD COMPONENTS
import { Tabs, Table } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

// UI COMPONENTS
import { Modal, Button } from 'uiComponents';

// COMPONENTS
import { DatasetColumnsTable } from 'components';

// ACTIONS
import { hideDataViewModal } from 'store/ui/actions';
import { updateDatasetColumnRequest } from 'store/dataset/actions';

// STYLES
import './DataViewModalContainer.less';

// TABS COMPONENTS
const { TabPane } = Tabs;

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // close results modal
    handleClose: () => dispatch(hideDataViewModal()),
    // update dataset column
    handleUpdateDatasetColumn: (columnName, columnNewType) =>
      dispatch(updateDatasetColumnRequest(columnName, columnNewType)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // dataset columns
    datasetColumns: state.datasetReducer.columns,
    // dataset observation count
    datasetObservationsCount: state.datasetReducer.observationsCount,
    // Data view modal is visible
    isVisible: state.uiReducer.dataViewModal.isVisible,
  };
};

// TODO: Separar em componentes
/**
 * Container to display dataset data view modal.
 *
 * @param {object} props Container props
 * @returns {DataViewModalContainer} Container
 * @component
 */
const DataViewModalContainer = (props) => {
  // destructuring props
  const {
    // dataset observations count
    datasetObservationsCount,
    // dataset columns
    datasetColumns,
    // close modal handler
    handleClose,
    // dataset column change handler
    handleUpdateDatasetColumn,
    // data view modal is visible
    isVisible,
  } = props;

  // CONSTANTS
  // button text
  const closeButtonText = 'Fechar';

  // modal title
  const title = 'Visualizar dados';

  // modal is full screen
  const isFullScreen = true;

  // atributtes count
  const attributesCount = new Intl.NumberFormat('pt-BR').format(
    datasetColumns.length
  );

  // observations count
  const observationsCount = new Intl.NumberFormat('pt-BR').format(
    datasetObservationsCount
  );

  // observations table columns
  const columns = datasetColumns.map((column) => ({
    title: column.name,
    dataIndex: column.name,
    key: column.name,
  }));

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
              <Button
                isDisabled={true}
                isLoading={false}
                handleClick={() => console.log('Em desenvolvimento!')}
                type={'ghost'}
                icon={<DownloadOutlined />}
              >
                Fazer download
              </Button>
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
              <Button
                isDisabled={true}
                isLoading={false}
                handleClick={() => console.log('Em desenvolvimento!')}
                type={'ghost'}
                icon={<UploadOutlined />}
              >
                Importar arquivo
              </Button>
            </div>
          </TabPane>
          {/* observations tab */}
          <TabPane tab='Observações' key='2'>
            <div className='dataViewObservations'>
              <Table dataSource={[]} columns={columns} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

DataViewModalContainer.propTypes = {
  /** Data view modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Data view modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Dataset columns */
  datasetColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Dataset observations count */
  datasetObservationsCount: PropTypes.number.isRequired,
  /** dataset column change handler */
  handleUpdateDatasetColumn: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataViewModalContainer);
