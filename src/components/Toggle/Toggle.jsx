import { useRef, useState } from 'react'
import uniqid from 'uniqid'
import propTypes from 'prop-types'
import cn from 'classnames'

import styles from './Toggle.module.scss'

function Toggle({ initialState, changeRowEditableStatus }) {
  const [isActive, setIsActive] = useState(initialState)
  const toggleID = useRef(uniqid())

  return (
    <div
      className={styles['toggle']}
      onClick={() => {
        setIsActive((prevState) => !prevState)
        changeRowEditableStatus()
      }}
    >
      <input id={toggleID.current} className={styles['toggle__checkbox']} type='checkbox' />
      <label
        htmlFor={toggleID.current}
        className={cn(styles['toggle__label'], {
          [styles['toggle__label_active']]: isActive,
        })}
      />
    </div>
  )
}

Toggle.defaultProps = {
  initialState: true,
}

Toggle.propTypes = {
  initialState: propTypes.bool,
  changeRowEditableStatus: propTypes.func.isRequired,
}

export default Toggle
