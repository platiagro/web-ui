import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ContentHeader from './index';
import AccountInfo from './AccountInfo';

const ContentHeaderContainer = ({
  title,
  subTitle,
  backIcon,
  customSubTitle,
}) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <ContentHeader
      title={title}
      loading={false}
      subTitle={subTitle}
      backIcon={backIcon}
      extra={<AccountInfo />}
      handleGoBack={handleGoBack}
      customSubTitle={customSubTitle}
    />
  );
};

ContentHeaderContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  backIcon: PropTypes.node,
  customSubTitle: PropTypes.string,
};

ContentHeaderContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: undefined,
  backIcon: undefined,
  customSubTitle: undefined,
};

export default ContentHeaderContainer;
