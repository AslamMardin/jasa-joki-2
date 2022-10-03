import React from 'react'

const Input = ({type="text", name = "text", caption = "Your Text", children, ...props}) => {
  return (
     <div className="mb-3">
            <label htmlFor={name} className="form-label">{caption}</label>
            <input type={type} name={name} className={`form-control `} placeholder={caption} id={name} onChange={props.onChange} value={props.value} />
            {children}
    </div>
  )
}

export default Input