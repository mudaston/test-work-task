import { useContext, useState } from 'react'

import { Button, Dropdown, ToDoRow } from '../index'

import { ToDoListContext, ToDoListUpdateContext } from '../../context/ToDoListContext'

import styles from './ToDoList.module.scss'

function ToDoList(props) {
  const [isMouseOverTable, setIsMouseOverTable] = useState(false)
  const { toDoListItems, currentFilters, searchInputValue, availableFilters } =
    useContext(ToDoListContext)
  const { getSelectedRowsLength, deleteSelectedRows } = useContext(ToDoListUpdateContext)

  const changeArrowVisibility = () => {
    setIsMouseOverTable((prevState) => !prevState)
  }

  let filteredItemsArray = toDoListItems.filter(({ name }) => name.includes(searchInputValue))

  if (currentFilters.length)
    filteredItemsArray = filteredItemsArray.filter(({ name }) => currentFilters.includes(name))

  return (
    <div
      className={styles['todolist']}
      onMouseEnter={changeArrowVisibility}
      onMouseLeave={changeArrowVisibility}
    >
      <div className={styles['todolist__filters']}>
        <span className={`${styles['todolist__heading']} ${styles['todolist__heading-status']}`}>
          Статус
        </span>
        <span className={`${styles['todolist__heading']} ${styles['todolist__heading-item']}`}>
          Товар
        </span>
        <span className={`${styles['todolist__heading']} ${styles['todolist__heading-ID']}`}>
          ID
        </span>
        <span
          className={`${styles['todolist__heading']} ${styles['todolist__heading_center']} ${styles['todolist__heading-name']}`}
        >
          Название
        </span>
        <div className={styles['todolist__dropdown-status']}>
          <Dropdown isArrowActive={isMouseOverTable} items={[]} disabled />
        </div>
        <div className={styles['todolist__dropdown-item']}>
          <Dropdown isArrowActive={isMouseOverTable} items={[]} disabled />
        </div>
        <div className={styles['todolist__dropdown-ID']}>
          <Dropdown isArrowActive={isMouseOverTable} items={[]} disabled />
        </div>
        <div className={styles['todolist__dropdown-name']}>
          <Dropdown isArrowActive={isMouseOverTable} items={availableFilters} />
        </div>
        <div className={`${styles['todolist__button']} ${styles['todolist__button-add']}`}>
          <Button ariaLabel='Добавить строку'>
            <Button.Add />
          </Button>
        </div>
        {getSelectedRowsLength() > 0 && (
          <div className={`${styles['todolist__button']} ${styles['todolist__button-delete']}`}>
            <Button ariaLabel='Удалить выделенные строки' actionFunc={() => deleteSelectedRows()}>
              <Button.Delete />
            </Button>
          </div>
        )}
      </div>
      <ul className={styles['todolist-content']}>
        {filteredItemsArray.map((properties) => (
          <li key={properties.id}>
            <ToDoRow {...properties} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
