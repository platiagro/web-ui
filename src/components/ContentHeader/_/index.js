// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { PageHeader } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

// COMPONENTS
import Title from 'components/Title';

// STYLES
import './style.less';

/**
 * Content Header.
 * This component is responsible for displaying the content header with editable
 * title and go back arrow.
 *
 * @param props
 */
const ContentHeader = (props) => {
  // destructuring props
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

  // RENDER
  return (
    // page header component
    <PageHeader
      className='contentHeader'
      title={
        // title component
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
      subTitle={subTitle}
      onBack={handleGoBack}
      extra={extra}
      backIcon={backIcon}
    />
  );
};

// PROP TYPES
ContentHeader.propTypes = {
  /** content header go back function */
  handleGoBack: PropTypes.func.isRequired,
  /** content header edit submit function */
  handleSubmit: PropTypes.func,
  /** content header title */
  title: PropTypes.string,
  /** content header is loading */
  loading: PropTypes.bool,
  /** if false the back icon will not be displayed */
  backIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

// PROP DEFAULT VALUES
ContentHeader.defaultProps = {
  /** content header edit submit function */
  handleSubmit: undefined,
  /* show back icon */
  backIcon: <ArrowLeftOutlined />,
};

// EXPORT
export default ContentHeader;
