import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { CheckCircleFilled } from '@ant-design/icons'

import './styles.less'

const MonitoringTaskCard = ({
  className,
  title,
  description,
  onClick,
  isSelected
}) => {
  const getMonitoringItemClasses = () => {
    const defaultClasses = 'monitoring-task-card'
    const selectedClass = 'monitoring-task-card-selected'

    const classArray = [
      defaultClasses,
      isSelected ? selectedClass : '',
      className
    ]

    return classArray.join(' ')
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={getMonitoringItemClasses()}
    >
      {isSelected && (
        <CheckCircleFilled className="monitoring-task-card-selected-icon" />
      )}

      <div className="monitoring-task-card-content">
        <div className="monitoring-task-card-title">{title}</div>
        <div className="monitoring-task-card-description">{description}</div>
      </div>
    </button>
  )
}

MonitoringTaskCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
}

MonitoringTaskCard.defaultProps = {
  className: '',
  description: undefined,
  onClick: undefined,
  isSelected: false,
}

export default memo(MonitoringTaskCard)