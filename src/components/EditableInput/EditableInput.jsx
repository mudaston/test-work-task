import { useState } from 'react'
import propTypes from 'prop-types'
import cn from 'classnames'

import styles from './EditableInput.module.scss'

function EditableInput({ initialValue, disabled }) {
  const [currentValue, setCurrentValue] = useState(initialValue)

  const currentValueOnChangeHandler = (e) => {
    const value = e.target.value

    setCurrentValue(value)
  }

  return (
    <input
      className={cn(styles['editable-input'])}
      type='text'
      value={currentValue}
      onChange={currentValueOnChangeHandler}
      disabled={disabled}
    />
  )
}

EditableInput.propTypes = {
  disabled: false,
}

EditableInput.propTypes = {
  initialValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  disabled: propTypes.bool,
}

export default EditableInput
