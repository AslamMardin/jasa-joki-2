import React from 'react'

const Button = ({children, type = "button", warna="primary", onClick, isValid = true}) => {
  return (
    <button className={`btn btn-${warna} ${isValid ? "" : "disabled"}`} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button