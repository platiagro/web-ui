// CORE LIBS
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

// UI LIBS
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CSVLink } from 'react-csv';

// ACTIONS
import { downloadOperatorResultDataset } from 'store/operator/actions';

// UTILS
import utils from 'utils';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDownloadOperatorResultDataset: (experimentId, operatorId) =>
      dispatch(downloadOperatorResultDataset(experimentId, operatorId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    downloadDatasetLoading:
      state.uiReducer.operatorResults.downloadDatasetLoading,
    operator: state.operatorReducer,
    resultDataset: state.operatorReducer.resultDataset,
  };
};

/**
 * Container to display download operator dataset button.
 * @param {object} props Container props
 * @returns {DownloadOperatorDatasetContainer} Container
 */
const DownloadOperatorDatasetContainer = (props) => {
  const {
    downloadDatasetLoading,
    handleDownloadOperatorResultDataset,
    operator,
    resultDataset,
  } = props;
  const { experimentId } = useParams();
  const csvLinkRef = useRef();

  const dispachCSVLinkClick = async () => {
    // necessary sleep to wait csv link button render with the new resultDataset data
    await utils.sleep(1000);
    csvLinkRef.current.link.click();
  };

  useEffect(() => {
    if (resultDataset && resultDataset.length > 0) {
      dispachCSVLinkClick();
    }
  }, [resultDataset]);

  return (
    <>
      <CSVLink
        data={resultDataset ? resultDataset : []}
        filename={'resultDataset.csv'}
        ref={csvLinkRef}
      />
      <Button
        disabled={downloadDatasetLoading}
        type={'default'}
        onClick={() => {
          if (resultDataset && resultDataset.length > 0) {
            csvLinkRef.current.link.click();
          } else {
            handleDownloadOperatorResultDataset(experimentId, operator.uuid);
          }
        }}
      >
        {downloadDatasetLoading ? <LoadingOutlined /> : <DownloadOutlined />}
        Fazer download desta aba
      </Button>
    </>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadOperatorDatasetContainer);
