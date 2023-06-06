import React from 'react'

function Button({title, className, type, disabled}) {
    return (
      <div className={className}>
          <div className={`p-1 btn-border rounded-lg w-full`}>
              <button type={type} disabled={disabled} className='btn btn-hover w-full'>{title}</button>
          </div>
      </div>
    )
  }

export default Button