import React, { useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CopyOutlined } from '@ant-design/icons';

import { PropertyBlock, CopyToClipboard } from 'components';
import { SelectInputBlock } from 'components/InputBlocks';

import { DeploymentDatasetUploadContainer } from 'containers';

// STYLES
import './ExternalDatasetDrawer.component.style.less';

/**
 * This component is responsible for render the external dataset drawer.
 */
const ExternalDatasetDrawer = (props) => {
  const { urlText, propertyTip, propertyTitle, onClickLearnMore, description } =
    props;

  const [datasetType, setDatasetType] = useState('L');

  const disabledButton = !urlText;

  const handleChange = (value) => {
    setDatasetType(value);
  };

  return (
    <div className='externalDatasetDrawer'>
      <PropertyBlock title={propertyTitle} tip={propertyTip}>
        <SelectInputBlock
          key='deploymentDataset'
          placeholder='Selecionar'
          options={[
            { name: 'Aplicação externa', uuid: 'E' },
            { name: 'Arquivo local', uuid: 'L' },
          ]}
          handleChange={handleChange}
          value={datasetType}
          valueLatestTraining='L'
        />
      </PropertyBlock>
      {datasetType === 'E' ? (
        <div className='externalDatasetDrawerUrl'>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <p>
            <Button type='link' onClick={onClickLearnMore}>
              Saiba mais
            </Button>
          </p>
          <CopyToClipboard text={urlText}>
            <Button
              type='secondary'
              icon={<CopyOutlined />}
              shape='round'
              disabled={disabledButton}
            >
              Copiar URL
            </Button>
          </CopyToClipboard>
        </div>
      ) : (
        <DeploymentDatasetUploadContainer />
      )}
    </div>
  );
};

ExternalDatasetDrawer.propTypes = {
  urlText: PropTypes.string.isRequired,
  propertyTitle: PropTypes.string.isRequired,
  propertyTip: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClickLearnMore: PropTypes.func.isRequired,
};

export default ExternalDatasetDrawer;
