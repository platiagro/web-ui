import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon, Typography, Input, Tooltip } from 'antd'
import './style.scss'

const { Title } = Typography

const EditTitle = ({ title, level, editable, beforeSubmit }) => {
  const [currentTitle, setCurrentTitle] = useState(title)
  const [editMode, setEditMode] = useState(true)

  useEffect(() => {
    setCurrentTitle(title)
  }, [title])

  const handleSubmit = () => {
    beforeSubmit(currentTitle)
    setEditMode(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentTitle(title)
      setEditMode(true)
    }
  }
  return editMode ? (
    <div className='custom-edit-title'>
      <Title
        level={level}>
        {title}
      </Title>
      {editable &&
        <Tooltip
          title='Editar'
        >
          <Icon
            className='custom-edit-input-icon'
            type='edit'
            onClick={() => setEditMode(false)}
          />
        </Tooltip>}
    </div>
  ) : (
      <Input
        value={currentTitle}
        onChange={(e) => setCurrentTitle(e.target.value)}
        autoFocus
        onFocus={(e) => e.target.select()}
        onBlur={handleSubmit}
        onKeyUp={handleKeyPress}
      />
    )

}

EditTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  editable: PropTypes.bool.isRequired,
  beforeSubmit: PropTypes.func.isRequired
}


export default EditTitle