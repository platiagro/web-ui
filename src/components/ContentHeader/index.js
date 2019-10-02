import React from 'react';

// import PropTypes from 'prop-types';

import { PageHeader } from 'antd';

import './style.scss';

const ContentHeader = ({
  title,
  onTitleDoubleClick,
  subTitle,
  onBack,
  breadcrumbs,
}) => {
  const componentTitle = onTitleDoubleClick ? (
    <span onDoubleClick={onTitleDoubleClick}>{title}</span>
  ) : (
    title
  );

  const routes = breadcrumbs;

  return (
    <PageHeader
      className='contentHeader'
      title={componentTitle}
      subTitle={subTitle}
      onBack={onBack}
      breadcrumb={{ routes }}
    />
  );
};

// ContentHeader.propTypes = {
//   title: PropTypes.string,
//   subTitle: PropTypes.string,
// };

// ContentHeader.defaultProps = {
//   title: '',
//   subTitle: '',
// };

export default ContentHeader;
