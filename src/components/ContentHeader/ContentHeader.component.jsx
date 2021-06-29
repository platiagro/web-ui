import React from 'react';
import { PageHeader } from 'antd';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Title from 'components/Title';

import './style.less';

const ContentHeader = ({
  title,
  extra,
  loading,
  subTitle,
  backIcon,
  customSubTitle,
  handleGoBack,
  handleSubmit,
}) => {
  return (
    <PageHeader
      className='contentHeader'
      onBack={handleGoBack}
      subTitle={subTitle}
      backIcon={backIcon}
      extra={extra}
      title={
        <>
          <span className='subtitle-custom'>{customSubTitle}</span>

          <Title
            level={3}
            title={title}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </>
      }
    />
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.node,
  loading: PropTypes.bool,
  backIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  subTitle: PropTypes.string,
  customSubTitle: PropTypes.string,
  handleGoBack: PropTypes.func,
  handleSubmit: PropTypes.func,
};

ContentHeader.defaultProps = {
  title: undefined,
  extra: undefined,
  loading: false,
  backIcon: <ArrowLeftOutlined />,
  subTitle: undefined,
  customSubTitle: undefined,
  handleGoBack: undefined,
  handleSubmit: undefined,
};

export default ContentHeader;
