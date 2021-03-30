import PropTypes from 'prop-types'

export const monitoringShape = {
  createdAt: PropTypes.string,
  deploymentId: PropTypes.string,
  taskId: PropTypes.string,
  uuid: PropTypes.string,
  task: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}