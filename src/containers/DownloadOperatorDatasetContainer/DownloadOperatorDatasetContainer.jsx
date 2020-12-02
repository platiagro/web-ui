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
    handleDownloadOperatorResultDataset: (
      projectId,
      experimentId,
      operatorId
    ) =>
      dispatch(
        downloadOperatorResultDataset(projectId, experimentId, operatorId)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    downloadDataset: state.operatorReducer.downloadDataset,
    downloadDatasetLoading:
      state.uiReducer.operatorResults.downloadDatasetLoading,
    operator: state.operatorReducer,
  };
};

/**
 * Container to display download operator dataset button.
 * @param {object} props Container props
 * @returns {DownloadOperatorDatasetContainer} Container
 */
const DownloadOperatorDatasetContainer = (props) => {
  const {
    downloadDataset,
    downloadDatasetLoading,
    handleDownloadOperatorResultDataset,
    operator,
  } = props;
  const { projectId, experimentId } = useParams();
  const csvLinkRef = useRef();

  const dispachCSVLinkClick = async () => {
    // necessary sleep to wait csv link button render with the new resultDataset data
    await utils.sleep(1000);
    csvLinkRef.current.link.click();
  };

  useEffect(() => {
    if (downloadDataset && downloadDataset.length > 0) {
      dispachCSVLinkClick();
    }
  }, [downloadDataset]);

  return (
    <>
      <CSVLink
        data={downloadDataset ? downloadDataset : []}
        filename={'resultDataset.csv'}
        ref={csvLinkRef}
      />
      <Button
        disabled={downloadDatasetLoading}
        type={'default'}
        onClick={() => {
          if (downloadDataset && downloadDataset.length > 0) {
            csvLinkRef.current.link.click();
          } else {
            handleDownloadOperatorResultDataset(
              projectId,
              experimentId,
              operator.uuid
            );
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
