import { useState, useContext } from 'react'
import propTypes from 'prop-types'
import cn from 'classnames'

import { ToDoListContext, ToDoListUpdateContext } from '../../context/ToDoListContext'

import { EditableInput, EditableInputWithIcon, ToDoRowDeleteButton, Toggle } from '../index'

import styles from './ToDoRow.module.scss'

function ToDoRow({ id, canEdit, item, name, image }) {
  const [isDeleteButtonHovered, setIsDeleteButtonHovered] = useState(false)
  const [isMarkerVisible, setIsMarkerVisible] = useState(false)
  const { changeRowAvailabilityStatus, selectRow, changeCompanyIcon } =
    useContext(ToDoListUpdateContext)
  const { selectedRows } = useContext(ToDoListContext)

  const changeDeleteButtonHandler = () => {
    if (canEdit) setIsDeleteButtonHovered((prevState) => !prevState)
  }

  const hideRowMarkerVisibilityHandler = () => {
    if (canEdit) setIsMarkerVisible(false)
  }

  const showRowMarkerVisibilityHandler = () => {
    if (canEdit) setIsMarkerVisible(true)
  }

  const changeRowEditableStatus = () => {
    changeRowAvailabilityStatus(id)
  }

  const getSelectedImage = (imageID) => {
    changeCompanyIcon(id, imageID)
  }

  const isRowSelected = selectedRows.includes(id)

  return (
    <div
      className={cn(styles['todo-row'], {
        [styles['todo-row_hover']]: isDeleteButtonHovered,
        [styles['todo-row_selected']]: isRowSelected,
      })}
      onMouseEnter={showRowMarkerVisibilityHandler}
      onMouseLeave={hideRowMarkerVisibilityHandler}
    >
      <div
        className={cn(styles['todo-row__marker'], {
          [styles['todo-row__marker_active']]: (isMarkerVisible && canEdit) || isRowSelected,
        })}
        onClick={() => selectRow(id)}
      />
      <Toggle initialState={canEdit} changeRowEditableStatus={changeRowEditableStatus} />
      <EditableInput initialValue={item} disabled={!canEdit} />
      <EditableInput initialValue={id} disabled={!canEdit} />
      <EditableInputWithIcon
        initialName={name}
        imageID={image}
        disabled={!canEdit}
        getSelectedImage={getSelectedImage}
      />
      <div
        className={styles['todo-row__delete']}
        onMouseEnter={changeDeleteButtonHandler}
        onMouseLeave={changeDeleteButtonHandler}
      >
        <ToDoRowDeleteButton id={id} disabled={!canEdit} />
      </div>
    </div>
  )
}

ToDoRow.propTypes = {
  id: propTypes.number.isRequired,
  canEdit: propTypes.bool.isRequired,
  item: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  image: propTypes.number.isRequired,
}

export default ToDoRow
