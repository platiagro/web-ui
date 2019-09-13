import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from 'antd';

import './style.scss';

const ContentHeader = ({ title, subTitle }) => (
  <PageHeader className='content-header' title={title} subTitle={subTitle} />
);

ContentHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

ContentHeader.defaultProps = {
  title: '',
  subTitle: '',
};

export default ContentHeader;
