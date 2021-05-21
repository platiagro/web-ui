import React from 'react';
import { PageHeader } from 'antd';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Title from 'components/Title';

import './style.less';

const ContentHeader = (props) => {
  const {
    handleGoBack,
    handleSubmit,
    title,
    subTitle,
    loading,
    customSubTitle,
    extra,
    backIcon,
  } = props;

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
            loading={loading}
            level={3}
            title={title}
            handleSubmit={handleSubmit}
          />
        </>
      }
    />
  );
};

ContentHeader.propTypes = {
  handleGoBack: PropTypes.func,
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  backIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  subTitle: PropTypes.string,
  customSubTitle: PropTypes.string,
  extra: PropTypes.node,
};

ContentHeader.defaultProps = {
  handleGoBack: undefined,
  handleSubmit: undefined,
  title: undefined,
  loading: false,
  backIcon: <ArrowLeftOutlined />,
  subTitle: undefined,
  customSubTitle: undefined,
  extra: undefined,
};

export default ContentHeader;
