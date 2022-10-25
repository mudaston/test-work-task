import { useState, useRef, useTransition, useContext } from 'react'
import cn from 'classnames'
import propTypes from 'prop-types'

import { useClickOutside } from '../../hooks'
import { ToDoListContext, ToDoListUpdateContext } from '../../context/ToDoListContext'

import styles from './Dropdown.module.scss'

function Dropdown({ isArrowActive, items, disabled }) {
  const { currentFilters, searchInputValue } = useContext(ToDoListContext)
  const { toggleFilter, clearFiltersArray, changeSearchInputValue } =
    useContext(ToDoListUpdateContext)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isMenuActive, setIsMenuActive] = useState(false)
  useClickOutside(dropdownRef, setIsMenuActive)

  const SearchOnChangeHandler = (e) => {
    const value = e.target.value.toLowerCase()

    startTransition(() => changeSearchInputValue(value))
  }

  const setSearchInputFocusAndMenuActive = () => {
    if (disabled) return

    inputRef.current.focus()
    setIsMenuActive(true)
  }

  return (
    <div className={styles['dropdown']} ref={dropdownRef}>
      <div className={styles['dropdown__input-wrapper']}>
        <input
          disabled={disabled}
          className={styles['dropdown__search-field']}
          type='search'
          value={disabled ? '' : searchInputValue}
          onChange={SearchOnChangeHandler}
          onMouseEnter={setSearchInputFocusAndMenuActive}
          ref={inputRef}
        />
        {isArrowActive && (
          <span
            className={cn(`${styles['dropdown__search-icon']} icon-arrow`, {
              [styles['dropdown__search-icon_active']]: isMenuActive && !disabled,
            })}
          />
        )}
      </div>
      <ul
        className={cn(styles['dropdown__list'], {
          [styles['dropdown__list_active']]: isMenuActive && !disabled,
        })}
      >
        {items.length ? (
          <li onClick={() => clearFiltersArray()} className={styles['dropdown__list-item']}>
            Все
          </li>
        ) : null}
        {items.map(({ id, value }) => (
          <li
            key={id}
            onClick={() => toggleFilter(value)}
            className={cn(styles['dropdown__list-item'], {
              [styles['dropdown__list-item_active']]: currentFilters.includes(value.toLowerCase()),
            })}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

Dropdown.defaultProps = {
  disabled: false,
}

Dropdown.propTypes = {
  isArrowActive: propTypes.bool.isRequired,
  items: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      value: propTypes.string.isRequired,
    })
  ).isRequired,
  disabled: propTypes.bool,
}

export default Dropdown
