// REACT LIBS
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// COMPONENTS
import { PropertyBlock } from 'components';
import { SelectInputBlock } from 'components/InputBlocks';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'antd';

// STYLES
import './ExternalDatasetDrawer.component.style.less';

/**
 * This component is responsible for render the external dataset drawer.
 */
const ExternalDatasetDrawer = (props) => {
  const {
    urlText,
    propertyTip,
    propertyTitle,
    onClickLearnMore,
    description,
  } = props;

  const [inputValue, setInputValue] = useState('Aplicação externa');

  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <div className='externalDatasetDrawer'>
      <PropertyBlock title={propertyTitle} tip={propertyTip}>
        <SelectInputBlock
          key='externalDataset'
          placeholder='Selecionar'
          options={['Arquivo local', 'Aplicação externa']}
          handleChange={handleChange}
          value={inputValue}
          valueLatestTraining='Aplicação externa'
        />
      </PropertyBlock>
      <div className='externalDatasetDrawerUrl'>
        <p>{description}</p>
        <p>
          <Button type='link' onClick={onClickLearnMore}>
            Saiba mais
          </Button>
        </p>
        <CopyToClipboard text={urlText}>
          <Button
            style={{ backgroundColor: '#237804', borderColor: '#237804' }}
            icon={<CopyOutlined />}
            shape='round'
            type='primary'
          >
            Copiar URL
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

// PROP TYPES
ExternalDatasetDrawer.propTypes = {
  /** Text to be copied on button click */
  urlText: PropTypes.string.isRequired,
  /** Property title on first block*/
  propertyTitle: PropTypes.string.isRequired,
  /** Property tip on first block*/
  propertyTip: PropTypes.string.isRequired,
  /** Description text */
  description: PropTypes.string.isRequired,
  /** Function to click on anchor link */
  onClickLearnMore: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default ExternalDatasetDrawer;
