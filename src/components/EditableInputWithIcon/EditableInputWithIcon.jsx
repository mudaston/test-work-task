import { useState, useRef, useContext } from 'react'
import cn from 'classnames'
import propTypes from 'prop-types'

import { useClickOutside } from '../../hooks'
import { ToDoListContext } from '../../context/ToDoListContext'

import styles from './EditableInputWithIcon.module.scss'

function EditableInputWithIcon({ initialName, imageID, disabled, getSelectedImage }) {
  const [currentValue, setCurrentValue] = useState(initialName)
  const [isMenuActive, setIsMenuActive] = useState(false)
  const menuRef = useRef(null)
  const { toDoListImages } = useContext(ToDoListContext)
  useClickOutside(menuRef, setIsMenuActive)

  const { alt, title, link } = toDoListImages.find(({ id }) => id === imageID)

  const currentValueChangeHandler = (e) => {
    const value = e.target.value

    setCurrentValue(value)
  }

  return (
    <div ref={menuRef} className={styles['input-with-icon']}>
      <div className={styles['input-with-icon__image']}>
        <img src={link} alt={alt} title={title} />
      </div>
      <input
        type='text'
        className={styles['input-with-icon__input']}
        value={currentValue}
        onChange={currentValueChangeHandler}
        onFocus={() => setIsMenuActive(true)}
        disabled={disabled}
      />
      <ul
        className={cn(styles['input-with-icon__list'], {
          [styles['input-with-icon__list_active']]: isMenuActive,
        })}
      >
        {toDoListImages.map(({ id, busy, alt, title, link }) => (
          <li
            key={id}
            className={cn(styles['input-with-icon__list-item'], {
              [styles['input-with-icon__list-item_busy']]: busy,
            })}
            onClick={() => getSelectedImage(id)}
          >
            <img src={link} alt={alt} title={title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

EditableInputWithIcon.defaultProps = {
  initialName: '',
  imageID: 0,
  disabled: false,
}

EditableInputWithIcon.propTypes = {
  initialName: propTypes.string,
  imageID: propTypes.number,
  disabled: propTypes.bool,
  getSelectedImage: propTypes.func.isRequired,
}

export default EditableInputWithIcon
