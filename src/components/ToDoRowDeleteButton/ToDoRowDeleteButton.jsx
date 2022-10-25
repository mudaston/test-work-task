import { useContext } from 'react'
import propTypes from 'prop-types'

import { ToDoListUpdateContext } from '../../context/ToDoListContext'

import styles from './ToDoRowDeleteButton.module.scss'

function ToDoRowDeleteButton({ id, disabled }) {
  const { deleteRowByID } = useContext(ToDoListUpdateContext)

  return (
    <button
      onClick={() => deleteRowByID(id)}
      disabled={disabled}
      className={styles['todo-row-delete-button']}
    >
      X
    </button>
  )
}

ToDoRowDeleteButton.defaultProps = {
  disabled: false,
}

ToDoRowDeleteButton.propTypes = {
  id: propTypes.number.isRequired,
  disabled: propTypes.bool,
}

export default ToDoRowDeleteButton
