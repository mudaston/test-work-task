import propTypes from 'prop-types'

import { Add, Delete } from '../../elements'

import styles from './Button.module.scss'

function Button({ children, type, ariaLabel, actionFunc, ...props }) {
  return (
    <button
      className={styles['button']}
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={() => actionFunc()}
    >
      {children}
    </button>
  )
}

Button.Add = Add
Button.Delete = Delete

Button.defaultProps = {
  actionFunc: () => {},
}

Button.propTypes = {
  ariaLabel: propTypes.string.isRequired,
  actionFunc: propTypes.func,
}

export default Button
